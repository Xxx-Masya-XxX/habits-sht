class Render {

    render(selector, html) {
        const container = document.querySelector(selector);
        if (!container) {
            console.error('Container not found');
            return;
        }
        container.appendChild(html);
    }
    renderHabits() {
        let habitsContainer = document.querySelector('.habits-container');
        let habitsList = storageManager.loadHabits();
        habitsContainer.innerHTML = ''; // Очищаем текущий список привычек
        habitsList.forEach(habit => {
            this.render('.habits-container', habit.render()); // Добавляем привычку обратно в DOM
        });
    }    
}
