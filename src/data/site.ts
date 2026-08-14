function asset(category: string, slug: string, count = 1) {
  return Array.from(
    { length: count },
    (_, index) => `/images/${category}/${slug}-${String(index + 1).padStart(2, '0')}.webp`,
  )
}

export const profile = {
  name: '박수현',
  nameEn: 'Suhyeon Park',
  role: 'Developer',
  tagline: '보이는 것부터 동작하는 것까지, 끝까지 만들어냅니다.',
  birth: '2001.11.21',
  email: 'contact.suhyeon@gmail.com',
  avatar: asset('profile', 'suhyeon-park')[0],
} as const

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'career', label: 'Career' },
  { id: 'projects', label: 'Projects' },
  { id: 'awards', label: 'Awards' },
  { id: 'education', label: 'Education' },
  { id: 'activity', label: 'Activity' },
  { id: 'contact', label: 'Contact' },
] as const

export const socials = [
  { label: 'GitHub', href: 'https://github.com/suhye0n' },
  { label: 'Email', href: `mailto:${profile.email}` },
] as const

export const archives = [
  { label: 'GitHub', display: 'github.com/suhye0n', href: 'https://github.com/suhye0n' },
  { label: 'velog', display: 'velog.io/@devl0g', href: 'https://velog.io/@devl0g' },
] as const

export const skillGroups = [
  {
    category: 'Frontend',
    items: ['React', 'Redux', 'Next.js', 'Zustand', 'Vue.js', 'JavaScript', 'HTML5', 'CSS3'],
  },
  { category: 'App', items: ['Electron', 'React Native', 'Flutter', 'MobX'] },
  {
    category: 'Backend',
    items: ['Java', 'Spring Boot', 'Vert.x', 'NestJS', 'Express.js', 'Python', 'Django', 'PHP'],
  },
  { category: 'Database', items: ['Oracle', 'MySQL', 'MariaDB', 'Redis', 'SQLite', 'Firebase'] },
  {
    category: 'Infra & DevOps',
    items: ['Docker', 'Kubernetes', 'Jenkins', 'AWS EC2', 'AWS S3', 'Private Cloud'],
  },
  { category: 'Tooling', items: ['Git', 'GitHub', 'Figma'] },
] as const

export type Career = {
  slug: string
  company: string
  location?: string
  department: string
  period: string
  duration?: string
  current?: boolean
  works: { title: string; period?: string; stack: string[] }[]
}

export const careers: Career[] = [
  {
    slug: 'clush',
    company: '(주)클러쉬',
    department: 'Hynix 개발팀 · 웹 개발',
    period: '2026.02 ~ 재직중',
    current: true,
    works: [
      {
        title: '한화엔진 Hotline 메신저 용역 개발',
        period: '2026.07 ~ 진행중',
        stack: [
          'React',
          'Redux',
          'Electron',
          'React Native',
          'Java',
          'Spring Boot',
          'MySQL',
          'Jenkins',
          'Kubernetes',
          'Redis',
        ],
      },
      {
        title: 'SK hynix CUBE 메신저 운영',
        period: '2026.02 ~ 2026.06',
        stack: [
          'React',
          'Redux',
          'Java',
          'Vert.x',
          'Redis',
          'Oracle',
          'Kubernetes',
          'Private Cloud',
        ],
      },
    ],
  },
  {
    slug: 'donggeurami-soft',
    company: '(주)동그라미소프트',
    department: '이행부문 · 웹 개발',
    period: '2025.07 ~ 2026.01',
    duration: '6개월',
    works: [
      {
        title: 'SK hynix CUBE 메신저 운영',
        period: '2025.07 ~ 2026.01',
        stack: [
          'React',
          'Redux',
          'Java',
          'Vert.x',
          'Redis',
          'Oracle',
          'Kubernetes',
          'Private Cloud',
        ],
      },
    ],
  },
  {
    slug: 'ingstory',
    company: '(주)아이엔지스토리',
    location: '서울',
    department: '프로덕트 개발팀 · 서버 개발',
    period: '2024.11 ~ 2025.06',
    duration: '7개월',
    works: [
      {
        title: 'PickKo 어드민 프론트엔드 시스템 마이그레이션',
        period: '2025.05 ~ 2025.06',
        stack: ['Next.js', 'Zustand', 'Ant Design'],
      },
      { title: 'PickKo 키오스크 프로그램 R&D', period: '2025.05', stack: ['Electron', 'React'] },
      {
        title: 'PickKo 모바일 애플리케이션 유지보수',
        period: '2025.04 ~ 2025.06',
        stack: ['Flutter', 'React', 'MobX'],
      },
      {
        title: 'PickKo 어드민 유지보수',
        period: '2025.04 ~ 2025.06',
        stack: ['PHP', 'CodeIgniter3'],
      },
      {
        title: 'PickKo 어드민 백엔드 시스템 마이그레이션',
        period: '2024.11 ~ 2025.03',
        stack: ['NestJS', 'MariaDB', 'Redis', 'AWS EC2', 'AWS S3'],
      },
    ],
  },
  {
    slug: 'holits',
    company: '홀리츠',
    location: '서울',
    department: '개발팀 · 웹 프론트엔드 및 서버 개발',
    period: '2024.01 ~ 2024.11',
    duration: '10개월',
    works: [
      {
        title: '배달 플랫폼 구축용 SaaS 신규 개발',
        period: '2024.03 ~ 2024.11',
        stack: ['Express.js', 'Sequelize', 'Swagger', 'Python', 'Docker', 'MariaDB'],
      },
      {
        title: '인천 중구 문화재야행 웹사이트 유지보수',
        period: '2024.04 ~ 2024.05',
        stack: ['Vanilla JavaScript', 'Express.js', 'MariaDB'],
      },
      {
        title: '호텔 CMS 서비스 유지보수 및 기능 개선',
        period: '2024.01 ~ 2024.11',
        stack: ['React', 'Redux', 'Python', 'Docker'],
      },
    ],
  },
]

