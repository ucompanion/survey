// ==========================================
// Survey App Initialization
// ==========================================
const formData = [
    {
        category: "기본정보",
        icon: "ph-info",
        items: [
            { id: "site_name", label: "홈페이지명", type: "text", placeholder: "예: 유컴패니온 공식 홈페이지" },
            { id: "site_url", label: "홈페이지 주소(URL)", type: "url", placeholder: "예: https://ucomp.co.kr" },
            { id: "benchmarking", label: "벤치마킹", type: "textarea", placeholder: "참고할 만한 사이트 URL이나 특징을 적어주세요." },
            { id: "reason", label: "개편이유", type: "textarea", placeholder: "프로젝트를 진행하게 된 주된 배경을 적어주세요." },
            { id: "requirements", label: "정보구조 및 기능개선 요구사항", type: "textarea", placeholder: "핵심적으로 필요한 기능이나 메뉴 구조 변경 사항을 적어주세요." },
            { id: "requirements_file", label: "요구사항 정의서(RFP) 첨부", type: "file" },
            { id: "purpose", label: "홈페이지 목적", type: "text", placeholder: "기업홍보, 쇼핑몰, 예약, 커뮤니티, 서비스, 랜딩페이지 등 자유롭게 작성해주세요" },
            { id: "competitors", label: "경쟁업체", type: "text", placeholder: "동일한 서비스를 제공하는 경쟁업체명 또는 URL을 입력해 주세요." },
            { id: "brand_image", label: "선호하는 브랜드 이미지", type: "text", placeholder: "전문적이고 신뢰감 있는 이미지, 친근하고 편안한 이미지, 세련되고 고급스러운 이미지" },
            { id: "visual_style", label: "원하는 화면 구성이나 시각적 표현 방식", type: "text", placeholder: "사진 중심, 텍스트 중심, 심플한 구성, 정보가 풍부한 구성, 애니메이션·인터랙션 활용" }
        ]
    },
    {
        category: "도메인",
        icon: "ph-globe",
        items: [
            { id: "domain_owner", label: "도메인 소유자", type: "radio", options: ["회사", "대표자", "개인", "개발사", "대행사"] },
            { id: "domain_registrar", label: "도메인 등록업체", type: "radio", options: ["가비아", "카페24", "후이즈", "AWS Route53", "Cloudflare", "GoDaddy", "기타"], allowDirectInput: true },
            { id: "account_access", label: "계정 접근 가능", type: "radio", options: ["가능", "불가능", "확인필요"] },
            { id: "ssl_use", label: "SSL 사용", type: "radio", options: ["사용", "미사용"] }
        ]
    },
    {
        category: "서버",
        icon: "ph-hard-drives",
        items: [
            { id: "server_type", label: "서버 운영방식", type: "radio", options: ["클라우드", "IDC", "웹호스팅", "서버호스팅", "사내서버"] },
            { id: "cloud_type", label: "클라우드 종류", type: "radio", options: ["AWS", "Azure", "GCP", "NCP", "KT Cloud", "NHN Cloud", "해당없음"] },
            { id: "os", label: "운영체제", type: "radio", options: ["Ubuntu", "CentOS", "RockyLinux", "Debian", "Windows Server", "기타"], allowDirectInput: true },
            { id: "web_server", label: "웹서버", type: "radio", options: ["Apache", "Nginx", "IIS", "LiteSpeed", "기타"], allowDirectInput: true },
            { id: "was", label: "WAS", type: "radio", options: ["Tomcat", "JBoss", "WildFly", "Jetty", "Node.js", "PHP-FPM", "없음"] }
        ]
    },
    {
        category: "개발환경",
        icon: "ph-code",
        items: [
            { id: "language", label: "개발언어", type: "checkbox", options: ["PHP", "Java", "ASP.NET", "Python", "Node.js", "Ruby", "Go", "기타"], allowDirectInput: true },
            { id: "framework", label: "프레임워크", type: "checkbox", options: ["Spring", "Spring Boot", "Laravel", "Django", "Express", "NestJS", "CodeIgniter", "없음"] },
            { id: "frontend", label: "프론트엔드", type: "checkbox", options: ["HTML+jQuery", "React", "Vue", "Angular", "Next.js", "Nuxt.js", "Svelte"] }
        ]
    },
    {
        category: "DB",
        icon: "ph-database",
        items: [
            { id: "db_type", label: "DB 종류", type: "checkbox", options: ["MySQL", "MariaDB", "PostgreSQL", "Oracle", "MSSQL", "SQLite"] },
            { id: "backup", label: "백업", type: "radio", options: ["자동", "수동", "없음"] }
        ]
    },
    {
        category: "CMS",
        icon: "ph-layout",
        items: [
            { id: "cms_use", label: "CMS 사용", type: "radio", options: ["사용", "미사용"] },
            { id: "cms_type", label: "CMS 종류", type: "radio", options: ["워드프레스", "그누보드", "영카트", "XE", "Rhymix", "Drupal", "Joomla", "기타"], allowDirectInput: true }
        ]
    },
    {
        category: "API",
        icon: "ph-plugs",
        items: [
            { id: "api_use", label: "API 사용", type: "radio", options: ["있음", "없음"] },
            { id: "api_details", label: "API 상세 내용 (사용 시)", type: "checkbox", options: ["PG", "소셜로그인", "지도", "SMS", "알림톡", "Firebase", "ERP", "기타"], allowDirectInput: true }
        ]
    },
    {
        category: "운영",
        icon: "ph-terminal-window",
        items: [
            { id: "git", label: "Git", type: "radio", options: ["GitHub", "GitLab", "Bitbucket", "Azure DevOps", "없음"] },
            { id: "cicd", label: "CI/CD", type: "radio", options: ["GitHub Actions", "Jenkins", "GitLab CI", "없음"] }
        ]
    },
    {
        category: "메일",
        icon: "ph-envelope",
        items: [
            { id: "mail_service", label: "메일 서비스", type: "radio", options: ["Google Workspace", "M365", "카페24", "네이버웍스", "자체메일", "기타"], allowDirectInput: true }
        ]
    },
    {
        category: "유지보수",
        icon: "ph-wrench",
        items: [
            { id: "maintenance", label: "유지보수 업체", type: "radio", options: ["있음", "없음"] },
            { id: "source_code", label: "소스코드 보유", type: "radio", options: ["회사", "개발사", "없음"] },
            { id: "doc_design", label: "설계서", type: "file" },
            { id: "doc_erd", label: "DB ERD", type: "file" },
            { id: "doc_api", label: "API 문서", type: "file" },
            { id: "org_personnel", label: "조직인원", type: "text", placeholder: "예: 00명" }
        ]
    },
    {
        category: "CRM 연동",
        icon: "ph-users-three",
        items: [
            { id: "crm_company", label: "CRM 업체", type: "radio", options: ["있음", "없음"] },
            { id: "crm_api", label: "CRM API 제공여부", type: "radio", options: ["제공", "미제공"] }
        ]
    },
    {
        category: "프로젝트 예산",
        icon: "ph-money",
        items: [
            { id: "project_budget", label: "금액", type: "text", placeholder: "금액을 직접 입력해주세요 (예: 5,000만원 내외)" }
        ]
    }
];

