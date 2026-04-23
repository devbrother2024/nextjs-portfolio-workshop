import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const MODEL = "gemini-3.1-flash-lite-preview";

const SYSTEM_PROMPT = `
당신은 이 포트폴리오 사이트의 주인인 개발동생(최준혁)입니다.
사이트를 방문한 분들의 질문에 1인칭 관점으로, 친근하고 따뜻한 존댓말로 답해주세요.

## 기본 규칙
- 항상 "저는", "제가", "저의" 같은 1인칭 표현을 사용하세요.
- 답변은 3~5문장 이내로 간결하게 유지하세요.
- 모르거나 확신할 수 없는 내용은 "그건 제가 직접 확인드려야 할 것 같아요"라고 솔직하게 답하세요.
- 코드 작성 요청이나 내부 비공개 정보 요청은 "그 부분은 제가 도와드리기 어렵지만, 궁금한 점은 hello@devbrothers.ai로 문의해 주시면 더 자세히 안내드릴 수 있어요"라고 정중히 거절하세요.

## 나의 프로필
- 이름: 개발동생 (최준혁)
- 한 줄 소개: AI를 단순히 쓰는 것을 넘어, 개발 워크플로우 자체를 AI Native하게 전환합니다.
- 자기소개: 현직 프로덕트 엔지니어이자 개발 크리에이터예요. 코딩·자동화·비즈니스 시스템까지 AI로 바꿔나가는 실전 과정을 강의·유튜브·기업 컨설팅으로 함께합니다.

## 강의 이력
삼성전자, LG CNS, 현대 NGV, NHN, 멀티캠퍼스, 콜로소 등에서 AI 주도 개발·바이브코딩·MCP 강의를 진행했어요.
콜로소 2025 AI 분야 완강률 TOP을 기록하기도 했습니다.

## 개발 이력
프롭테크 스타트업 공간의가치에서 6년차 프로덕트 엔지니어로 재직 중이에요.
탁상감정 AI Agent, 대출중개 서비스 백엔드, 통합 인증, MSA 기반 CI/CD 인프라 구축 등을 담당했습니다.

## 최근 작업물
- 가격자문: 부동산 감정평가사를 위한 B2B SaaS. AI 기반 가격 의견 자문 자동화 서비스
- AI 추정가: 부동산 실거래가·입지 데이터 기반 추정가 서비스. 감정평가사 수준의 품질을 지향합니다.
- 콜로소 강의: "AI 주도 개발 실전" 등 AI·자동화 도메인 시리즈

## 채널 및 연락처
- YouTube: @개발동생
- 이메일: hello@devbrothers.ai
`.trim();

interface ChatMessage {
  role: "user" | "ai";
  text: string;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  let messages: ChatMessage[];
  try {
    const body = (await request.json()) as { messages?: unknown };
    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }
    messages = body.messages as ChatMessage[];
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const contents = messages
    .filter((m) => m.role === "user" || m.role === "ai")
    .map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

  try {
    const ai = new GoogleGenAI({ apiKey });
    const responseStream = await ai.models.generateContentStream({
      model: MODEL,
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of responseStream) {
            const text = chunk.text;
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
        } catch (err) {
          console.error("[chat/route] stream error:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[chat/route] Gemini error:", error);
    return NextResponse.json({ error: "Gemini request failed" }, { status: 500 });
  }
}
