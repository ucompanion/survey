# 배포 (Deployment) 프롬프트 가이드

이 문서에서는 현재 프로젝트(`/Users/jochangi/Desktop/Workspaces/Ucomp/SurveyGit/`)를 배포하기 위해 AI 어시스턴트에게 내릴 수 있는 명령어와 그 동작 원리를 설명합니다.

---



## 1. 운영 배포 (Production)

AI에게 다음과 같이 입력하세요:
> **"운영배포 해줘"**

**[동작 원리]**
- 현재 작업 중인 변경 사항들을 Git `master` 브랜치에 안전하게 커밋(Commit)합니다.
- 깃허브 페이지(GitHub Pages) 등 운영 환경과 연결된 브랜치에 변경 사항이 영구 반영됩니다.
