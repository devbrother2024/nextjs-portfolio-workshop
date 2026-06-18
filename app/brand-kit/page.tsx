"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  Copy,
  Palette,
  RotateCcw,
  Save,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";

type BrandKit = {
  name: string;
  primary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  radius: number;
};

type ColorField = "primary" | "accent" | "background" | "surface" | "text";

const STORAGE_KEY = "portfolio-brand-kit";

const PRESETS: BrandKit[] = [
  {
    name: "Studio Minimal",
    primary: "#111827",
    accent: "#f97316",
    background: "#fafaf7",
    surface: "#ffffff",
    text: "#18181b",
    radius: 12,
  },
  {
    name: "Soft Portfolio",
    primary: "#7c3aed",
    accent: "#ec4899",
    background: "#f8f5ff",
    surface: "#ffffff",
    text: "#1f1b2e",
    radius: 18,
  },
  {
    name: "Editorial Warm",
    primary: "#b45309",
    accent: "#0f766e",
    background: "#fff7ed",
    surface: "#fffdf8",
    text: "#251a12",
    radius: 8,
  },
  {
    name: "Bold Product",
    primary: "#2563eb",
    accent: "#22c55e",
    background: "#f8fafc",
    surface: "#ffffff",
    text: "#0f172a",
    radius: 10,
  },
];

const colorFields: { key: ColorField; label: string }[] = [
  { key: "primary", label: "메인 컬러" },
  { key: "accent", label: "포인트 컬러" },
  { key: "background", label: "배경" },
  { key: "surface", label: "카드" },
  { key: "text", label: "텍스트" },
];

const initialKit = PRESETS[0];

function isBrandKit(value: unknown): value is BrandKit {
  if (!value || typeof value !== "object") return false;

  const kit = value as Record<string, unknown>;
  return (
    typeof kit.name === "string" &&
    typeof kit.primary === "string" &&
    typeof kit.accent === "string" &&
    typeof kit.background === "string" &&
    typeof kit.surface === "string" &&
    typeof kit.text === "string" &&
    typeof kit.radius === "number"
  );
}

function createCssVariables(kit: BrandKit) {
  return `:root {
  --brand-primary: ${kit.primary};
  --brand-accent: ${kit.accent};
  --brand-background: ${kit.background};
  --brand-surface: ${kit.surface};
  --brand-text: ${kit.text};
  --brand-radius: ${kit.radius}px;
}`;
}

