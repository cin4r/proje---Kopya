// script.js

document.addEventListener('DOMContentLoaded', () => {
            
    // --- 1. Mobil Menü İşlemleri ---
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
        
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('hidden');
            });
        });
    }

    // --- 2. Carousel (Yatay Kaydırma) İşlemleri ---
    const container = document.getElementById('carousel-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.carousel-dot');
    const items = document.querySelectorAll('.carousel-item');

    if (!container) return;

    let isScrolling = false;

    // Hangi kartın ekranın ortasında olduğunu hesaplar
    const getActiveIndex = () => {
        let activeIndex = 0;
        let minDistance = Infinity;
        const containerCenter = container.scrollLeft + (container.clientWidth / 2);

        items.forEach((item, index) => {
            const itemCenter = item.offsetLeft + (item.clientWidth / 2);
            const distance = Math.abs(containerCenter - itemCenter);
            if (distance < minDistance) {
                minDistance = distance;
                activeIndex = index;
            }
        });
        return activeIndex;
    };

    // Noktaları (dots) günceller
    const updateDots = () => {
        const activeIndex = getActiveIndex();
        dots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('dot-active');
            } else {
                dot.classList.remove('dot-active');
            }
        });
    };

    // İleri ok butonu
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const currentIndex = getActiveIndex();
            if (currentIndex < items.length - 1) {
                items[currentIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        });
    }

    // Geri ok butonu
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const currentIndex = getActiveIndex();
            if (currentIndex > 0) {
                items[currentIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        });
    }

    // Noktalara tıklama
    dots.forEach((dot) => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            if (items[index]) {
                items[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        });
    });

    // Kullanıcı kaydırdığında noktaları senkronize et
    container.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                updateDots();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
});