// Global State
let currentData = {};
let currentMode = 'create'; // 'create', 'edit', 'admin', 'view'
let adminClickCount = 0;
let adminClickTimer = null;
const urlParams = new URLSearchParams(window.location.search);
const isTestMode = urlParams.get('test') === 'true';

// v2.0 다중 프로젝트 구조 준비 (URL에서 pid 추출, 없으면 null)
let projectId = urlParams.get('pid');
let TARGET_ENV = urlParams.get('env') || CONFIG.ENV;

// DOM Elements
const appContent = document.getElementById('app-content');
const resultModal = document.getElementById('result-modal');
const adminLoginModal = document.getElementById('admin-login-modal');

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    if (window.location.pathname.includes('admin.html')) return; // Skip initialization for admin page

    // 관리자 로고 5번 클릭 이벤트는 항상 활성화
    setupAdminTrigger();

    if (!projectId) {
        // pid가 없으면 새 프로젝트 생성(ID 입력) 화면 렌더링
        renderLandingPage();
    } else {
        // Auto load existing data if present
        try {
            const res = await fetch(`${CONFIG.API_BASE_URL}/load.php?projectId=${projectId}&env=${TARGET_ENV}`, {
                headers: { 'bypass-tunnel-reminder': 'true' }
            });
            if (res.ok) {
                currentData = await res.json();
                currentMode = 'view';
            } else {
                currentMode = 'create';
            }
        } catch (e) {
            currentMode = 'create';
        }

        // pid가 있으면 기존 로직대로 설문 폼 렌더링
        updateLoadButton();
        renderForm();
    }
});

function renderLandingPage() {
    currentMode = 'landing';
    const html = `
        <div class="form-section glass-panel" style="text-align: center; padding: 60px 30px; animation: slideUp 0.5s ease forwards; max-width: 600px; margin: 40px auto;">
            <div style="font-size: 3.5rem; color: var(--primary); margin-bottom: 20px;"><i class="ph ph-rocket-launch"></i></div>
            <h2 style="font-size: 1.8rem; margin-bottom: 15px; color: #2d3436;">프로젝트 질문지 시작</h2>
            <p style="color: var(--text-muted); margin-bottom: 40px; font-size: 1rem; line-height: 1.6; word-break: keep-all;">
                작업하실 <strong>프로젝트의 고유 ID(영문/숫자)</strong>를 입력해 주세요.<br>
                입력하신 ID로 전용 접속 링크가 생성됩니다.
            </p>
            <div style="max-width: 400px; margin: 0 auto; display: flex; flex-direction: column; gap: 15px;">
                <input type="text" id="landing-pid-input" class="form-control" placeholder="예: apple, kakao_2024" style="text-align: center; font-size: 1.1rem; padding: 15px;" onkeypress="if(event.key === 'Enter') window.startNewProject()">
                <button class="btn btn-primary" onclick="window.startNewProject()" style="padding: 15px; font-size: 1.1rem;">
                    시작하기 <i class="ph ph-arrow-right"></i>
                </button>
            </div>
        </div>
    `;
    appContent.innerHTML = html;

    // 헤더의 로드 버튼 숨김 처리
    const loadBtn = document.getElementById('btn-load-data');
    if (loadBtn) loadBtn.style.display = 'none';
}

