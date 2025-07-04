document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.why__item');
  const totalItems = items.length;

  let currentIndex = 0;

  function showSlide(index) {
    items.forEach((item, i) => {
      item.classList.remove('active');
      item.querySelector('.why__item-text').style.display = 'none';
      item.querySelector('.why__buttons-prev').classList.remove('disabled');
      item.querySelector('.why__buttons-next').classList.remove('disabled');
    });

    const currentItem = items[index];
    currentItem.classList.add('active');
    currentItem.querySelector('.why__item-text').style.display = 'block';

    if (index === 0) {
      currentItem.querySelector('.why__buttons-prev').classList.add('disabled');
    }
    if (index === totalItems - 1) {
      currentItem.querySelector('.why__buttons-next').classList.add('disabled');
    }

    // Update the number
    const numElement = currentItem.querySelector('.why__num-1');
    if (numElement) numElement.textContent = `00${index + 1}`;
  }

  function goToSlide(index) {
    currentIndex = (index + totalItems) % totalItems; // Loop logic
    showSlide(currentIndex);
  }

  document.querySelectorAll('.why__buttons-next').forEach(btn =>
    btn.addEventListener('click', () => goToSlide(currentIndex + 1))
  );

  document.querySelectorAll('.why__buttons-prev').forEach(btn =>
    btn.addEventListener('click', () => goToSlide(currentIndex - 1))
  );

  showSlide(currentIndex); // Initial
});
