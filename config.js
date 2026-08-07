/**
 * 운영 및 스테이징 환경 도메인 자동 설정 파일
 * 
 * [자동 감지 로직]
 * 사용자가 접속한 브라우저 주소(window.location.hostname)를 분석하여
 * 자동으로 운영(GitHub Pages)과 스테이징(Cloudflare Tunnel) 환경을 구분합니다.
 */

// TODO: 나중에 백엔드 연동(2단계) 시 아래 주석을 해제하여 API 주소를 연결하세요.
let apiUrl = 'https://wiley-shakira-book-bio.trycloudflare.com';
let currentEnv = 'staging';

if (window.location.hostname.includes('github.io')) {
    // 🔵 [운영 환경] 깃허브 페이지 접속 시 (운영 DB 사용)
    currentEnv = 'prod';
}

const CONFIG = {
    API_BASE_URL: apiUrl,
    ENV: currentEnv
};