window.startNewProject = function () {
    const input = document.getElementById('landing-pid-input').value.trim();
    if (!input) {
        showAlert('알림', '프로젝트 ID를 입력해주세요.', 'info');
        return;
    }
    // 영문, 숫자, 언더바만 허용 (보안 및 파일명 안정성)
    if (!/^[a-zA-Z0-9_]+$/.test(input)) {
        showAlert('알림', '프로젝트 ID는 영문, 숫자, 밑줄(_)만 사용 가능합니다.', 'warning');
        return;
    }

    // 해당 ID의 URL로 리다이렉트
    window.location.href = '?pid=' + input;
};

async function updateLoadButton() {
    const btn = document.getElementById('btn-load-data');
    if (!btn) return;

    try {
        const res = await fetch(`${CONFIG.API_BASE_URL}/load.php?projectId=${projectId}&env=${TARGET_ENV}`, {
            headers: {
                'bypass-tunnel-reminder': 'true'
            }
        });
        if (res.ok) {
            const data = await res.json();
            const siteName = data.site_name || '이름 없는 홈페이지';
            const nameSpan = btn.querySelector('#load-site-name');
            if (nameSpan) nameSpan.textContent = siteName;
            btn.style.display = 'inline-flex';
        } else {
            btn.style.display = 'none';
        }
    } catch (e) {
        btn.style.display = 'none';
    }
}

