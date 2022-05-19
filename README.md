# 우리동네 북클럽
"우리동네 북클럽" 웹서비스를 위한 App입니다.  
Backend는 https://github.com/bookclubstory/bookclub-back 를 참고해주세요!

## Current Status
> 프로젝트 종료 (@2022.05.18.)  

팀원들의 개인 스케쥴 조정이 어려워 프로젝트를 중도에 종료합니다.  

### 구현 단계
1. 회원가입 페이지  
2. 로그인 페이지  
3. 메인 페이지: 레이아웃  
4. 북클럽 목록 페이지: 레이아웃  
5. 독서 로그 목록 페이지: 레이아웃 및 목록 조회, 신규  

*** 

## 기능
- 메인 페이지 : 통합검색, 이달의 인기 도서, 추천 모임
- 북클럽 : 모임 개설, 북클럽 목록조회, 북클럽 상세보기
- 독서로그 : 개인 독서 활동 게시물 (예시: 사진 + 글 + 태그)
- 마이 페이지 : 개인 프로필, 참여중인 북클럽 정보, 작성한 독서로그, 북마크한 도서 정보

## 기술 스택
- Frontend : React + TypeScript
- Backend : Spring boot, JPA
- DB : PostgreSQL
- Session : Redis

## 프로젝트 구조
- /public/images : 이미지 파일과 같은 정적 리소스
- /src/components : 메뉴와 같은 컨테이너 타입의 컴포넌트
- /src/modules : Redux 모듈
- /src/pages : 화면 컴포넌트
- /src/styles : css와 스타일 관련 소스
- /src/utils : 공통 함수 등과 같은 유틸

## Crew
- 권용희 : 기획 & 개발 @[konsent](https://github.com/konsent)
- 손소라 : 풀스택 개발 @[ssr03](https://github.com/ssr03)
- 윤종현 : PM & 개발 @[starrything](https://github.com/starrything)
- 정지용 : 풀스택 개발 @[jylvxx](https://github.com/jylvxx)
