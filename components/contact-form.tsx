"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const TALLY_FORM_ID = "D4b29l";
const TALLY_SHARE_URL = `https://tally.so/r/${TALLY_FORM_ID}`;
const TALLY_EMBED_URL = `https://tally.so/embed/${TALLY_FORM_ID}?transparentBackground=1&dynamicHeight=1`;

declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}

function isTallySubmittedEvent(data: unknown) {
  if (typeof data !== "string" || !data.includes("Tally.FormSubmitted")) {
    return false;
  }

  try {
    const event = JSON.parse(data) as { payload?: { formId?: string } };
    return !event.payload?.formId || event.payload.formId === TALLY_FORM_ID;
  } catch {
    return true;
  }
}

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (isTallySubmittedEvent(event.data)) {
        setIsSubmitted(true);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-5">
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
        onLoad={() => window.Tally?.loadEmbeds()}
      />

      <iframe
        data-tally-src={TALLY_EMBED_URL}
        loading="lazy"
        width="100%"
        height="720"
        title="함께 만들 프로젝트"
        className="min-h-[650px] w-full rounded-xl bg-background"
        style={{ border: 0 }}
      />

      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <p className="min-h-5 text-xs text-muted-foreground">
          {isSubmitted && "문의가 접수됐어요. 확인 후 답장드릴게요."}
        </p>
        <Button asChild variant="outline" size="sm">
          <a href={TALLY_SHARE_URL} target="_blank" rel="noopener noreferrer">
            Tally에서 열기 ↗
          </a>
        </Button>
      </div>
    </div>
  );
}
