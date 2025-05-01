// Получаем все кнопки аккордеона
const accordionToggles = document.querySelectorAll('.accordion-toggle');

// Добавляем обработчик клика для каждой кнопки
accordionToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const content = toggle.nextElementSibling;

        // Если контент открыт, скрываем его
        if (content.style.display === "flex") {
            content.style.display = "none";
        } else {
            // Если контент скрыт, показываем его
            content.style.display = "flex";
        }
    });
});