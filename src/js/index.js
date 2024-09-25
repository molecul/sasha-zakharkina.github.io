const initGallery = () => {
  const gallerySelector = document.getElementById('gallery')

  const addImages = () => {
    for (let imageCounter = 1; imageCounter <= 46; imageCounter++) {
      const div = document.createElement('div')
      div.className = 'grid-item'

      const image = document.createElement('img')
      image.src = `./assets/img/mobile/${imageCounter}.png`
      image.loading = 'lazy'

      div.appendChild(image)

      gallerySelector.appendChild(div)
    }
  }

  const initModals = () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const closeBtn = document.getElementById('closeBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorsContainer = document.getElementById('indicators');
    const images = document.querySelectorAll('.gallery img');
    let currentIndex = 0;

    // Свайп поддержка
    let touchStartX = 0;
    let touchEndX = 0;

    // Функция для отображения изображения
    function showImage(index) {
      lightboxImage.classList.remove('visible'); // Убираем видимость для анимации
      setTimeout(() => {
        lightboxImage.src = images[index].src.replace('mobile', 'desktop');
        lightboxImage.classList.add('visible'); // Добавляем видимость после смены изображения
      }, 300); // Задержка для плавного исчезновения
      lightbox.style.display = 'flex';
      currentIndex = index;
      updateIndicators();
    }

    images.forEach((img, index) => {
      img.setAttribute('data-index', index)
    });

    gallerySelector.addEventListener('click', (e) => {
      const el = e.target
      if (el.tagName === 'IMG') {
        showImage(el.getAttribute('data-index'))
      }
    })

    // Закрытие lightbox при клике на кнопку "X"
    closeBtn.addEventListener('click', () => {
      lightbox.style.display = 'none';
    });

    // Закрытие lightbox при клике вне изображения
    lightbox.addEventListener('click', (e) => {
      if (e.target !== lightboxImage && e.target !== prevBtn && e.target !== nextBtn) {
        lightbox.style.display = 'none';
      }
    });

    // Пролистывание назад
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
      showImage(currentIndex);
    });

    // Пролистывание вперед
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
      showImage(currentIndex);
    });

    // Обработка нажатий клавиш
    document.addEventListener('keydown', (e) => {
      if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
          currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
          showImage(currentIndex);
        }
        if (e.key === 'ArrowRight') {
          currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
          showImage(currentIndex);
        }
        if (e.key === 'Escape') {
          lightbox.style.display = 'none';
        }
      }
    });

    // Добавление индикаторов
    function createIndicators() {
      images.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === currentIndex) indicator.classList.add('active');
        indicator.addEventListener('click', () => showImage(index));
        indicatorsContainer.appendChild(indicator);
      });
    }

    // Обновление индикаторов
    function updateIndicators() {
      document.querySelectorAll('.indicator').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }

    // Поддержка свайпов
    lightboxImage.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    lightboxImage.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipeGesture();
    });

    function handleSwipeGesture() {
      if (touchStartX - touchEndX > 50) {
        currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
        showImage(currentIndex);
      }
      if (touchEndX - touchStartX > 50) {
        currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
        showImage(currentIndex);
      }
    }

    // Инициализация
    createIndicators();
  }

  addImages()
  initModals()
}

initGallery()