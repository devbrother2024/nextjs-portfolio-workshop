# Components AGENTS

## Module Context

`components/`는 재사용 가능한 UI 조합 레이어다. 기본 원칙은 Tailwind 우선이며, 접근성 복잡도가 높을 때만 shadcn/ui를 확장하고, 의미 있는 모션이 필요할 때만 Magic UI 계열을 도입한다.

## Tech Stack & Constraints

- 스타일링은 Tailwind CSS 우선
- 폼, 다이얼로그, 드롭다운, 시트 등은 `shadcn/ui` 우선 검토
- 애니메이션은 CSS로 충분하지 않을 때만 Magic UI 또는 동등한 패턴 사용
- 클래스 병합은 항상 `@/lib/utils`의 `cn()` 사용
- 새 의존성이나 새 컴포넌트 설치는 실제 사용 시점까지 미룬다

## Implementation Patterns

- 프레젠테이셔널 컴포넌트는 props 기반으로 만들고 데이터 fetch 책임을 넣지 않는다.
- shadcn 컴포넌트는 `components/ui`에 두고, 앱 전용 조합 컴포넌트는 그 바깥에서 감싼다.
- `components/ui`를 수정할 때는 variant, size, `asChild`, 접근성 관련 데이터 속성을 깨지 않는다.
- 반복되는 클래스 조합은 `cva` 또는 작은 래퍼 컴포넌트로 추출한다.
- 애니메이션은 장식 효과에 한정하고, 콘텐츠 가독성이나 초기 렌더 성능을 해치지 않게 유지한다.

## Testing Strategy

```bash
bun run lint
bun run dev
```

- 새 UI 컴포넌트를 추가했으면 상태별 hover, focus-visible, disabled, dark mode를 직접 확인한다.
- shadcn 기반 컴포넌트를 건드렸다면 키보드 탐색과 포커스 링이 유지되는지 확인한다.

## Local Golden Rules

- 단순 카드, 레이아웃, 배지, 섹션 래퍼는 먼저 Tailwind만으로 구현한다.
- 폼과 다이얼로그는 직접 바닥부터 만들지 말고 shadcn/ui를 우선 사용한다.
- Magic UI는 시각적 임팩트가 필요한 히어로, 배경, 등장 애니메이션에만 제한적으로 쓴다.
- 스타일 편의를 위해 전역 CSS 셀렉터를 늘리지 않는다.
- 사용하지 않는 shadcn 컴포넌트 파일은 미리 추가하지 않는다.
