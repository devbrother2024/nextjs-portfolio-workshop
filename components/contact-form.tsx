"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";

type SubmitState = "idle" | "success" | "error";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitState("idle");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (!accessKey) {
      setSubmitState("error");
      setIsSubmitting(false);
      return;
    }

    const payload = {
      access_key: accessKey,
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      subject: "포트폴리오 Contact 문의",
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { success?: boolean };

      if (response.ok && result.success) {
        setSubmitState("success");
        form.reset();
      } else {
        setSubmitState("error");
      }
    } catch {
      setSubmitState("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="flex flex-col gap-4 p-6 sm:p-7" onSubmit={onSubmit}>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-name" className="text-sm font-medium text-foreground/90">
          이름
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          placeholder="이름을 입력해주세요"
          className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/60"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className="text-sm font-medium text-foreground/90">
          이메일
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          placeholder="example@company.com"
          className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/60"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="text-sm font-medium text-foreground/90">
          메시지
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          placeholder="문의 내용을 자유롭게 남겨주세요"
          className="min-h-32 rounded-lg border border-border bg-background px-3 py-2.5 text-sm leading-relaxed outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/60"
        />
      </div>

      <div className="pt-1">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="shadow-md transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.55 0.22 280) 0%, oklch(0.65 0.22 0) 100%)",
            color: "white",
            border: "none",
          }}
        >
          {isSubmitting ? "보내는 중..." : "보내기"}
        </Button>
      </div>

      <p className="min-h-5 text-xs text-muted-foreground">
        {submitState === "success" && "메일이 전송됐어요. 곧 답장드릴게요"}
        {submitState === "error" && "전송에 실패했어요. 잠시 후 다시 시도해주세요"}
      </p>
    </form>
  );
}
