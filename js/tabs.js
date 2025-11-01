// ==========================================
// 탭 전환 기능
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // 탭 버튼 클릭 이벤트
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // 모든 탭 버튼 비활성화
            tabButtons.forEach(btn => btn.classList.remove('active'));

            // 클릭된 탭 활성화
            this.classList.add('active');

            // 모든 탭 컨텐츠 숨기기
            tabContents.forEach(content => content.classList.remove('active'));

            // 해당 탭 컨텐츠만 표시
            const targetContent = document.getElementById('tab-' + targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    console.log('✅ Tabs.js loaded successfully');
});