function renderForm() {
    let html = `<div id="mode-banner"></div>`;

    let topActionHtml = '';
    if (currentMode === 'view') {
        topActionHtml = `
            <div style="display: flex; justify-content: flex-end; margin-bottom: 20px;">
                <button type="button" class="btn btn-secondary" onclick="window.switchToEditMode()" style="padding: 10px 20px; font-size: 0.95rem;">
                    <i class="ph ph-pencil-simple"></i> 정보 수정하기
                </button>
            </div>
        `;
    } else if (currentMode === 'edit') {
        topActionHtml = `
            <div style="display: flex; justify-content: flex-end; gap: 10px; margin-bottom: 20px;">
                <button type="button" class="btn btn-primary" onclick="submitForm()" style="padding: 10px 20px; font-size: 0.95rem;">
                    <i class="ph ph-check-circle"></i> 수정 완료
                </button>
                <button type="button" class="btn btn-secondary" onclick="window.cancelEdit()" style="padding: 10px 20px; font-size: 0.95rem; background: #868e96; color: white; border: none;">
                    <i class="ph ph-x-circle"></i> 수정 취소
                </button>
            </div>
        `;
    }

    html += topActionHtml;
    formData.forEach((section, sIndex) => {
        html += `
            <div class="form-section glass-panel" style="animation-delay: ${sIndex * 0.1}s">
                <div class="section-title">
                    <i class="ph ${section.icon}"></i>
                    ${section.category}
                </div>
        `;

        section.items.forEach(item => {
            const isChecking = currentData[`${item.id}_checking`] === true;
            html += `<div class="form-group ${isChecking ? 'is-checking' : ''}" id="group_${item.id}">`;

            html += `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <label class="form-label" style="margin-bottom: 0;">${item.label}</label>
                    ${(currentMode === 'view' || currentMode === 'admin') ?
                    (isChecking ? `<span style="color: #ff9f43; font-weight: bold; font-size: 0.9rem; display: flex; align-items: center; gap: 4px;"><i class="ph ph-warning-circle"></i> 확인중</span>` : '')
                    : `
                    <label class="checking-toggle">
                        <input type="checkbox" class="tgl-checking" data-id="${item.id}" ${isChecking ? 'checked' : ''}>
                        <span>확인중</span>
                    </label>
                    `}
                </div>
            `;

            const val = currentData[item.id] || (item.type === 'checkbox' ? [] : '');

            if (item.type === 'text' || item.type === 'url') {
                html += `<input type="${item.type}" id="${item.id}" name="${item.id}" class="form-control" placeholder="${item.placeholder || ''}" value="${val}">`;
            } else if (item.type === 'file') {
                const hasExistingFile = (val && val !== '확인중');
                const existingFilename = hasExistingFile ? (val.split('/').pop() || '다운로드') : '';
                
                const btnLabel = hasExistingFile ? '파일 변경하기' : '파일 첨부하기';
                
                html += `
                <div class="custom-file-upload" style="display: flex; align-items: center; gap: 12px; margin-top: 4px;">
                    <div style="display: flex; align-items: center;">
                        <label for="${item.id}" class="btn-file-upload" style="margin-bottom: 0;">
                            <i class="ph ph-upload-simple"></i> <span class="btn-text">${btnLabel}</span>
                        </label>
                        <input type="file" id="${item.id}" name="${item.id}" class="file-input-hidden" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.png,.jpg,.zip" onchange="
                            const displayArea = document.getElementById('file_display_${item.id}');
                            const btnText = this.parentElement.querySelector('.btn-text');
                            if (this.files[0]) {
                                displayArea.innerHTML = '<a href=\\'javascript:void(0)\\' class=\\'file-download-link\\' style=\\'color: var(--primary); text-decoration: underline; display: inline-flex; align-items: center; gap: 4px; font-weight: 500;\\'><i class=\\'ph ph-download-simple\\'></i> ' + this.files[0].name + '</a>';
                                btnText.textContent = '파일 변경하기';
                            } else {
                                ${hasExistingFile ? `displayArea.innerHTML = '<a href=\\'${val}\\' target=\\'_blank\\' class=\\'file-download-link\\' style=\\'color: var(--primary); text-decoration: underline; display: inline-flex; align-items: center; gap: 4px; font-weight: 500;\\'><i class=\\'ph ph-download-simple\\'></i> ${existingFilename}</a>'; btnText.textContent = '파일 변경하기';` : `displayArea.innerHTML = '<span class=\\'file-empty-text\\' style=\\'color: #999; display: none; align-items: center; gap: 4px;\\'><i class=\\'ph ph-warning-circle\\'></i> 미입력 항목입니다.</span>'; btnText.textContent = '파일 첨부하기';`}
                            }
                        ">
                    </div>
                    
                    <div id="file_display_${item.id}" class="file-display-area" style="font-size: 0.95rem;">
                        ${hasExistingFile ? 
                            `<a href="${val}" target="_blank" class="file-download-link" style="color: var(--primary); text-decoration: underline; display: inline-flex; align-items: center; gap: 4px; font-weight: 500;">
                                <i class="ph ph-download-simple"></i> ${existingFilename}
                            </a>` 
                            : 
                            `<span class="file-empty-text" style="color: #999; display: none; align-items: center; gap: 4px;">
                                <i class="ph ph-warning-circle"></i> 미입력 항목입니다.
                            </span>`
                        }
                    </div>
                </div>`;
            } else if (item.type === 'textarea') {
                html += `<textarea id="${item.id}" name="${item.id}" class="form-control" placeholder="${item.placeholder || ''}">${val}</textarea>`;
            } else if (item.type === 'radio' || item.type === 'checkbox') {
                html += `<div class="options-grid">`;

                let isOtherSelected = false;
                let otherValue = '';
                let anyChecked = false;

                item.options.forEach((opt, oIndex) => {
                    const optId = `${item.id}_${oIndex}`;
                    let checked = false;

                    if (item.type === 'radio') {
                        if (val === opt || (item.allowDirectInput && opt === '기타' && val && !item.options.includes(val))) {
                            checked = true;
                            if (opt === '기타' && val !== '기타') {
                                isOtherSelected = true;
                                otherValue = val;
                            }
                        }
                    } else if (item.type === 'checkbox') {
                        if (Array.isArray(val)) {
                            if (val.includes(opt)) {
                                checked = true;
                            }
                            if (item.allowDirectInput && opt === '기타') {
                                // Find any value not in options
                                const others = val.filter(v => !item.options.includes(v));
                                if (others.length > 0 || val.includes('기타')) {
                                    checked = true;
                                    isOtherSelected = true;
                                    otherValue = others.join(', ');
                                }
                            }
                        }
                    }

                    if (checked) anyChecked = true;

                    html += `
                        <label class="option-card ${checked ? 'active' : ''}" for="${optId}">
                            <input type="${item.type}" name="${item.id}" id="${optId}" value="${opt}" ${checked ? 'checked' : ''} onchange="handleOptionChange('${item.id}', '${item.type}', this, ${item.allowDirectInput})">
                            <div class="option-indicator">${item.type === 'checkbox' ? '<i class="ph-bold ph-check"></i>' : ''}</div>
                            ${opt}
                        </label>
                    `;
                });

                if (!anyChecked) {
                    if (isChecking) {
                        html += `<div class="empty-indicator" style="color: #ff9f43; background: rgba(255,159,67,0.1); border-color: rgba(255,159,67,0.3);"><i class="ph ph-warning-circle"></i> 확인중 항목입니다</div>`;
                    } else {
                        html += `<div class="empty-indicator"><i class="ph ph-warning-circle"></i> 미입력 항목입니다</div>`;
                    }
                }

                html += `</div>`;

                if (item.allowDirectInput) {
                    html += `
                        <div class="direct-input-container ${isOtherSelected ? 'show' : ''}" id="direct_${item.id}">
                            <input type="text" class="form-control" id="input_${item.id}" placeholder="직접 입력해주세요" value="${otherValue}">
                        </div>
                    `;
                }
            }
            html += `</div>`;
        });
        html += `</div>`;
    });

    // Action buttons based on mode
    html += `<div class="form-actions">`;
    if (currentMode === 'create' || currentMode === 'edit') {
        html += `<div style="display: flex; gap: 10px; width: 100%; max-width: 800px;">`;
        /*
        actionHtml += `<button type="button" class="btn btn-secondary" onclick="window.fillDummyData()" style="flex: 1; background: #e0e0e0; color: #333; border: 1px solid #ccc; white-space: nowrap;">
                    <i class="ph ph-magic-wand"></i> 테스트용 (자동채우기)
                 </button>`;
        */
        html += `<button type="button" class="btn btn-primary" onclick="submitForm()" style="flex: 1;">
                    <i class="ph ph-check-circle"></i> 
                    ${currentMode === 'edit' ? '수정 완료' : '제출하기'}
                 </button>`;
        if (currentMode === 'edit') {
            html += `<button type="button" class="btn btn-secondary" onclick="window.cancelEdit()" style="flex: 1; background: #868e96; color: white; border: none;">
                        <i class="ph ph-x-circle"></i> 
                        수정 취소
                     </button>`;
        }
        html += `</div>`;
    } else if (currentMode === 'view') {
        html += `<div style="display: flex; width: 100%; max-width: 800px;">`;
        html += `<button type="button" class="btn btn-secondary" onclick="window.switchToEditMode()" style="flex: 1;">
                    <i class="ph ph-pencil-simple"></i> 정보 수정하기
                 </button>`;
        html += `</div>`;
    } else if (currentMode === 'admin') {
        html += `<div style="display: flex; gap: 10px; width: 100%; max-width: 800px;">`;
        html += `<button type="button" class="btn btn-secondary" onclick="window.deleteData()" style="flex: 1; background: #ff4757; color: white; border: none;">
                    <i class="ph ph-trash"></i> 데이터 삭제
                 </button>`;
        html += `<button type="button" class="btn btn-primary" onclick="window.showHtmlMailModal()" style="flex: 1; background: #20c997; border-color: #20c997;">
                    <i class="ph ph-envelope-simple"></i> 템플릿 복사
                 </button>`;
        html += `<button type="button" class="btn btn-primary" onclick="window.showAdminDashboard()" style="flex: 1; background: #3b82f6; border-color: #3b82f6;">
                    <i class="ph ph-list-dashes"></i> 전체 목록 조회
                 </button>`;
        html += `</div>`;
    }
    html += `</div>`;

    appContent.innerHTML = html;
    updateModeUI();
}

// Handle Custom UI for Radio/Checkbox
window.handleOptionChange = function (groupId, type, element, allowDirectInput) {
    if (currentMode === 'admin') return;

    const group = document.getElementById(`group_${groupId}`);
    const directInputContainer = document.getElementById(`direct_${groupId}`);

    if (type === 'radio') {
        // Remove active class from all in group
        const cards = group.querySelectorAll('.option-card');
        cards.forEach(c => c.classList.remove('active'));
        element.closest('.option-card').classList.add('active');

        if (allowDirectInput) {
            if (element.value === '기타') {
                directInputContainer.classList.add('show');
            } else {
                directInputContainer.classList.remove('show');
            }
        }
    } else if (type === 'checkbox') {
        if (element.checked) {
            element.closest('.option-card').classList.add('active');
        } else {
            element.closest('.option-card').classList.remove('active');
        }

        if (allowDirectInput && element.value === '기타') {
            if (element.checked) {
                directInputContainer.classList.add('show');
            } else {
                directInputContainer.classList.remove('show');
            }
        }
    }
};

// Gather form data and process it
window.submitForm = async function () {
    const data = {};
    const formDataObj = new FormData();
    let isValid = true;

    formData.forEach(section => {
        section.items.forEach(item => {
            const checkingToggle = document.querySelector(`.tgl-checking[data-id="${item.id}"]`);
            if (checkingToggle && checkingToggle.checked) {
                data[`${item.id}_checking`] = true;
                data[item.id] = "확인중";
                return;
            } else {
                data[`${item.id}_checking`] = false;
            }

            if (item.type === 'text' || item.type === 'url' || item.type === 'textarea') {
                data[item.id] = document.getElementById(item.id).value.trim();
            } else if (item.type === 'radio') {
                const checked = document.querySelector(`input[name="${item.id}"]:checked`);
                if (checked) {
                    if (checked.value === '기타' && item.allowDirectInput) {
                        const directVal = document.getElementById(`input_${item.id}`).value.trim();
                        data[item.id] = directVal || '기타';
                    } else {
                        data[item.id] = checked.value;
                    }
                } else {
                    data[item.id] = "";
                }
            } else if (item.type === 'checkbox') {
                const checked = document.querySelectorAll(`input[name="${item.id}"]:checked`);
                const values = Array.from(checked).map(cb => cb.value);

                if (values.includes('기타') && item.allowDirectInput) {
                    const directVal = document.getElementById(`input_${item.id}`).value.trim();
                    if (directVal) {
                        // Remove '기타' and add the custom value
                        const filtered = values.filter(v => v !== '기타');
                        filtered.push(directVal);
                        data[item.id] = filtered;
                    } else {
                        data[item.id] = values;
                    }
                } else {
                    data[item.id] = values;
                }
            } else if (item.type === 'file') {
                const fileInput = document.getElementById(item.id);
                if (fileInput && fileInput.files.length > 0) {
                    formDataObj.append(item.id, fileInput.files[0]);
                } else if (currentData && currentData[item.id]) {
                    // Keep existing file URL if no new file is uploaded
                    data[item.id] = currentData[item.id];
                }
            }
        });
    });

    currentData = data;
    if (isTestMode) {
        currentData._is_test = true;
    }

    // v2.0 다중 프로젝트 구조 준비: 데이터에 projectId 포함
    currentData.projectId = projectId;
    currentData.env = TARGET_ENV;

    // Append the JSON payload to formDataObj
    formDataObj.append('payload', JSON.stringify(currentData));

    // Save to API
    try {
        const res = await fetch(`${CONFIG.API_BASE_URL}/save.php`, {
            method: 'POST',
            headers: {
                'bypass-tunnel-reminder': 'true'
            },
            body: formDataObj
        });

        if (!res.ok) throw new Error('Server returned an error');

        updateLoadButton();

        // Show Success Modal
        const siteName = currentData.site_name || '프로젝트';
        document.getElementById('result-title').innerHTML = `<strong>${siteName}</strong> 제출 완료`;
        document.getElementById('result-desc').innerHTML = isTestMode ? "테스트 정보가 성공적으로 임시 저장되었습니다. (테스트)" : "입력하신 정보가 성공적으로 제출되었습니다.";
        document.getElementById('btn-view-text').textContent = `확인 (작성한 화면 보기)`;

        resultModal.classList.remove('hidden');

    } catch (e) {
        console.error('Save failed:', e);

        // 에러 알림창 띄우기
        if (typeof showAlert === 'function') {
            showAlert('서버 연결 실패', '서버와 통신할 수 없어 데이터가 브라우저에 임시 저장되었습니다.<br>나중에 다시 시도해 주세요.', 'error');
        } else {
            alert('서버 연결에 실패하여 데이터가 브라우저에 임시 저장되었습니다. 나중에 다시 시도해 주세요.');
        }
    }
};

window.deleteData = async function () {
    if (!confirm("정말 등록된 데이터를 모두 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.")) return;
    try {
        const res = await fetch(`${CONFIG.API_BASE_URL}/delete.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'bypass-tunnel-reminder': 'true'
            },
            body: JSON.stringify({ projectId: projectId, env: TARGET_ENV })
        });
        if (res.ok) {
            currentData = {};
            currentMode = 'create';
            renderForm();
            updateLoadButton();
            showAlert('삭제 완료', '데이터가 성공적으로 삭제되었습니다.', 'success');
        } else {
            showAlert('오류', '데이터 삭제에 실패했습니다.', 'error');
        }
    } catch (e) {
        showAlert('오류', '서버 통신 중 오류가 발생했습니다.', 'error');
    }
};

