# AGENTS.md

## Operational Commands

```bash
bun install
bun run dev
bun run build
bun run lint
bunx --bun shadcn@latest add <component>
```

- 패키지 매니저는 항상 `bun`만 사용한다.
- 컴포넌트 추가는 필요할 때만 수행하고, 먼저 Tailwind만으로 해결 가능한지 확인한다.
- `npm`, `yarn`, `pnpm` 명령은 사용하지 않는다.

## Golden Rules

### Immutable

- API 키, 토큰, 시크릿은 하드코딩하지 않는다.
- `.env.local`은 생성할 수 있지만 커밋하지 않는다.
- 기존 사용자의 변경사항은 되돌리지 않는다.
- Next.js App Router 프로젝트이므로 구버전 Pages Router 관습을 가정하지 않는다.

### Do

- 답변, 코드 주석, 문서 추가는 한국어를 우선한다.
- UI는 Tailwind 우선으로 구현한다.
- 폼, 다이얼로그, 접근성 복잡도가 높은 인터랙션은 `shadcn/ui`를 우선 검토한다.
- 애니메이션은 CSS로 충분하지 않을 때만 Magic UI 또는 그 패턴을 사용한다.
- 공통 스타일 병합은 `@/lib/utils`의 `cn()`을 사용한다.
- 새 컴포넌트 도입 전 기존 `app/globals.css` 토큰과 유틸리티로 해결 가능한지 먼저 본다.

### Don't

- 필요 없는 UI 라이브러리나 shadcn 컴포넌트를 미리 설치하지 않는다.
- 비밀값을 예제 문자열로라도 소스에 남기지 않는다.
- 단순 스타일링 문제를 위해 불필요한 클라이언트 컴포넌트를 만들지 않는다.

## Project Context

개인 포트폴리오 사이트로, 빠른 초기 렌더링과 깔끔한 상호작용을 유지하면서 프로젝트/경력/소개 정보를 전달하는 것이 목표다.

Tech Stack: Next.js App Router, TypeScript, Tailwind CSS v4, shadcn/ui, Magic UI, Bun.

## Standards & References

- TypeScript는 현대적이고 관용적인 문법을 사용하고, 타입 단언보다 추론과 명시적 props 설계를 우선한다.
- import는 프로젝트 alias인 `@/*`를 우선 사용한다.
- 스타일은 가능한 한 컴포넌트 근처에서 Tailwind 클래스로 해결하고, 전역 CSS는 토큰·베이스 레이어 위주로만 사용한다.
- shadcn 컴포넌트를 수정할 때는 공개 API와 접근성 속성을 유지한다.
- 커밋 메시지는 항상 한국어로 작성한다.
- 규칙과 코드가 어긋나면 `AGENTS.md` 또는 하위 규칙 업데이트를 먼저 제안한다.

## Context Map

- **[App Router, 메타데이터, 페이지 구성](./app/AGENTS.md)** — 라우트, 레이아웃, 메타데이터, 서버/클라이언트 경계 수정 시.
- **[UI 컴포넌트와 스타일링](./components/AGENTS.md)** — Tailwind 우선 UI 작업, shadcn/ui 활용, 애니메이션 컴포넌트 추가 시.
