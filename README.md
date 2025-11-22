# [Happy-Friends] - Frontend Service

> **"가볍고 빠른 위치 기반 라이프스타일 플랫폼"**
> Astro의 강력한 성능과 React의 유연한 UI, 그리고 **Nano Stores**의 유연한 상태 관리를 결합하여 최상의 사용자 경험을 제공합니다.
<br>

## Tech Stack

### Core Framework & Language
![Astro](https://img.shields.io/badge/Astro-BC52EE?style=for-the-badge&logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

### State Management & Data Fetching
![Nano Stores](https://img.shields.io/badge/Nano_Stores-000000?style=for-the-badge&logo=javascript&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

### Styling & UI
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

### Maps & Payments (External SDK)
![Kakao Map](https://img.shields.io/badge/Kakao_Map_SDK-FFCD00?style=for-the-badge&logo=kakao&logoColor=black)
![Toss Payments](https://img.shields.io/badge/Toss_Payments_SDK-0064FF?style=for-the-badge&logo=toss&logoColor=white)

<br>

##  Project Overview

이 프로젝트는 **MPA(Multi Page Application)의 장점인 초기 로딩 속도**와 **SPA(Single Page Application)의 장점인 부드러운 인터랙션**을 동시에 잡기 위해 설계되었습니다.

- **Astro**: 정적 컨텐츠(메인 소개, 리스트 등)를 렌더링하여 검색 엔진 최적화(SEO)와 초기 로딩 속도를 극대화했습니다.
- **React & TypeScript**: 지도 조작, 채팅, 결제 등 복잡한 동적 기능이 필요한 부분(Island)에만 React를 사용하여 성능을 최적화했습니다.
- **Nano Stores**: React 컴포넌트뿐만 아니라 **Astro 파일(.astro) 및 일반 JS/TS 파일에서도 상태를 공유**하기 위해, 프레임워크에 구애받지 않는 초경량 상태 관리 라이브러리인 Nano Stores를 사용합니다.

<br>

##  Key Features (Frontend)

### 1.  Performance (Astro Islands)
- 페이지 전체를 자바스크립트로 두르지 않고, **꼭 필요한 부분(지도, 채팅창)만 React로 작동**하게 하여 사이트가 깃털처럼 가볍습니다.

### 2.  Interactive Map
- 사용자의 위치를 실시간으로 받아와 Kakao Map 위에 오버레이 합니다.
- 반경 설정(Radius)에 따라 동적으로 마커가 클러스터링되어 표시됩니다.

### 3.  Real-time Chat UI
- WebSocket과 연동된 채팅방 UI를 제공합니다.
- 메시지가 오면 화면 깜빡임 없이 자연스럽게 말풍선이 추가됩니다.

### 4.  Global State (Nano Stores)
- **React Island와 Astro 컴포넌트 간의 완벽한 데이터 동기화**를 지원합니다.
- 로그인한 사용자 정보, 찜한 목록 개수 등을 Nano Stores Atom으로 관리하여, 프레임워크 경계를 넘어 어디서든 데이터가 유지됩니다.

<br>

##  Installation & Run

```bash
# 1. 저장소 클론
git clone [Repository URL]

# 2. 패키지 설치
npm install

# 3. 개발 모드 실행
npm run dev