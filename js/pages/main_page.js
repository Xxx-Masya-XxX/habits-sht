if (typeof MainPage === 'undefined') {
    class MainPage extends Page {
        constructor() {
            const content = `
                <div class="habits-container" id="habitsList">
                    <!-- Habits will be displayed here -->
                </div>
                <div class="habit-form-container" id="habitForm">
                    <!-- Form will be created dynamically -->
                </div>
            `;
            super(content, 'Главная', 'main');
        }
    }
} 