export default function BrandKitPage() {
  const [brandKit, setBrandKit] = useState<BrandKit>(initialKit);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        const parsed = saved ? JSON.parse(saved) : null;
        if (isBrandKit(parsed)) setBrandKit(parsed);
      } catch {
        setStatus("저장된 값을 불러오지 못했어요.");
      }
    }, 0);

    return () => window.clearTimeout(timerId);
  }, []);

  const cssVariables = useMemo(() => createCssVariables(brandKit), [brandKit]);

  const previewStyle: CSSProperties = {
    background: brandKit.background,
    color: brandKit.text,
  };

  const cardStyle: CSSProperties = {
    background: brandKit.surface,
    borderColor: `${brandKit.primary}24`,
    borderRadius: brandKit.radius,
    boxShadow: `0 18px 50px ${brandKit.primary}18`,
  };

  const gradientStyle: CSSProperties = {
    background: `linear-gradient(135deg, ${brandKit.primary}, ${brandKit.accent})`,
    color: "#ffffff",
  };

  const updateColor = (key: ColorField, value: string) => {
    setBrandKit((current) => ({ ...current, [key]: value }));
    setStatus("");
  };

  const saveKit = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(brandKit));
      setStatus("저장됐어요. 새로고침해도 유지됩니다.");
    } catch {
      setStatus("저장에 실패했어요.");
    }
  };

  const resetKit = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setBrandKit(initialKit);
    setStatus("처음 상태로 되돌렸어요.");
  };

  const copyCss = async () => {
    try {
      await window.navigator.clipboard.writeText(cssVariables);
      setStatus("CSS 변수를 복사했어요.");
    } catch {
      setStatus("복사에 실패했어요. 아래 코드를 직접 복사해주세요.");
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10 sm:py-14">
        <BlurFade delay={0} direction="up">
          <Button asChild variant="ghost" size="sm" className="w-fit">
            <Link href="/">
              <ArrowLeft />
              홈으로
            </Link>
          </Button>
        </BlurFade>

        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <BlurFade delay={0.05} direction="up">
            <div className="flex flex-col gap-4">
              <div className="flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground">
                <Palette className="size-3.5" />
                Brand Kit Lab
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                포트폴리오의 무드를 직접 조합해보세요
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg">
                색상과 라운드 값을 바꾸면 오른쪽 미리보기가 바로 바뀝니다.
                마음에 드는 조합은 저장하거나 CSS 변수로 복사할 수 있어요.
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.1} direction="up">
            <div className="grid grid-cols-3 gap-3 rounded-xl border border-border bg-card p-3">
              {[
                { label: "프리셋", value: PRESETS.length },
                { label: "컬러", value: colorFields.length },
                { label: "저장", value: "local" },
              ].map((item) => (
                <div key={item.label} className="rounded-lg bg-muted px-3 py-2">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="pt-1 font-mono text-sm font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </BlurFade>
        </section>

        <section className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <BlurFade delay={0.15} direction="up" className="h-full">
            <aside className="flex h-full flex-col gap-6 rounded-xl border border-border bg-card p-5">
              <div className="flex flex-col gap-3">
                <h2 className="text-sm font-semibold">무드 프리셋</h2>
                <div className="grid gap-2">
                  {PRESETS.map((preset) => {
                    const isActive = brandKit.name === preset.name;

                    return (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => {
                          setBrandKit(preset);
                          setStatus("");
                        }}
                        className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-left text-sm transition-colors hover:bg-muted"
                        style={isActive ? { borderColor: preset.primary } : undefined}
                      >
                        <span className="flex items-center gap-2">
                          <span className="flex -space-x-1">
                            <span
                              className="size-4 rounded-full border border-white"
                              style={{ background: preset.primary }}
                            />
                            <span
                              className="size-4 rounded-full border border-white"
                              style={{ background: preset.accent }}
                            />
                          </span>
                          {preset.name}
                        </span>
                        {isActive && <Check className="size-4" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-sm font-semibold">컬러 조정</h2>
                <div className="grid gap-3">
                  {colorFields.map((field) => (
                    <label key={field.key} className="grid gap-1.5 text-sm">
                      <span className="text-muted-foreground">{field.label}</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={brandKit[field.key]}
                          onChange={(event) => updateColor(field.key, event.target.value)}
                          className="h-9 w-12 cursor-pointer rounded-lg border border-border bg-transparent p-1"
                        />
                        <input
                          type="text"
                          value={brandKit[field.key]}
                          onChange={(event) => updateColor(field.key, event.target.value)}
                          className="h-9 min-w-0 flex-1 rounded-lg border border-border bg-background px-3 font-mono text-xs outline-none focus:border-primary/60"
                        />
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <label className="grid gap-2 text-sm">
                <span className="flex items-center justify-between text-muted-foreground">
                  카드 라운드
                  <span className="font-mono text-foreground">{brandKit.radius}px</span>
                </span>
                <input
                  type="range"
                  min="0"
                  max="28"
                  value={brandKit.radius}
                  onChange={(event) =>
                    setBrandKit((current) => ({
                      ...current,
                      radius: Number(event.target.value),
                    }))
                  }
                  className="accent-primary"
                />
              </label>

              <div className="grid grid-cols-2 gap-2">
                <Button type="button" onClick={saveKit}>
                  <Save />
                  저장
                </Button>
                <Button type="button" variant="outline" onClick={resetKit}>
                  <RotateCcw />
                  초기화
                </Button>
                <Button type="button" variant="outline" className="col-span-2" onClick={copyCss}>
                  <Copy />
                  CSS 복사
                </Button>
              </div>

              <p className="min-h-5 text-xs text-muted-foreground">{status}</p>
            </aside>
          </BlurFade>

          <BlurFade delay={0.2} direction="up">
            <div className="overflow-hidden rounded-xl border border-border" style={previewStyle}>
              <div className="flex flex-col gap-8 p-5 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="flex size-9 items-center justify-center rounded-lg text-white"
                      style={gradientStyle}
                    >
                      <Sparkles className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">Preview</p>
                      <p className="text-xs opacity-65">실제 포트폴리오 화면 예시</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    {[brandKit.primary, brandKit.accent, brandKit.background, brandKit.surface].map(
                      (color) => (
                        <span
                          key={color}
                          className="size-6 rounded-full border border-black/10"
                          style={{ background: color }}
                        />
                      )
                    )}
                  </div>
                </div>

                <section className="grid gap-5 lg:grid-cols-[1fr_280px]">
                  <div className="flex flex-col justify-center gap-5 py-6">
                    <div className="flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-white" style={gradientStyle}>
                      Selected mood
                      <span className="opacity-80">{brandKit.name}</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h2 className="max-w-xl text-4xl font-bold tracking-tight sm:text-5xl">
                        감각과 문제 해결을 함께 보여주는 포트폴리오
                      </h2>
                      <p className="max-w-xl text-base leading-relaxed opacity-72">
                        브랜드, 제품, 인터페이스를 더 명확하고 쓰기 좋게 만드는
                        디자인 작업을 소개합니다.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="rounded-lg px-4 py-2 text-sm font-semibold text-white"
                        style={{ ...gradientStyle, borderRadius: brandKit.radius }}
                      >
                        프로젝트 보기
                      </button>
                      <button
                        type="button"
                        className="rounded-lg border px-4 py-2 text-sm font-semibold"
                        style={{
                          borderColor: `${brandKit.primary}55`,
                          borderRadius: brandKit.radius,
                          color: brandKit.primary,
                        }}
                      >
                        문의하기
                      </button>
                    </div>
                  </div>

                  <div className="border p-4" style={cardStyle}>
                    <div
                      className="aspect-video rounded-lg"
                      style={{
                        background: `linear-gradient(135deg, ${brandKit.primary}22, ${brandKit.accent}44)`,
                      }}
                    />
                    <div className="flex flex-col gap-2 pt-4">
                      <p className="text-sm font-semibold">Work sample</p>
                      <p className="text-sm leading-relaxed opacity-68">
                        선택한 브랜드 키트가 카드, 버튼, 배경에 어떻게 적용되는지
                        확인합니다.
                      </p>
                    </div>
                  </div>
                </section>

                <div className="rounded-lg border border-black/10 bg-white/55 p-4 text-left backdrop-blur">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-900">복사될 CSS 변수</p>
                    <Button type="button" size="sm" variant="outline" onClick={copyCss}>
                      <Copy />
                      복사
                    </Button>
                  </div>
                  <pre className="overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-relaxed text-slate-100">
                    <code>{cssVariables}</code>
                  </pre>
                </div>
              </div>
            </div>
          </BlurFade>
        </section>
      </div>
    </main>
  );
}