window.showHtmlMailModal = function () {
    let mailHtml = `<div style="font-family: sans-serif; max-width: 800px; margin: 0 auto; color: #333; line-height: 1.6;">\n`;
    mailHtml += `  <h2 style="color: #5f3dc4; border-bottom: 2px solid #5f3dc4; padding-bottom: 10px;">유컴패니온 프로젝트 구축 상세 질문지</h2>\n`;

    formData.forEach(section => {
        mailHtml += `  <h3 style="background: #f8f9fa; padding: 10px; border-radius: 4px; margin-top: 20px;">[${section.category}]</h3>\n`;
        mailHtml += `  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">\n`;
        section.items.forEach(item => {
            let val = currentData[item.id];
            let isChecking = currentData[`${item.id}_checking`] === true;
            let displayVal = "";

            if (Array.isArray(val)) {
                displayVal = val.join(', ');
            } else if (val) {
                displayVal = val;
            } else {
                if (isChecking) {
                    displayVal = "<span style='color: #ff9f43; font-weight: bold;'>확인중</span>";
                } else {
                    displayVal = "<span style='color: #999;'>미입력</span>";
                }
            }
            mailHtml += `    <tr>\n`;
            mailHtml += `      <th style="width: 30%; text-align: left; padding: 12px 10px; border-bottom: 1px solid #eee; background: #fafafa; font-weight: 600;">${item.label}</th>\n`;
            mailHtml += `      <td style="padding: 12px 10px; border-bottom: 1px solid #eee;">${displayVal}</td>\n`;
            mailHtml += `    </tr>\n`;
        });
        mailHtml += `  </table>\n`;
    });
    mailHtml += `</div>`;

    document.getElementById('html-source-area').value = mailHtml;
    document.getElementById('html-preview-area').innerHTML = mailHtml;

    // Default to preview tab
    document.getElementById('tab-preview').style.background = 'var(--primary)';
    document.getElementById('tab-preview').style.color = '#fff';
    document.getElementById('tab-source').style.background = 'transparent';
    document.getElementById('tab-source').style.color = 'var(--primary)';
    document.getElementById('html-preview-area').style.display = 'block';
    document.getElementById('html-source-area').style.display = 'none';
    document.getElementById('btn-copy-html').style.display = 'none';

    document.getElementById('html-mail-modal').classList.remove('hidden');
};

