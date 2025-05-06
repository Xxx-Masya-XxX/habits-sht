if (typeof MenuPage === 'undefined') {
    class MenuPage extends Page {
        constructor() {
            const content = `
                <button class="btn" onclick="openPage('main')">Главную</button>
                <button class="btn" onclick="openPage('manager-habits')">Менеджер привычек</button>
                <button class="btn" onclick="openPage('settings')">Настройки</button>
                <button class="btn" onclick="openPage('about-developer')">О разработчике</button>
            `;
            super(content, 'Меню', 'menu');
        }
    }
} 