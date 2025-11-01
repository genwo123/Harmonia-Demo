// ==========================================
// 라이트박스 (이미지 팝업) 기능
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // 라이트박스 요소들
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    // 갤러리 이미지들
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // 현재 이미지 인덱스
    let currentIndex = 0;

    // ==========================================
    // 라이트박스 열기
    // ==========================================
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentIndex = parseInt(this.getAttribute('data-index'));
            openLightbox(this.src);
        });
    });

    function openLightbox(src) {
        lightbox.classList.add('active');
        lightboxImg.src = src;
        document.body.style.overflow = 'hidden'; // 스크롤 방지
    }

    // ==========================================
    // 라이트박스 닫기
    // ==========================================
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // 스크롤 복원
    }

    // X 버튼 클릭
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    // 배경 클릭 (이미지 외부)
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // ==========================================
    // 이전/다음 이미지
    // ==========================================
    function showPrevImage() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        lightboxImg.src = galleryItems[currentIndex].src;
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        lightboxImg.src = galleryItems[currentIndex].src;
    }

    // 이전 버튼
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            showPrevImage();
        });
    }

    // 다음 버튼
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            showNextImage();
        });
    }

    // ==========================================
    // 키보드 네비게이션
    // ==========================================
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });

    // ==========================================
    // 터치 스와이프 (모바일)
    // ==========================================
    let touchStartX = 0;
    let touchEndX = 0;

    lightboxImg.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    lightboxImg.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50; // 최소 스와이프 거리
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // 왼쪽으로 스와이프 → 다음 이미지
            showNextImage();
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // 오른쪽으로 스와이프 → 이전 이미지
            showPrevImage();
        }
    }

    // ==========================================
    // 이미지 로딩 애니메이션
    // ==========================================
    lightboxImg.addEventListener('load', function() {
        this.style.opacity = '0';
        setTimeout(() => {
            this.style.transition = 'opacity 0.3s ease';
            this.style.opacity = '1';
        }, 50);
    });

    console.log('✅ Lightbox.js loaded successfully');
});
