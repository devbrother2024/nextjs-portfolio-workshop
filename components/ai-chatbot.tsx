"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { ChatbotMarkdown } from "@/components/chatbot-markdown";

type Role = "user" | "ai";

interface Message {
  id: number;
  role: Role;
  text: string;
}

let messageIdCounter = 0;

const ERROR_TEXT = "답변을 가져오지 못했어요. 잠시 후 다시 시도해줘.";

export function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: ++messageIdCounter, role: "ai", text: "안녕하세요! 무엇이든 물어보세요." },
  ]);
  const [input, setInput] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isWaiting) return;

    const userMessage: Message = { id: ++messageIdCounter, role: "user", text };
    const aiId = ++messageIdCounter;

    const nextMessages = [...messages, userMessage];

    setMessages([...nextMessages, { id: aiId, role: "ai", text: "" }]);
    setInput("");
    setIsWaiting(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, text: t }) => ({ role, text: t })),
        }),
      });

      if (!res.ok || !res.body) {
        setMessages((prev) =>
          prev.map((m) => (m.id === aiId ? { ...m, text: ERROR_TEXT } : m))
        );
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;

        setMessages((prev) =>
          prev.map((m) => (m.id === aiId ? { ...m, text: accumulated } : m))
        );
      }

      if (!accumulated) {
        setMessages((prev) =>
          prev.map((m) => (m.id === aiId ? { ...m, text: ERROR_TEXT } : m))
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) => (m.id === aiId ? { ...m, text: ERROR_TEXT } : m))
      );
    } finally {
      setIsWaiting(false);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) sendMessage();
  };

  return (
    <>
      {/* 대화창 */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-5 z-50 flex w-80 flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl sm:right-6 sm:w-96"
          style={{ maxHeight: "480px" }}
        >
          {/* 헤더 */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.55 0.22 280) 0%, oklch(0.65 0.22 0) 100%)",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">AI 챗봇</span>
              <span className="h-2 w-2 rounded-full bg-green-300" />
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="챗봇 닫기"
              className="flex h-6 w-6 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/20 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* 메시지 리스트 */}
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "user" ? (
                  <p
                    className="max-w-[75%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.55 0.22 280) 0%, oklch(0.65 0.22 0) 100%)",
                    }}
                  >
                    {msg.text}
                  </p>
                ) : msg.text === "" ? (
                  <div className="min-h-[2rem] min-w-[3rem] animate-pulse rounded-2xl bg-muted px-3.5 py-2" />
                ) : (
                  <div className="max-w-[75%] rounded-2xl bg-muted px-3.5 py-2 text-sm text-foreground/85">
                    <ChatbotMarkdown>{msg.text}</ChatbotMarkdown>
                  </div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* 입력 영역 */}
          <div className="flex items-center gap-2 border-t border-border px-3 py-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              disabled={isWaiting}
              placeholder="메시지를 입력하세요"
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60 disabled:opacity-50"
            />
            <button
              onClick={sendMessage}
              disabled={isWaiting || !input.trim()}
              aria-label="메시지 보내기"
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-white shadow transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.55 0.22 280) 0%, oklch(0.65 0.22 0) 100%)",
              }}
            >
              ↑
            </button>
          </div>
        </div>
      )}

      {/* 플로팅 버튼 */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "챗봇 닫기" : "챗봇 열기"}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105 active:scale-95 sm:right-6"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.55 0.22 280) 0%, oklch(0.65 0.22 0) 100%)",
        }}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </>
  );
}
