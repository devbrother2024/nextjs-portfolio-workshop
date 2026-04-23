import { Button } from "@/components/ui/button";
import { HeroLightSpot } from "@/components/hero-light-spot";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          backgroundImage: "url('/hero-gradient-mesh.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* 텍스트 가독성 확보용 오버레이 */}
        <div className="absolute inset-0 bg-white/40" aria-hidden />
        {/* 마우스 추적 라이트 스팟 */}
        <HeroLightSpot />
        {/* 하단 페이드 아웃 */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          aria-hidden
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--background))",
          }}
        />

        <div className="relative mx-auto w-full max-w-3xl px-6 py-32 flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">
              안녕하세요
            </span>

            <h1
              className="text-5xl font-bold tracking-tight sm:text-6xl"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.55 0.22 280) 0%, oklch(0.65 0.22 0) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              개발동생
            </h1>

            <p className="max-w-lg text-xl leading-relaxed text-foreground/80">
              AI를 단순히 쓰는 것을 넘어,{" "}
              <strong className="font-semibold text-foreground">
                개발 워크플로우 자체를 AI Native하게 전환합니다
              </strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="shadow-md transition-opacity hover:opacity-90"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.55 0.22 280) 0%, oklch(0.65 0.22 0) 100%)",
                color: "white",
                border: "none",
              }}
            >
              <a href="mailto:hello@devbrothers.ai">강의 문의하기</a>
            </Button>

            <a
              href="https://www.youtube.com/@개발동생"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground/60 underline underline-offset-4 hover:text-primary transition-colors"
            >
              YouTube @개발동생
            </a>
          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-3xl px-6 py-24 flex flex-col gap-32">

        {/* ── About ───────────────────────────────────────── */}
        <section className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold tracking-tight">About</h2>
            <p className="text-lg leading-relaxed text-foreground/75">
              현직 프로덕트 엔지니어이자 개발 크리에이터예요. 코딩·자동화·비즈니스
              시스템까지 AI로 바꿔나가는 실전 과정을 강의·유튜브·기업
              컨설팅으로 함께합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* 강의 이력 */}
            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                  style={{ background: "oklch(0.55 0.22 280)" }}
                />
                <h3 className="font-semibold">강의 이력</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                &apos;데브브라더스&apos; 대표·강사로 활동하며 삼성전자 · LG CNS · 현대
                NGV · NHN · 멀티캠퍼스 · 콜로소 등에서 AI 주도 개발 ·
                바이브코딩 · MCP 강의를 진행했습니다.
              </p>
              <span
                className="w-fit text-xs font-semibold px-3 py-1 rounded-full"
                style={{
                  color: "oklch(0.55 0.22 280)",
                  background: "oklch(0.55 0.22 280 / 0.1)",
                }}
              >
                콜로소 2025 AI 분야 완강률 TOP
              </span>
            </div>

            {/* 개발 이력 */}
            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                  style={{ background: "oklch(0.65 0.22 0)" }}
                />
                <h3 className="font-semibold">개발 이력</h3>
              </div>
              <ul className="text-sm leading-relaxed text-muted-foreground space-y-2">
                {[
                  "프롭테크 스타트업 '공간의가치' 프로덕트 엔지니어 (6년차)",
                  "탁상감정 AI Agent 개발",
                  "대출중개 서비스 백엔드 구축",
                  "통합 인증 · MSA 기반 CI/CD 인프라 구축",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1 w-1 rounded-full bg-muted-foreground/40 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

