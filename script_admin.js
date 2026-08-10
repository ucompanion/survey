// Admin logic specific to admin.html

let serverProjects = [];
let showEnvToggle = false;
let envToggleClickCount = 0;
let envToggleTimer = null;

document.addEventListener('DOMContentLoaded', () => {
    const adminLoginContainer = document.getElementById('admin-login-container');
    const appContent = document.getElementById('app-content');
    const adminPasswordInput = document.getElementById('admin-password');
    const btnAdminLogin = document.getElementById('btn-admin-login');

    if (!adminLoginContainer || !appContent || !btnAdminLogin) return;

    adminPasswordInput.focus();

    // Login event
    const attemptLogin = async () => {
        const pw = adminPasswordInput.value;
        if (pw === 'admin') {
            adminLoginContainer.style.display = 'none';
            appContent.style.display = 'block';
            
            // Set initial admin environment view based on current site env
            window.adminViewEnv = CONFIG.ENV;
            
            await fetchProjectsList();
            
            currentMode = 'admin_list';
            renderAdminDashboard();
        } else {
            showAlert('오류', '비밀번호가 일치하지 않습니다.', 'error');
        }
    };

    btnAdminLogin.addEventListener('click', attemptLogin);

    // Enter key to login
    adminPasswordInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            attemptLogin();
        }
    });

    // 5-click logo to show env toggle
    const adminLogo = document.getElementById('admin-logo');
    if (adminLogo) {
        adminLogo.addEventListener('click', (e) => {
            envToggleClickCount++;
            
            if (envToggleTimer) {
                clearTimeout(envToggleTimer);
            }
            
            envToggleTimer = setTimeout(() => {
                // If clicked less than 5 times and not trying to toggle, you could redirect to index.html
                // But for now, we just reset the count.
                if (envToggleClickCount < 5) {
                    window.location.href = 'index.html';
                }
                envToggleClickCount = 0;
            }, 500);
            
            if (envToggleClickCount >= 5) {
                e.preventDefault();
                envToggleClickCount = 0;
                clearTimeout(envToggleTimer);
                
                showEnvToggle = !showEnvToggle;
                if (currentMode === 'admin_list') {
                    renderAdminDashboard();
                }
                showAlert('알림', showEnvToggle ? '환경 토글 버튼이 활성화되었습니다.' : '환경 토글 버튼이 비활성화되었습니다.', 'info');
            }
        });
    }
});

async function fetchProjectsList() {
    try {
        const res = await fetch(`${CONFIG.API_BASE_URL}/api/list?env=${window.adminViewEnv}`, {
            headers: { 'bypass-tunnel-reminder': 'true' }
        });
        if (res.ok) {
            const result = await res.json();
            if (result.success) {
                serverProjects = result.data || [];
            }
        }
    } catch (e) {
        console.warn('Could not load project list from API', e);
    }
}

