// ==========================================
// 탭 전환 기능
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // 모든 탭 버튼 가져오기
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // 각 탭 버튼에 클릭 이벤트 추가
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 클릭된 탭의 data-tab 속성 가져오기
            const targetTab = this.getAttribute('data-tab');

            // 모든 탭 버튼에서 active 클래스 제거
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            // 클릭된 탭 버튼에 active 클래스 추가
            this.classList.add('active');

            // 모든 탭 컨텐츠 숨기기
            tabContents.forEach(content => {
                content.classList.remove('active');
            });

            // 해당 탭 컨텐츠만 표시
            const targetContent = document.getElementById('tab-' + targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            // 부드러운 스크롤
            const tabSection = document.querySelector('.tabs-section');
            if (tabSection) {
                tabSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }
        });
    });

    // 초기 로드 시 첫 번째 탭 활성화 (이미 HTML에 active 있으면 생략 가능)
    if (tabButtons.length > 0 && tabContents.length > 0) {
        // 이미 active가 있는지 확인
        const hasActive = Array.from(tabButtons).some(btn => btn.classList.contains('active'));
        
        if (!hasActive) {
            // active가 없으면 첫 번째 탭 활성화
            tabButtons[0].classList.add('active');
            tabContents[0].classList.add('active');
        }
    }

    // 키보드 네비게이션 (선택사항)
    document.addEventListener('keydown', function(e) {
        const activeButton = document.querySelector('.tab-btn.active');
        if (!activeButton) return;

        const buttons = Array.from(tabButtons);
        const currentIndex = buttons.indexOf(activeButton);

        // 왼쪽 화살표 키
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            buttons[currentIndex - 1].click();
        }
        // 오른쪽 화살표 키
        else if (e.key === 'ArrowRight' && currentIndex < buttons.length - 1) {
            buttons[currentIndex + 1].click();
        }
    });

    console.log('✅ Tabs.js loaded successfully');
});