export type Project = {
  slug: string
  title: string
  summary: string
  highlights: string[]
  parts: string[]
  stacks: { category: string; items: string[] }[]
  links: { label: string; display: string; href: string }[]
  images: string[]
}

export const projects: Project[] = [
  {
    slug: 'semtlekkun',
    title: '셈틀꾼 공식 홈페이지',
    summary: '학술동아리 셈틀꾼의 회원용 공식 홈페이지',
    highlights: [
      '동아리 회원들이 사용할 수 있는 공식 홈페이지를 개발했습니다.',
      '프로젝트 공고, 게시판, 질문 사이트를 구현했습니다.',
      '관리자 페이지를 통한 인원 관리 기능을 구현했습니다.',
    ],
    parts: ['Front-end'],
    stacks: [
      { category: 'Front-end', items: ['Vue.js'] },
      { category: 'Back-end', items: ['Node.js', 'Express'] },
      { category: 'Database', items: ['Mongoose'] },
      { category: 'Deployment', items: ['ipTIME'] },
    ],
    links: [
      {
        label: 'GitHub',
        display: 'github.com/semtlekkun',
        href: 'https://github.com/semtlekkun',
      },
    ],
    images: asset('projects', 'semtlekkun', 10),
  },
  {
    slug: 'child-meal-card',
    title: '아동급식카드 가맹점 안내 서비스',
    summary: '결식 우려 아동이 더 다양한 가맹점을 선택할 수 있도록 만든 위치 기반 안내 서비스',
    highlights: [
      '아동급식카드 가맹점 정보를 안내하는 홈페이지입니다.',
      '결식 아동들이 보다 다양한 가맹점을 선택할 수 있도록 설계했습니다.',
      '2023 한국정보기술학회 대학생 논문경진대회 우수논문상(동상)을 수상했습니다.',
    ],
    parts: ['Front-end'],
    stacks: [
      { category: 'Back-end', items: ['Django'] },
      { category: 'Database', items: ['SQLite'] },
      { category: 'Deployment', items: ['Amazon Web Services (AWS)'] },
    ],
    links: [
      { label: 'GitHub', display: 'github.com/KITtowel', href: 'https://github.com/KITtowel' },
      { label: 'URL', display: 'forunderwater.life', href: 'https://forunderwater.life/' },
    ],
    images: asset('projects', 'child-meal-card', 6),
  },
]

export type Credential = {
  slug: string
  title: string
  organization: string
  date: string
  tag?: string
  note?: string
  images: string[]
}