document.getElementById('btn-copy-html').addEventListener('click', () => {
    const textArea = document.getElementById('html-source-area');
    textArea.style.display = 'block'; // Make sure it's visible to copy, though execCommand works anyway
    textArea.select();
    document.execCommand('copy');
    showAlert('복사 완료', 'HTML 소스가 클립보드에 복사되었습니다.<br>메일 작성 시 HTML 모드에서 붙여넣기 해주세요.', 'success');
});

// Tab Switching Logic
document.getElementById('tab-preview')?.addEventListener('click', () => {
    document.getElementById('tab-preview').style.background = 'var(--primary)';
    document.getElementById('tab-preview').style.color = '#fff';
    document.getElementById('tab-source').style.background = 'transparent';
    document.getElementById('tab-source').style.color = 'var(--primary)';
    document.getElementById('html-preview-area').style.display = 'block';
    document.getElementById('html-source-area').style.display = 'none';
    document.getElementById('btn-copy-html').style.display = 'none';
});

document.getElementById('tab-source')?.addEventListener('click', () => {
    document.getElementById('tab-source').style.background = 'var(--primary)';
    document.getElementById('tab-source').style.color = '#fff';
    document.getElementById('tab-preview').style.background = 'transparent';
    document.getElementById('tab-preview').style.color = 'var(--primary)';
    document.getElementById('html-source-area').style.display = 'block';
    document.getElementById('html-preview-area').style.display = 'none';
    document.getElementById('btn-copy-html').style.display = 'block';
});

