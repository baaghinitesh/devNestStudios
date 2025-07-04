document.addEventListener("DOMContentLoaded", function () {
  const navButtons = document.querySelectorAll(".services__navigation-item");
  const serviceItems = document.querySelectorAll(".services__item");

  navButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      // Remove active class from all nav buttons
      navButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Collapse all service items
      serviceItems.forEach((item, i) => {
        const title = item.querySelector(".services__title");
        const content = item.querySelector(".services__item-content");

        item.classList.remove("active", "is-active");
        title.classList.remove("is-active");
        title.setAttribute("aria-expanded", "false");
        content.classList.remove("services__item-content--expanded");
      });

      // Expand the corresponding service item
      const currentItem = serviceItems[index];
      const currentTitle = currentItem.querySelector(".services__title");
      const currentContent = currentItem.querySelector(".services__item-content");

      currentItem.classList.add("active", "is-active");
      currentTitle.classList.add("is-active");
      currentTitle.setAttribute("aria-expanded", "true");
      currentContent.classList.add("services__item-content--expanded");
    });
  });
});