export const awards: Credential[] = [
  {
    slug: 'startup-club-prototype',
    title: '창업동아리(시제품 제작) 경진대회 디자인·설계 아이디어상',
    organization: 'LINC 3.0 사업 · 국립금오공과대학교 창업원',
    date: '2023.12.28',
    note: '프로그래밍 담당',
    images: asset('awards', 'startup-club-prototype'),
  },
  {
    slug: 'sw-talent-program',
    title: 'SW전문인재양성과정 장려상',
    organization: '포항테크노파크',
    date: '2023.12.06',
    note: '팀 알리미보조 · 사용자 정보 및 관심 분야 기반의 맞춤 보조금 안내 서비스',
    images: asset('awards', 'sw-talent-program'),
  },
  {
    slug: 'webkit-640',
    title: '제3회 WEBKIT640 팀 프로젝트 대상',
    organization: '국립금오공과대학교',
    date: '2023.11.27',
    tag: '대상',
    note: '경북 네트워크형 캠퍼스 SW아카데미 과정 · 팀 알리미보조 팀장',
    images: asset('awards', 'webkit-640', 2),
  },
  {
    slug: 'kiit-paper-2023',
    title: '대학생 논문경진대회 우수논문상 (동상)',
    organization: '한국정보기술학회',
    date: '2023.06.02',
    note: '결식 우려 아동을 위한 위치 기반 아동급식카드 가맹점 안내 서비스',
    images: asset('awards', 'kiit-paper-2023'),
  },
  {
    slug: 'kiit-paper-2020',
    title: '대학생 논문경진대회 우수논문 (동상)',
    organization: '한국정보기술학회',
    date: '2020.10.23',
    note: '양자점 셀룰러 오토마타를 이용한 JK 플립플롭 기반의 시프트 레지스터 설계',
    images: asset('awards', 'kiit-paper-2020'),
  },
]

export const certificates: Credential[] = [
  {
    slug: 'metaverse-expert',
    title: '메타버스전문가 2급',
    organization: '커넥트직무센터',
    date: '2022.08.26',
    note: '자격번호 2022-KOB0826-0012',
    images: asset('certificates', 'metaverse-expert'),
  },
]

export const educations: Credential[] = [
  {
    slug: 'postech-python-1',
    title: 'Python 프로그래밍 I',
    organization: 'POSTECH · SmartLearn',
    date: '2020.02.07',
    tag: 'Honor',
    images: asset('education', 'postech-python-1'),
  },
  {
    slug: 'postech-web-basics',
    title: '웹 프로그래밍 기초',
    organization: 'POSTECH · SmartLearn',
    date: '2020.03.02',
    tag: 'Honor',
    images: asset('education', 'postech-web-basics'),
  },
  {
    slug: 'postech-blockchain-1',
    title: '블록체인 입문 1',
    organization: 'POSTECH · SmartLearn',
    date: '2020.03.08',
    tag: 'Honor',
    images: asset('education', 'postech-blockchain-1'),
  },
  {
    slug: 'postech-python-2',
    title: 'Python 프로그래밍 II',
    organization: 'POSTECH · SmartLearn',
    date: '2020.03.10',
    tag: 'Honor',
    images: asset('education', 'postech-python-2'),
  },
  {
    slug: 'postech-python-1-completion',
    title: 'Python 프로그래밍 I',
    organization: 'POSTECH · SmartLearn',
    date: '2020.04.26',
    note: 'POSTECH · SmartLearn',
    images: asset('education', 'postech-python-1-completion'),
  },
  {
    slug: 'cloud-security-2026',
    title: '2026년 클라우드 서비스 보안 교육(온라인)',
    organization: '한국정보보호산업협회(KISIA)',
    date: '2026.08.13',
    note: '한국정보보호산업협회',
    images: asset('education', 'cloud-security-2026'),
  },
]

export type Activity = {
  slug: string
  title: string
  role: string
  kind: string
  period: string
  highlights: string[]
  logo: string
  images: string[]
}

export const activities: Activity[] = [
  {
    slug: 'semtle',
    title: '셈틀꾼',
    role: '총무',
    kind: '교내 동아리 활동',
    period: '2022.03 ~ 2022.12',
    highlights: [
      '학술동아리 셈틀꾼에서 총무를 맡아 재정 관리 및 운영에 관한 일들을 주도적으로 수행했습니다.',
    ],
    logo: asset('activities', 'semtle-logo')[0],
    images: asset('activities', 'semtle', 2),
  },
  {
    slug: 'kite',
    title: 'KITE',
    role: '부회장',
    kind: '교내 동아리 활동',
    period: '2022.03 ~ 2022.12',
    highlights: [
      '영어동아리 KITE에서 부회장을 맡아 부원들의 영어 능력 향상을 위한 활동을 기획하고 실행했습니다.',
    ],
    logo: asset('activities', 'kite-logo')[0],
    images: asset('activities', 'kite', 5),
  },
]

export const volunteer = {
  slug: 'dovol-science-day',
  title: '대학생 과학교육봉사단 "과학의달" 행사 지원 활동',
  images: asset('volunteer', 'dovol-science-day'),
  details: [
    { label: '인증기관', value: 'DOVOL' },
    { label: '모집기관', value: '구미과학관' },
    { label: '자원봉사유형', value: '학습지도 교육' },
    { label: '활동구분', value: '오프라인' },
    { label: '봉사날짜', value: '2023.04.22' },
    { label: '봉사시간', value: '12:00 ~ 17:00 (5시간)' },
  ],
} as const