// Modal Actions
window.showAlert = function (title, desc, type = 'success') {
    document.getElementById('alert-title').textContent = title;
    document.getElementById('alert-desc').innerHTML = desc;

    const iconEl = document.getElementById('alert-icon');
    if (type === 'success') {
        iconEl.innerHTML = '<i class="ph-fill ph-check-circle"></i>';
        iconEl.style.color = 'var(--primary)';
    } else if (type === 'error') {
        iconEl.innerHTML = '<i class="ph-fill ph-warning-circle"></i>';
        iconEl.style.color = '#ff4757';
    } else if (type === 'info') {
        iconEl.innerHTML = '<i class="ph-fill ph-info"></i>';
        iconEl.style.color = '#0984e3';
    }

    const cancelBtn = document.getElementById('btn-alert-cancel');
    const okBtn = document.getElementById('btn-alert-ok');
    if (cancelBtn) cancelBtn.style.display = 'none';

    // Reset okBtn styling and text
    if (okBtn) {
        okBtn.textContent = '확인';
        okBtn.style.background = 'var(--primary)';
        okBtn.style.borderColor = 'var(--primary)';
    }

    // Unbind and rebind close listener to remove any confirm logic
    if (okBtn) {
        const newOkBtn = okBtn.cloneNode(true);
        okBtn.parentNode.replaceChild(newOkBtn, okBtn);
        newOkBtn.addEventListener('click', () => {
            document.getElementById('alert-modal').classList.add('hidden');
        });
    }

    document.getElementById('alert-modal').classList.remove('hidden');
};

window.showConfirm = function (title, desc, onConfirm, confirmText = '확인') {
    document.getElementById('alert-title').textContent = title;
    document.getElementById('alert-desc').innerHTML = desc;

    const iconEl = document.getElementById('alert-icon');
    iconEl.innerHTML = '<i class="ph-fill ph-warning-circle"></i>';
    iconEl.style.color = '#ff4757';

    const cancelBtn = document.getElementById('btn-alert-cancel');
    const okBtn = document.getElementById('btn-alert-ok');

    if (cancelBtn) {
        cancelBtn.style.display = 'block';
        okBtn.textContent = confirmText;
        okBtn.style.background = '#ff4757';
        okBtn.style.borderColor = '#ff4757';

        const newOkBtn = okBtn.cloneNode(true);
        const newCancelBtn = cancelBtn.cloneNode(true);
        okBtn.parentNode.replaceChild(newOkBtn, okBtn);
        cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);

        newCancelBtn.addEventListener('click', () => {
            document.getElementById('alert-modal').classList.add('hidden');
        });

        newOkBtn.addEventListener('click', () => {
            document.getElementById('alert-modal').classList.add('hidden');
            if (onConfirm) onConfirm();
        });
    }

    document.getElementById('alert-modal').classList.remove('hidden');
};

