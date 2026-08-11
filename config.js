/**
 * 운영 및 스테이징 환경 도메인 자동 설정 파일
 * 
 * [자동 감지 로직]
 * 사용자가 접속한 브라우저 주소(window.location.hostname)를 분석하여
 * 자동으로 운영(GitHub Pages)과 스테이징(Cloudflare Tunnel) 환경을 구분합니다.
 */

// TODO: [매우 중요] 여기에 PHP 파일(request_api 폴더)을 업로드하신 실제 FTP 기본 도메인을 적어주세요!
// 예: 'https://ucomp.co.kr' 또는 'https://www.ucomp.co.kr'
let apiUrl = 'https://ucomp.co.kr'; // <-- 이곳을 FTP 도메인으로 변경해야 합니다.
let currentEnv = 'staging'; // 기본값을 검증(staging) 환경으로 안전하게 세팅

// 프론트엔드 도메인(깃허브 Pages) 접속 확인용
if (window.location.hostname.includes('request.ucomp.co.kr') || window.location.hostname.includes('github.io')) {
    // 🔵 [운영 환경] 실제 배포된 서브도메인 접속 시에만 운영 DB 사용
    currentEnv = 'prod';
}

const CONFIG = {
    API_BASE_URL: apiUrl,
    ENV: currentEnv
};
