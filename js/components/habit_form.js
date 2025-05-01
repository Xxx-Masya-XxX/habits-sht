class CreateHabitForm {

    render() {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <form id="habitForm" class="habit-form">
                <div class="form-group">
                    <label for="habitName">Название привычки:</label>
                    <input type="text" id="habitName" required>
                </div>
                
                <div class="form-group">
                    <label for="habitUnit">Единица измерения:</label>
                    <input type="text" id="habitUnit" required>
                </div>
    
                <div class="form-group">
                    <label for="dailyGoal">Ежедневная цель:</label>
                    <div class="number-input">
                        <button type="button" class="decrement">-</button>
                        <input id="dailyGoal" type="number" value="0" min="0" required>
                        <button type="button" class="increment">+</button>
                    </div>
                </div>
    
                <button type="submit" class="btn">Создать привычку</button>
            </form>
        `;
        return wrapper.firstElementChild;
    }

    removeHTMLTags(str) {
        return str.replace(/<(?!\/?font\b)[^>]+>/gi, '');
    }
    attachEventListeners() {
        const form = document.querySelector('#habitForm');
        const input = document.getElementById('dailyGoal');

        // Добавляем обработчики кнопок + и -
        form.querySelector('.increment').addEventListener('click', () => {
            input.value = Number(input.value) + 1;
        });

        form.querySelector('.decrement').addEventListener('click', () => {
            input.value = Math.max(Number(input.value) - 1, 0);
        });

        // Обработчик отправки формы
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const habitName = this.removeHTMLTags(document.getElementById('habitName').value.trim());
            const habitUnit = this.removeHTMLTags(document.getElementById('habitUnit').value.trim());
            const dailyGoal = Number(document.getElementById('dailyGoal').value);
            
            if (habitName && habitUnit && dailyGoal >= 0) {
                const habit = new Habit(true, [habitName, habitUnit, dailyGoal]);


                document.getElementById('habitName').value = '';
                document.getElementById('habitUnit').value = '';
                document.getElementById('dailyGoal').value = '0';

                storageManager.createHabit(habit);
                // Обновление списка привычек
                render.render('.habits-container', habit.render());
            }
        });
    }
}