window.renderAdminDashboard = function() {
    let html = `
        <div class="form-section glass-panel" style="animation: slideUp 0.5s ease forwards;">
            <div class="section-title" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                <div style="font-size: 1.5rem;"><i class="ph ph-list-dashes"></i> 프로젝트 대시보드</div>
                <div class="env-toggle" style="display: ${showEnvToggle ? 'flex' : 'none'}; gap: 10px;">
                    <button class="btn ${window.adminViewEnv === 'prod' ? 'btn-primary' : 'btn-secondary'}" onclick="switchAdminEnv('prod')" style="padding: 6px 14px; font-size: 0.85rem;">운영 (Prod) DB</button>
                    <button class="btn ${window.adminViewEnv === 'staging' ? 'btn-primary' : 'btn-secondary'}" onclick="switchAdminEnv('staging')" style="padding: 6px 14px; font-size: 0.85rem;">검증 (Staging) DB</button>
                </div>
            </div>
            <p style="color: var(--text-muted); margin-bottom: 30px; font-size: 0.95rem;">
                현재 <strong>${window.adminViewEnv === 'prod' ? '운영 (Prod)' : '검증 (Staging)'}</strong> 환경에 저장된 모든 프로젝트 목록입니다.
            </p>
            <div style="display:flex; flex-direction:column; gap: 15px;">
    `;
    
    // 1. 서버에 저장된 프로젝트 리스트 렌더링
    if (serverProjects.length > 0) {
        html += `<h4 style="margin-bottom: 10px; color: var(--primary); font-size: 1rem;"><i class="ph ph-hard-drives"></i> 프로젝트 목록</h4>`;
        
        serverProjects.forEach(proj => {
            const dateStr = new Date(proj.updatedAt).toLocaleString();
            html += `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px; background: rgba(95, 61, 196, 0.05); border-radius: 12px; border: 1px solid rgba(95, 61, 196, 0.2);">
                    <div>
                        <div style="font-weight: 700; font-size: 1.15rem; margin-bottom: 8px; color: #2d3436;">${proj.site_name}</div>
                        <div style="font-size: 0.85rem; color: #636e72; display: flex; gap: 15px; flex-wrap: wrap;">
                            <span>프로젝트 ID: <strong style="color:var(--primary);">${proj.projectId}</strong></span>
                            <span>수정일시: <strong>${dateStr}</strong></span>
                        </div>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; min-width: 180px;">
                        <button class="btn btn-primary" onclick="copyHtmlFromServer('${proj.projectId}')" style="background: #20c997; border-color: #20c997; padding: 8px; font-size: 0.85rem; width: 100%; display: flex; justify-content: center; align-items: center; gap: 4px; box-sizing: border-box; height: 38px;" title="작성된 결과 화면이나 HTML 소스를 복사하여 메일에 첨부할 수 있습니다."><i class="ph ph-envelope-simple"></i> 메일</button>
                        <button class="btn btn-primary" onclick="copyLink('${proj.projectId}')" style="background: #0984e3; border-color: #0984e3; padding: 8px; font-size: 0.85rem; width: 100%; display: flex; justify-content: center; align-items: center; gap: 4px; box-sizing: border-box; height: 38px;" title="이 프로젝트 환경으로 바로 접속 가능한 다이렉트 링크를 복사합니다."><i class="ph ph-link"></i> 링크</button>
                        <button class="btn btn-secondary" onclick="deleteServerData('${proj.projectId}')" style="background: #ff4757; color: white; border: none; padding: 8px; font-size: 0.85rem; width: 100%; display: flex; justify-content: center; align-items: center; gap: 4px; box-sizing: border-box; height: 38px;" title="서버에 저장된 이 프로젝트의 모든 데이터를 영구적으로 삭제합니다."><i class="ph ph-trash"></i> 삭제</button>
                        <a href="index.html?pid=${proj.projectId}" class="btn btn-primary" style="padding: 8px; font-size: 0.85rem; text-decoration: none; display: flex; justify-content: center; align-items: center; gap: 4px; width: 100%; box-sizing: border-box; height: 38px;" title="이 프로젝트의 입력/수정/보기 화면으로 이동합니다."><i class="ph ph-arrow-square-out"></i> 보기</a>
                    </div>
                </div>
            `;
        });
    }
    
    if (serverProjects.length === 0) {
        html += `<div style="text-align: center; padding: 50px; color: #888; background: rgba(255,255,255,0.5); border-radius: 12px; border: 1px dashed #ccc;">저장된 프로젝트가 없습니다.</div>`;
    }
    
    html += `
            </div>
            <div class="form-actions" style="margin-top: 40px; text-align: center;">
                <button class="btn btn-secondary" onclick="window.location.href='index.html'" style="padding: 12px 30px; font-size: 1rem;"><i class="ph ph-house"></i> 메인 화면으로 돌아가기</button>
            </div>
        </div>
    `;
    
    appContent.innerHTML = html;
};

window.switchAdminEnv = async function(targetEnv) {
    window.adminViewEnv = targetEnv;
    await fetchProjectsList();
    renderAdminDashboard();
};

// 서버에 저장된 데이터를 복사하기 위한 함수
window.copyHtmlFromServer = async function(pid) {
    try {
        const res = await fetch(`${CONFIG.API_BASE_URL}/api/load?projectId=${pid}&env=${window.adminViewEnv}`, {
            headers: { 'bypass-tunnel-reminder': 'true' }
        });
        if (res.ok) {
            currentData = await res.json();
            window.showHtmlMailModal();
        } else {
            showAlert('오류', '서버에서 데이터를 불러오지 못했습니다.', 'error');
        }
    } catch(e) {
        showAlert('오류', '통신 중 오류가 발생했습니다.', 'error');
    }
};

window.copyLink = function(pid) {
    const baseUrl = window.location.origin + window.location.pathname.replace('admin.html', 'index.html');
    const link = `${baseUrl}?pid=${pid}&env=${window.adminViewEnv}`;
    navigator.clipboard.writeText(link).then(() => {
        showAlert('복사 완료', '해당 프로젝트의 전용 접속 링크가 복사되었습니다.<br><br><span style="font-size:0.85rem;word-break:break-all;color:#636e72;">' + link + '</span>', 'success');
    }).catch(() => {
        showAlert('오류', '링크 복사에 실패했습니다.', 'error');
    });
};

// 서버 데이터 삭제
window.deleteServerData = function(pid) {
    showConfirm(
        '프로젝트 삭제', 
        '서버에 저장된 이 프로젝트를 완전히 삭제하시겠습니까?<br>이 작업은 되돌릴 수 없습니다.', 
        async () => {
            try {
                const res = await fetch(`${CONFIG.API_BASE_URL}/api/delete`, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'bypass-tunnel-reminder': 'true'
                    },
                    body: JSON.stringify({ projectId: pid, env: window.adminViewEnv })
                });
                
                if (res.ok) {
                    // 성공시 목록 재조회 및 렌더링
                    await fetchProjectsList();
                    renderAdminDashboard();
                    showAlert('삭제 완료', '서버 데이터가 성공적으로 삭제되었습니다.', 'success');
                } else {
                    showAlert('오류', '서버 데이터 삭제에 실패했습니다.', 'error');
                }
            } catch(e) {
                showAlert('오류', '통신 중 오류가 발생했습니다.', 'error');
            }
        }, 
        '삭제'
    );
};