document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.target.closest('.modal-overlay').classList.add('hidden');
    });
});

document.addEventListener('change', (e) => {
    if (e.target.classList.contains('tgl-checking')) {
        const id = e.target.dataset.id;
        const group = document.getElementById(`group_${id}`);
        if (group) {
            if (e.target.checked) {
                group.classList.add('is-checking');
            } else {
                group.classList.remove('is-checking');
            }
        }
    }
});

document.getElementById('btn-view').addEventListener('click', () => {
    resultModal.classList.add('hidden');
    currentMode = 'view';
    renderForm();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('btn-confirm-cancel')?.addEventListener('click', () => {
    document.getElementById('confirm-modal').classList.add('hidden');
});

document.getElementById('btn-confirm-ok')?.addEventListener('click', () => {
    window.location.href = window.location.pathname;
});

document.getElementById('btn-load-data').addEventListener('click', async () => {
    try {
        const res = await fetch(`${CONFIG.API_BASE_URL}/load.php?projectId=${projectId}&env=${TARGET_ENV}`, {
            headers: {
                'bypass-tunnel-reminder': 'true'
            }
        });
        if (res.ok) {
            currentData = await res.json();
            if (currentMode !== 'admin') {
                currentMode = 'view';
            }
            renderForm();
            showAlert('불러오기 완료', '저장된 홈페이지 데이터를 성공적으로 불러왔습니다.', 'success');
        } else {
            showAlert('안내', '등록된(저장된) 홈페이지 정보가 없습니다.', 'info');
        }
    } catch (e) {
        showAlert('오류 발생', '데이터를 불러오는 중 오류가 발생했습니다.', 'error');
    }
});

window.switchToEditMode = function () {
    currentMode = 'edit';
    renderForm();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.cancelEdit = function () {
    // 저장되지 않은 변경사항은 무시하고 다시 보기 모드로 렌더링
    currentMode = 'view';
    renderForm();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};


// Admin Login Logic
function setupAdminTrigger() {
    const trigger = document.getElementById('admin-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
        adminClickCount++;

        clearTimeout(adminClickTimer);
        adminClickTimer = setTimeout(() => {
            if (adminClickCount === 1) {
                if (currentMode === 'create' || currentMode === 'edit') {
                    const confirmModal = document.getElementById('confirm-modal');
                    if (confirmModal) confirmModal.classList.remove('hidden');
                } else {
                    window.location.href = window.location.pathname;
                }
            }
            adminClickCount = 0;
        }, 500);

        if (adminClickCount >= 5) {
            clearTimeout(adminClickTimer);
            adminClickCount = 0;
            window.location.href = 'admin.html';
        }
    });
}

function updateModeUI() {
    const banner = document.getElementById('mode-banner');
    if (banner) banner.style.display = 'none';
    appContent.classList.remove('read-only-view');

    const badge = document.querySelector('.admin-badge');
    if (badge) badge.remove();
    document.querySelector('.app-container').style.overflow = 'visible';

    // Only set read-only class if in view mode
    if (currentMode === 'view') {
        appContent.classList.add('read-only-view');
    }
}

window.fillDummyData = function () {
    const data = {};
    formData.forEach(section => {
        section.items.forEach(item => {
            // Uncheck "확인중" for test data
            data[`${item.id}_checking`] = false;

            if (item.type === 'text' || item.type === 'url' || item.type === 'textarea') {
                data[item.id] = `테스트 ${item.label} 데이터`;
            } else if (item.type === 'radio') {
                const opts = item.options.filter(o => o !== '기타');
                data[item.id] = opts[Math.floor(Math.random() * opts.length)];
            } else if (item.type === 'checkbox') {
                const opts = item.options.filter(o => o !== '기타');
                let selected = [];
                selected.push(opts[Math.floor(Math.random() * opts.length)]);
                if (opts.length > 1 && Math.random() > 0.5) {
                    let second = opts[Math.floor(Math.random() * opts.length)];
                    if (selected[0] !== second) selected.push(second);
                }
                data[item.id] = selected;
            }
        });
    });

    data['site_name'] = "유컴패니온 자동입력 테스트";
    currentData = data;
    renderForm();

    // Add ?test=true to URL without reloading to ensure test mode acts
    const url = new URL(window.location);
    url.searchParams.set('test', 'true');
    window.history.pushState({}, '', url);
    isTestMode = true;
};

// admin dashboard logic moved to script_admin.js
