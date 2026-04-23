# App AGENTS

## Module Context

`app/`은 App Router 진입점이다. 페이지, 레이아웃, 메타데이터, 글로벌 스타일 연결과 서버/클라이언트 경계를 여기서 관리한다.

## Tech Stack & Constraints

- Next.js App Router + React Server Components 기본
- TypeScript 필수
- 전역 스타일은 `app/globals.css` 단일 진입점 사용
- 클라이언트 훅, 브라우저 API, 이벤트 핸들러가 필요할 때만 `"use client"`를 선언한다

## Implementation Patterns

- 페이지와 레이아웃은 기본적으로 서버 컴포넌트로 유지한다.
- 메타데이터는 라우트 수준에서 `Metadata` 타입 기반으로 관리한다.
- 공통 레이아웃 클래스는 `body`, `html` 또는 상위 섹션에서 먼저 정리하고, 중복 래퍼를 늘리지 않는다.
- 이미지 렌더링은 가능하면 `next/image`를 사용한다.
- 폰트, 테마 토큰, 베이스 스타일은 `layout.tsx`와 `globals.css`에서 일관되게 유지한다.

## Testing Strategy

```bash
bun run lint
bun run build
```

- 라우트 구조, 메타데이터, 서버 컴포넌트 경계를 건드렸다면 `bun run build`까지 확인한다.
- 시각 변경은 `bun run dev`로 수동 확인한다.

## Local Golden Rules

- 단순 정적 섹션은 서버 컴포넌트로 유지한다.
- 클라이언트 컴포넌트가 필요하면 가장 얇은 leaf 컴포넌트로 범위를 제한한다.
- `generateMetadata`, 동적 라우트, 캐시 동작은 현재 Next.js 버전 기준으로 검증한다.
- 전역 CSS에 페이지 전용 스타일을 누적하지 않는다.
- 환경변수 접근이 필요하면 서버 전용 값과 `NEXT_PUBLIC_` 값을 명확히 구분한다.
