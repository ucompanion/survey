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
            { id: "purpose", label: "홈페이지 목적", type: "radio", options: ["기업홍보", "쇼핑몰", "예약", "커뮤니티", "서비스", "랜딩페이지", "기타"], allowDirectInput: true }
        ]
    },
    {
        category: "도메인",
        icon: "ph-globe",
        items: [
            { id: "domain_owner", label: "도메인 소유자", type: "radio", options: ["회사", "대표자", "개인", "개발사", "대행사", "모름"] },
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
    }
];

// Global State
let currentData = {};
let currentMode = 'create'; // 'create', 'edit', 'admin'
let adminClickCount = 0;
let adminClickTimer = null;

// DOM Elements
const appContent = document.getElementById('app-content');
const resultModal = document.getElementById('result-modal');
const adminLoginModal = document.getElementById('admin-login-modal');
const jsonResultOutput = document.getElementById('json-result-output');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderForm();
    setupAdminTrigger();
});

function renderForm() {
    let html = `<div id="mode-banner"></div>`;
    
    formData.forEach((section, sIndex) => {
        html += `
            <div class="form-section" style="animation-delay: ${sIndex * 0.1}s">
                <div class="section-title">
                    <i class="ph ${section.icon}"></i>
                    ${section.category}
                </div>
        `;

        section.items.forEach(item => {
            html += `<div class="form-group" id="group_${item.id}">`;
            html += `<label class="form-label">${item.label}</label>`;

            const val = currentData[item.id] || (item.type === 'checkbox' ? [] : '');

            if (item.type === 'text' || item.type === 'url') {
                html += `<input type="${item.type}" id="${item.id}" name="${item.id}" class="form-control" placeholder="${item.placeholder || ''}" value="${val}">`;
            } else if (item.type === 'textarea') {
                html += `<textarea id="${item.id}" name="${item.id}" class="form-control" placeholder="${item.placeholder || ''}">${val}</textarea>`;
            } else if (item.type === 'radio' || item.type === 'checkbox') {
                html += `<div class="options-grid">`;
                
                let isOtherSelected = false;
                let otherValue = '';

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

                    html += `
                        <label class="option-card ${checked ? 'active' : ''}" for="${optId}">
                            <input type="${item.type}" name="${item.id}" id="${optId}" value="${opt}" ${checked ? 'checked' : ''} onchange="handleOptionChange('${item.id}', '${item.type}', this, ${item.allowDirectInput})">
                            <div class="option-indicator"></div>
                            ${opt}
                        </label>
                    `;
                });
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
        html += `<button type="button" class="btn btn-primary" onclick="submitForm()">
                    <i class="ph ph-check-circle"></i> 
                    ${currentMode === 'edit' ? '수정 완료' : '제출하기'}
                 </button>`;
    }
    html += `</div>`;

    appContent.innerHTML = html;
    updateModeUI();
}

// Handle Custom UI for Radio/Checkbox
window.handleOptionChange = function(groupId, type, element, allowDirectInput) {
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
window.submitForm = function() {
    const data = {};
    let isValid = true;

    formData.forEach(section => {
        section.items.forEach(item => {
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
            }
        });
    });

    currentData = data;
    
    // Show Modal
    jsonResultOutput.textContent = JSON.stringify(currentData, null, 2);
    resultModal.classList.remove('hidden');
};

// Modal Actions
document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.target.closest('.modal-overlay').classList.add('hidden');
    });
});

document.getElementById('btn-edit').addEventListener('click', () => {
    resultModal.classList.add('hidden');
    currentMode = 'edit';
    renderForm();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('btn-download').addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "ucompanion_project_survey.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
});

// Admin Login Logic
function setupAdminTrigger() {
    const trigger = document.getElementById('admin-trigger');
    trigger.addEventListener('click', () => {
        adminClickCount++;
        
        clearTimeout(adminClickTimer);
        adminClickTimer = setTimeout(() => {
            adminClickCount = 0;
        }, 3000);

        if (adminClickCount >= 5) {
            adminClickCount = 0;
            adminLoginModal.classList.remove('hidden');
            document.getElementById('admin-password').value = '';
            document.getElementById('admin-password').focus();
        }
    });

    document.getElementById('btn-admin-login').addEventListener('click', () => {
        const pw = document.getElementById('admin-password').value;
        if (pw === 'admin') {
            adminLoginModal.classList.add('hidden');
            currentMode = 'admin';
            renderForm();
            
            // Generate dummy data if empty for demo purposes
            if (Object.keys(currentData).length === 0) {
                currentData = {
                    "site_name": "유컴패니온 샘플 데이터",
                    "site_url": "https://sample.ucomp.co.kr",
                    "benchmarking": "애플 공홈",
                    "purpose": "기업홍보",
                    "domain_owner": "회사",
                    "server_type": "클라우드",
                    "cloud_type": "AWS",
                    "language": ["Node.js", "Python"],
                    "frontend": ["React", "Next.js"],
                    "db_type": ["PostgreSQL"]
                };
                renderForm(); // Re-render with dummy data
            }
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            alert('비밀번호가 일치하지 않습니다.');
        }
    });
}

function updateModeUI() {
    const banner = document.getElementById('mode-banner');
    if (currentMode === 'admin') {
        appContent.classList.add('read-only-view');
        banner.style.display = 'block';
        banner.style.background = '#ff4757';
        banner.innerHTML = '<i class="ph ph-lock-key"></i> 관리자 보기 모드 (읽기 전용)';
        
        // Add admin badge to main app
        if (!document.querySelector('.admin-badge')) {
            const badge = document.createElement('div');
            badge.className = 'admin-badge';
            badge.textContent = 'ADMIN';
            document.querySelector('.app-container').style.position = 'relative';
            document.querySelector('.app-container').style.overflow = 'hidden';
            document.querySelector('.app-container').appendChild(badge);
        }
    } else if (currentMode === 'edit') {
        appContent.classList.remove('read-only-view');
        banner.style.display = 'block';
        banner.style.background = '#ff9f43';
        banner.innerHTML = '<i class="ph ph-pencil"></i> 수정 모드';
        
        const badge = document.querySelector('.admin-badge');
        if (badge) badge.remove();
        document.querySelector('.app-container').style.overflow = 'visible';
    } else {
        appContent.classList.remove('read-only-view');
        banner.style.display = 'none';
        
        const badge = document.querySelector('.admin-badge');
        if (badge) badge.remove();
        document.querySelector('.app-container').style.overflow = 'visible';
    }
}
