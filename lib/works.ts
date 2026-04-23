export type Work = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  thumbnail: string;
  image: string;
  links: { label: string; url: string }[];
};

export const works: Work[] = [
  {
    slug: "avm",
    title: "AI 추정가 서비스",
    summary: "탁상감정 AI Agent와 AVM 백엔드 고도화, 심사 워크플로우에 맞춘 고신뢰 API 운영",
    description:
      "부동산 자동가치산정(AVM) 결과를 금융 심사에서 바로 사용할 수 있도록 만든 백엔드 중심 서비스입니다. 현장조사 이전 단계에서 빠르게 가격 기준을 제공해 심사 리드타임을 줄이는 데 집중했습니다.\n\n모델링 자체보다 서비스화 영역을 담당했습니다. 조회 API, 기관별 응답 포맷 표준화, 호 단위 도메인 매핑, 대출 워크플로우 연동 인터페이스를 설계하고 운영했습니다. 파이퍼 백엔드 전반을 맡아 탁상감정 AI Agent와 연결되는 서버 계층도 함께 고도화했습니다.\n\n성과 측면에서는 API 응답 속도를 400~500ms에서 100ms 미만으로 개선했고, CI/CD와 무중단 배포 체계를 정착시켜 운영 안정성을 높였습니다. 현재는 금융기관 심사 프로세스에서 참고 지표로 활용되는 백엔드를 지속 개선하고 있습니다.",
    thumbnail: "/파이퍼-금융기관용.png",
    image: "/파이퍼-금융기관용.png",
    links: [
      { label: "vos.land", url: "https://vos.land" },
      { label: "piper.financial", url: "https://piper.financial" },
    ],
  },
  {
    slug: "price-consulting",
    title: "가격자문 서비스",
    summary: "감정평가법인 연계 가격자문 백엔드 구축, 2시간 SLA와 금융기관 API 연동 운영",
    description:
      "감정평가법인과 금융기관을 연결해 자문 가격을 전달하는 의뢰-응답형 B2B 서비스입니다. AI 추정가와 최종 감정평가 사이의 2차 검증 레이어로, 심사 속도와 판단 일관성을 높이는 역할을 합니다.\n\n백엔드 워크플로우 구축과 운영을 담당했습니다. 의뢰 접수 API, 상태 전이, 결과 회신, 기관별 포맷 변환, 이력 추적 파이프라인을 설계했고 금융기관 연동 환경까지 함께 구성했습니다.\n\n영업일 기준 2시간 SLA를 위해 큐 처리, 실패 재처리, 모니터링 체계를 고도화했습니다. 케이뱅크, 토스뱅크 등 실제 연동 사례를 통해 비대면 심사 환경에서의 안정적인 운영을 검증했습니다.",
    thumbnail: "/가격자문.png",
    image: "/가격자문.png",
    links: [
      { label: "piper.financial", url: "https://piper.financial" },
    ],
  },
  {
    slug: "devbrothers",
    title: "데브브라더스 강의",
    summary: "개발자와 비개발자 모두를 위한 AI 실무 교육, 기초 특강부터 심화 핸즈온까지 맞춤 운영",
    description:
      "AI를 도구 수준이 아니라 실제 업무 방식으로 정착시키는 실무형 교육입니다. 개발자뿐 아니라 기획자, PM/PO, 디자이너, 비개발 직군까지 함께 수강할 수 있도록 난이도와 실습 범위를 유연하게 조정합니다.\n\n대표적으로 MCP, 바이브코딩, 에이전틱 엔지니어링, AI 주도 풀스택 개발, AI Agent 설계 등 다양한 트랙을 운영하고 있습니다. 정해진 몇 개 과정만 제공하는 방식이 아니라, 조직의 목표와 숙련도에 맞춰 커리큘럼을 재구성하는 기업 맞춤형 운영이 강점입니다.\n\n강의 전반은 핸즈온 중심으로 진행합니다. 요구사항 정리부터 구현, 테스트, 배포까지 한 흐름을 직접 수행하도록 설계해 실무 전환 속도를 높입니다. 삼성전자, LG CNS, 현대 NGV, NHN, 멀티캠퍼스 등 다양한 조직에서 반복 운영해온 교육 경험을 기반으로 과정 완성도를 고도화하고 있습니다.",
    thumbnail: "/콜로소.png",
    image: "/콜로소.png",
    links: [
      { label: "데브브라더스 홈페이지", url: "https://www.devbrothers.ai/" },
      {
        label: "AI 풀스택 웹개발",
        url: "https://coloso.co.kr/products/programmer-devbrother",
      },
      {
        label: "MCP 확장 가이드",
        url: "https://coloso.co.kr/products/programmer-devbrother2",
      },
      {
        label: "실전 SaaS 개발",
        url: "https://coloso.co.kr/products/programmer-devbrother3",
      },
    ],
  },
];
