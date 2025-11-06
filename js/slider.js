// ==========================================
// 슬라이더 기능 (탭 이미지 + 스크린샷)
// ==========================================

document.addEventListener('DOMContentLoaded', function() {

    const tabSliders = document.querySelectorAll('.tab-slider');

    tabSliders.forEach(slider => {
        const track = slider.querySelector('.slider-track');
        const prevBtn = slider.querySelector('.slider-prev');
        const nextBtn = slider.querySelector('.slider-next');
        const items = track.querySelectorAll('.slider-item');

        if (!track || items.length === 0) return;

        let currentIndex = 0;

        // 첫 번째 이미지 활성화
        items[0].classList.add('active');

        // 이미지 1개면 버튼 숨기기
        if (items.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }

        // 이전 버튼
        prevBtn.addEventListener('click', () => {
            items[currentIndex].classList.remove('active');
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            items[currentIndex].classList.add('active');
        });

        // 다음 버튼
        nextBtn.addEventListener('click', () => {
            items[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % items.length;
            items[currentIndex].classList.add('active');
        });

        // 이미지 클릭 시 라이트박스
        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                openLightbox(item.src, Array.from(items).map(img => img.src), index);
            });
        });
    });

    // ==========================================
    // 2. 스크린샷 페이지네이션
    // ==========================================
    const screenshotPages = document.querySelectorAll('.screenshot-page');
    const screenshotPrev = document.querySelector('.screenshot-prev');
    const screenshotNext = document.querySelector('.screenshot-next');
    const dots = document.querySelectorAll('.screenshot-dots .dot');

    let currentPage = 0;

    function showPage(pageIndex) {
        // 범위 체크
        if (pageIndex < 0) pageIndex = screenshotPages.length - 1;
        if (pageIndex >= screenshotPages.length) pageIndex = 0;

        currentPage = pageIndex;

        // 모든 페이지 숨기기
        screenshotPages.forEach(page => page.classList.remove('active'));

        // 현재 페이지만 표시
        screenshotPages[currentPage].classList.add('active');

        // 점 업데이트
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[currentPage]) {
            dots[currentPage].classList.add('active');
        }
    }

    // 이전 버튼
    if (screenshotPrev) {
        screenshotPrev.addEventListener('click', () => {
            showPage(currentPage - 1);
        });
    }

    // 다음 버튼
    if (screenshotNext) {
        screenshotNext.addEventListener('click', () => {
            showPage(currentPage + 1);
        });
    }

    // 점 클릭
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showPage(index);
        });
    });

    // 스크린샷 이미지 클릭 시 라이트박스
    screenshotPages.forEach(page => {
        const images = page.querySelectorAll('img');
        images.forEach((img, index) => {
            img.addEventListener('click', () => {
                // 모든 스크린샷 이미지 수집
                const allScreenshots = [];
                screenshotPages.forEach(p => {
                    p.querySelectorAll('img').forEach(i => allScreenshots.push(i.src));
                });
                const globalIndex = currentPage * 3 + index;
                openLightbox(img.src, allScreenshots, globalIndex);
            });
        });
    });

    // ==========================================
    // 3. 라이트박스 함수
    // ==========================================
    let currentLightboxIndex = 0;
    let lightboxImages = [];

    function openLightbox(src, images, index) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');

        if (!lightbox || !lightboxImg) return;

        lightboxImages = images;
        currentLightboxIndex = index;

        lightbox.classList.add('active');
        lightboxImg.src = src;
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    function showLightboxImage(index) {
        if (index < 0) index = lightboxImages.length - 1;
        if (index >= lightboxImages.length) index = 0;

        currentLightboxIndex = index;
        const lightboxImg = document.getElementById('lightbox-img');
        if (lightboxImg) {
            lightboxImg.src = lightboxImages[currentLightboxIndex];
        }
    }

    // 라이트박스 닫기 버튼
    const lightboxClose = document.querySelector('.lightbox-close');
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // 라이트박스 배경 클릭
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // 라이트박스 이전/다음 버튼
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            showLightboxImage(currentLightboxIndex - 1);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            showLightboxImage(currentLightboxIndex + 1);
        });
    }

    // 키보드 네비게이션
    document.addEventListener('keydown', (e) => {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox || !lightbox.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showLightboxImage(currentLightboxIndex - 1);
                break;
            case 'ArrowRight':
                showLightboxImage(currentLightboxIndex + 1);
                break;
        }
    });

    // 터치 스와이프 (모바일)
    let touchStartX = 0;
    let touchEndX = 0;

    const lightboxImg = document.getElementById('lightbox-img');
    if (lightboxImg) {
        lightboxImg.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        lightboxImg.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        const swipeThreshold = 50;

        if (touchEndX < touchStartX - swipeThreshold) {
            // 왼쪽 스와이프 → 다음
            showLightboxImage(currentLightboxIndex + 1);
        }

        if (touchEndX > touchStartX + swipeThreshold) {
            // 오른쪽 스와이프 → 이전
            showLightboxImage(currentLightboxIndex - 1);
        }
    }

    console.log('✅ Slider.js loaded successfully');
});