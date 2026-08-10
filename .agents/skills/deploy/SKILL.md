---
name: 배포 명령어 (Deploy)
description: 운영배포(master 커밋) 명령을 수행합니다.
---

# 배포 (Deployment) 행동 지침

사용자가 "운영배포"를 요청할 경우, 아래의 지침에 따라 즉각적으로 터미널(`run_command`)을 사용하여 작업을 수행하세요.


## 1. 운영배포 (Production Deploy)
- **트리거 단어**: `운영배포`
- **동작**: 현재 저장소의 모든 변경사항을 `master` 브랜치에 커밋(Commit)합니다.
- **실행 명령어**:
  `git add .`
  `git commit -m "deploy: 운영 배포 업데이트"` (또는 상황에 맞는 메시지)
  (필요시 `git push origin master` 도 함께 수행하여 원격에 반영)
- **완료 보고**: 명령어 실행이 완료되면 "운영 배포(master 브랜치 커밋)가 완료되었습니다"라고 안내하세요.
