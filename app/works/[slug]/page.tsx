import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { works } from "@/lib/works";

type WorkUiMeta = {
  specs: { label: string; value: string }[];
  highlights: { title: string; description: string }[];
  sectionTitles: string[];
};

const WORK_UI_META: Record<string, WorkUiMeta> = {
  avm: {
    specs: [
      { label: "카테고리", value: "PropTech / AI Valuation" },
      { label: "제공 방식", value: "Web + API + PDF 리포트" },
      { label: "담당 범위", value: "파이퍼 백엔드 전반 / 연동 API" },
      { label: "주요 고객", value: "금융기관 대출 심사 조직" },
    ],
    highlights: [
      {
        title: "심사 리드타임 단축",
        description: "현장조사 이전 단계에서 즉시 참고 가능한 가격 기준을 제공합니다.",
      },
      {
        title: "백엔드 연동 표준화",
        description: "기관별 조회/응답 포맷을 통합해 심사 시스템 연결 비용을 줄였습니다.",
      },
      {
        title: "성능·운영 고도화",
        description: "응답 성능 개선, 배포 자동화, 관측 체계 정비로 운영 품질을 높였습니다.",
      },
    ],
    sectionTitles: ["서비스 개요", "담당한 백엔드 범위", "운영 성과"],
  },
  "price-consulting": {
    specs: [
      { label: "카테고리", value: "B2B 금융 워크플로우" },
      { label: "응답 SLA", value: "영업일 기준 2시간 내" },
      { label: "연동 방식", value: "API + 전산망 + 전문 포맷" },
      { label: "담당 범위", value: "워크플로우 백엔드 + 운영 플랫폼" },
    ],
    highlights: [
      {
        title: "중간 검증 공백 해소",
        description: "AI 추정가와 최종 감정평가 사이의 의사결정 공백을 줄입니다.",
      },
      {
        title: "속도와 적용 범위 동시 확보",
        description: "2시간 SLA와 비주거 집합건물 대응으로 실무 활용도를 높였습니다.",
      },
      {
        title: "실제 은행 프로세스 연동",
        description: "온라인 은행 담보대출 흐름에 API 기반으로 통합 운영되었습니다.",
      },
    ],
    sectionTitles: ["서비스 개요", "담당한 백엔드 범위", "운영 성과"],
  },
  devbrothers: {
    specs: [
      { label: "교육 대상", value: "개발자 + 비개발 직군" },
      { label: "운영 형태", value: "특강 / 핸즈온 / 기업 맞춤" },
      { label: "과정 구성", value: "입문 특강 + 심화 실습 + 맞춤 설계" },
      { label: "핵심 주제", value: "MCP, 바이브코딩, 에이전틱, AI 풀스택" },
    ],
    highlights: [
      {
        title: "팀 단위 전환 중심",
        description: "도구 사용법이 아니라 조직의 AI Native 개발 전환을 목표로 설계했습니다.",
      },
      {
        title: "난이도 유연 조정",
        description: "직군과 수준에 맞춰 같은 프레임워크를 다층적으로 운영합니다.",
      },
      {
        title: "실습 완주형 커리큘럼",
        description: "기획, 구현, 테스트, 배포까지 업무 흐름 단위로 학습을 마무리합니다.",
      },
    ],
    sectionTitles: ["교육 목적", "과정 구성과 운영 방식", "운영 이력"],
  },
};

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) return {};
  return {
    title: `${work.title} | 개발동생`,
    description: work.summary,
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) notFound();

  const paragraphs = work.description.split("\n\n").filter(Boolean);
  const uiMeta = WORK_UI_META[work.slug] ?? {
    specs: [],
    highlights: [],
    sectionTitles: [],
  };
  const detailSections = paragraphs.map((content, index) => ({
    title: uiMeta.sectionTitles[index] ?? `상세 내용 ${index + 1}`,
    content,
  }));

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto w-full max-w-3xl px-6 py-16 flex flex-col gap-12">

        {/* 뒤로가기 */}
        <BlurFade delay={0} direction="up">
          <Link
            href="/#works"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <span aria-hidden>←</span>
            모든 작업물 보기
          </Link>
        </BlurFade>

        {/* 큰 이미지 */}
        <BlurFade delay={0.05} direction="up">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={work.image}
              alt={work.title}
              className="h-full w-full object-cover"
            />
          </div>
        </BlurFade>

        {/* 제목 + 한 줄 요약 + 링크 */}
        <BlurFade delay={0.15} direction="up">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <h1
                className="text-4xl font-bold tracking-tight sm:text-5xl"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.55 0.22 280) 0%, oklch(0.65 0.22 0) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {work.title}
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                {work.summary}
              </p>
            </div>

            {uiMeta.specs.length > 0 && (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {uiMeta.specs.map((spec) => (
                  <div
                    key={`${spec.label}-${spec.value}`}
                    className="rounded-xl border border-border/70 bg-card/50 px-3 py-2"
                  >
                    <p className="text-xs text-muted-foreground">{spec.label}</p>
                    <p className="text-sm font-medium text-foreground/90">{spec.value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* 외부 링크 */}
            {work.links.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {work.links.map((link) => (
                  <Button key={link.url} asChild variant="outline" size="sm">
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.label} ↗
                    </a>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </BlurFade>

        {/* 구분선 */}
        <BlurFade delay={0.2} direction="up">
          <hr className="border-border" />
        </BlurFade>

        {/* 핵심 가치 카드 */}
        {uiMeta.highlights.length > 0 && (
          <BlurFade delay={0.23} direction="up">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {uiMeta.highlights.map((item) => (
                <MagicCard
                  key={item.title}
                  className="h-full"
                  gradientFrom="#9E7AFF"
                  gradientTo="#FE8BBB"
                  gradientColor="#f0ebff"
                >
                  <div className="flex h-full flex-col gap-2 p-4">
                    <h3 className="text-sm font-semibold text-foreground/90">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-foreground/70">
                      {item.description}
                    </p>
                  </div>
                </MagicCard>
              ))}
            </div>
          </BlurFade>
        )}

        {/* 섹션형 상세 설명 */}
        <BlurFade delay={0.25} direction="up">
          <div className="flex flex-col gap-6">
            {detailSections.map((section, i) => (
              <section
                key={`${section.title}-${i}`}
                className="rounded-xl border border-border/80 bg-card/40 px-5 py-4"
              >
                <h3 className="text-sm font-semibold text-foreground/90">{section.title}</h3>
                <p className="pt-3 text-base leading-relaxed text-foreground/75">
                  {section.content}
                </p>
              </section>
            ))}
          </div>
        </BlurFade>

      </main>
    </div>
  );
}
