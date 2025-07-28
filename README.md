# TechFit Frontend: AI 이력서 평가 및 적성 검사 시스템

TechFit 프로젝트의 프론트엔드 저장소입니다. AI 기반의 이력서 분석, 적성 검사, 그리고 채용 공고와의 비교 분석을 통해 사용자의 커리어 설계를 돕는 웹 애플리케이션을 제공합니다.

[![Repository](https://img.shields.io/badge/Repository-%23121011.svg?style=flat&logo=github&logoColor=white)](https://github.com/likelion-rocket-intern/frontend)

## 서비스 바로가기

- **배포된 서비스 URL:** [https://ai-resume.kknaks.site/](https://ai-resume.kknaks.site/)

> **Note:**
> 현재 백엔드 API는 배포된 프론트엔드 도메인에서의 요청만 허용하고 있어, 로컬 개발 환경(`localhost:3000`)에서는 API 연동 기능이 정상적으로 동작하지 않습니다. 코드 수정 후 기능 확인은 위 배포된 도메인 접속을 통해 진행해야 합니다.

## 사용자 플로우 (User Flow)

1.  **로그인:** 사용자는 카카오 소셜 로그인을 통해 서비스에 간편하게 가입하고 로그인합니다.
2.  **핵심 기능 수행:**
    - **이력서 업로드:** 자신의 이력서(PDF)를 업로드하여 AI 분석을 요청합니다.
    - **적성 검사:** 커리어넷의 직업 가치관 검사를 통해 자신의 직업적 성향을 파악합니다.
3.  **분석 준비:** 마이페이지에서 분석된 이력서 목록과 완료된 적성 검사 목록을 확인합니다.
4.  **종합 분석 요청:** 분석하고 싶은 채용 공고의 URL을 입력하고, 이전에 준비된 이력서와 적성 검사를 선택하여 종합 분석을 요청합니다.
5.  **결과 확인:** AI가 채용 공고와 사용자의 데이터를 비교 분석하여, 직무 적합도, 강점 및 약점, 추천 키워드 등을 포함한 종합 분석 리포트를 확인합니다.

## 기술 스택

| 영역                  | 기술 스택                              |
| --------------------- | -------------------------------------- |
| **Core**              | Next.js (v15), React (v19), TypeScript |
| **상태 관리**         | TanStack Query (React Query)           |
| **스타일링**          | Tailwind CSS, clsx, tailwind-merge     |
| **UI 컴포넌트**       | shadcn/ui, Radix UI, Headless UI       |
| **폼 관리**           | React Hook Form, Zod                   |
| **API 통신**          | openapi-fetch, openapi-typescript      |
| **테스팅 및 UI 개발** | Storybook                              |
| **개발 환경 및 배포** | Node.js, npm, Git, Github, Vercel      |

## 디렉토리 구조

```
frontend
├── .github/         # PR, Issue 템플릿
├── .storybook/      # Storybook 설정
├── public/          # 정적 에셋 (이미지, 아이콘)
└── src/
    ├── app/         # Next.js App Router (페이지 및 레이아웃)
    │   ├── (auth)/      # 인증 관련 페이지 그룹
    │   ├── (dashboard)/ # 대시보드 관련 페이지 그룹
    │   └── lib/         # API 클라이언트, 스키마 등
    ├── components/    # 재사용 가능한 UI 컴포넌트
    │   ├── layouts/     # 페이지 레이아웃 컴포넌트
    │   └── ui/          # 원자적 UI 컴포넌트 (shadcn/ui 스타일)
    ├── constants/     # 전역 상수
    ├── providers/     # 전역 컨텍스트 프로바이더 (React Query 등)
    ├── routes/        # 페이지 경로 상수
    ├── sections/      # 페이지의 주요 섹션 컴포넌트
    └── stories/       # Storybook 스토리 파일
```
