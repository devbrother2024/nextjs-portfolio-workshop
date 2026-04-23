import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { HeroLightSpot } from "@/components/hero-light-spot";
import { ContactForm } from "@/components/contact-form";
import { works } from "@/lib/works";

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
            background: "linear-gradient(to bottom, transparent, var(--background))",
          }}
        />

        <div className="relative mx-auto w-full max-w-3xl px-6 py-32 flex items-center gap-8">
          {/* 왼쪽: 텍스트 + CTA */}
          <div className="flex flex-1 flex-col gap-8">
            <div className="flex flex-col gap-5">
              <BlurFade delay={0} direction="up">
                <span className="text-xs font-semibold tracking-widest uppercase text-primary">
                  안녕하세요
                </span>
              </BlurFade>

              <BlurFade delay={0.1} direction="up">
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
              </BlurFade>

              <BlurFade delay={0.2} direction="up">
                <p className="text-xl leading-relaxed text-foreground/80">
                  AI를 단순히 쓰는 것을 넘어,{" "}
                  <strong className="font-semibold text-foreground">
                    개발 워크플로우 자체를 AI Native하게 전환합니다
                  </strong>
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.3} direction="up">
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
            </BlurFade>
          </div>

          {/* 오른쪽: 아바타 */}
          <BlurFade delay={0.25} direction="up" className="hidden sm:flex flex-shrink-0 items-end justify-center">
            <Image
              src="/avatar-chibi-hero.png"
              alt="개발동생 캐릭터"
              width={499}
              height={665}
              priority
              className="w-52 h-auto drop-shadow-xl"
            />
          </BlurFade>
        </div>
      </section>

      <main className="mx-auto w-full max-w-3xl px-6 py-24 flex flex-col gap-32">

        {/* ── About ───────────────────────────────────────── */}
        <section className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <BlurFade delay={0} inView direction="up">
              <h2 className="text-3xl font-bold tracking-tight">About</h2>
            </BlurFade>
            <BlurFade delay={0.1} inView direction="up">
              <p className="text-lg leading-relaxed text-foreground/75">
                현직 프로덕트 엔지니어이자 개발 크리에이터예요. 코딩·자동화·비즈니스
                시스템까지 AI로 바꿔나가는 실전 과정을 강의·유튜브·기업
                컨설팅으로 함께합니다.
              </p>
            </BlurFade>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* 강의 이력 */}
            <BlurFade delay={0.2} inView direction="up" className="h-full">
              <MagicCard
                className="h-full"
                gradientFrom="#9E7AFF"
                gradientTo="#FE8BBB"
                gradientColor="#f0ebff"
              >
                <div className="p-6 flex flex-col gap-4">
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
              </MagicCard>
            </BlurFade>

            {/* 개발 이력 */}
            <BlurFade delay={0.3} inView direction="up" className="h-full">
              <MagicCard
                className="h-full"
                gradientFrom="#FE8BBB"
                gradientTo="#FFB347"
                gradientColor="#fff5eb"
              >
                <div className="p-6 flex flex-col gap-4">
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
              </MagicCard>
            </BlurFade>
          </div>
        </section>

        {/* ── Works ───────────────────────────────────────── */}
        <section className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <BlurFade delay={0} inView direction="up">
              <h2 className="text-3xl font-bold tracking-tight">Works</h2>
            </BlurFade>
            <BlurFade delay={0.1} inView direction="up">
              <p className="text-lg leading-relaxed text-foreground/75">
                가르치고 만들고 운영하며, 도입부터 정착까지 돕습니다.
              </p>
            </BlurFade>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {works.map((work, i) => (
              <BlurFade key={work.slug} delay={0.1 + i * 0.1} inView direction="up" className="h-full">
                <Link href={`/works/${work.slug}`} className="block h-full">
                  <MagicCard className="h-full" gradientFrom="#9E7AFF" gradientTo="#FE8BBB" gradientColor="#f0ebff">
                    <div className="flex flex-col">
                      <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={work.thumbnail}
                          alt={work.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-col gap-2 p-5">
                        <h3 className="font-semibold leading-snug">{work.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {work.summary}
                        </p>
                      </div>
                    </div>
                  </MagicCard>
                </Link>
              </BlurFade>
            ))}
          </div>
        </section>

        {/* ── Contact ─────────────────────────────────────── */}
        <section className="flex flex-col gap-10" id="contact">
          <div className="flex flex-col gap-2">
            <BlurFade delay={0} inView direction="up">
              <h2 className="text-3xl font-bold tracking-tight">Contact</h2>
            </BlurFade>
            <BlurFade delay={0.1} inView direction="up">
              <p className="text-lg leading-relaxed text-foreground/75">
                프로젝트 문의·강의 협업, 편하게 보내주세요
              </p>
            </BlurFade>
          </div>

          <BlurFade delay={0.2} inView direction="up">
            <MagicCard
              className="h-full"
              gradientFrom="#9E7AFF"
              gradientTo="#FFB347"
              gradientColor="#fff3f8"
            >
              <ContactForm />
            </MagicCard>
          </BlurFade>
        </section>

      </main>
    </div>
  );
}
