document.addEventListener('DOMContentLoaded', function() {
    const bgm = document.getElementById('bgm');
    const toggleBtn = document.getElementById('music-toggle');
    const icon = toggleBtn.querySelector('.music-icon');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeText = document.querySelector('.volume-text');
    const scrollTopBtn = document.getElementById('scroll-top');
    const scrollBottomBtn = document.getElementById('scroll-bottom');
    
    let isPlaying = false;
    
    // 초기 볼륨 설정
    bgm.volume = 0.5;
    
    // 음악 재생/정지
    toggleBtn.addEventListener('click', function() {
        if (isPlaying) {
            bgm.pause();
            icon.textContent = '🔇';
            isPlaying = false;
        } else {
            bgm.play();
            icon.textContent = '🔊';
            isPlaying = true;
        }
    });
    
    // 볼륨 조절
    volumeSlider.addEventListener('input', function() {
        const volume = this.value / 100;
        bgm.volume = volume;
        volumeText.textContent = this.value + '%';
    });
    
    // 맨 위로 스크롤
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 맨 아래로 스크롤
    scrollBottomBtn.addEventListener('click', function() {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    });
});