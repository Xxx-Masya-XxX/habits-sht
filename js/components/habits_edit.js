// Функция отрисовки списка привычек с кнопками "Удалить"
function renderEditHabitList() {
    const habitEditContainer = document.querySelector('.habit-edit');
    habitEditContainer.innerHTML = ''; // Очистка

    const habits = storageManager.loadHabits();
    habits.forEach(habit => {
        const item = document.createElement('div');
        item.classList.add('habit-edit-item');

        const label = document.createElement('label');
        label.textContent = habit.name;
        label.classList.add('habit-edit-label');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.classList.add('btn-delete');
        deleteBtn.classList.add('btn');

        deleteBtn.addEventListener('click', () => {
            const confirmed = confirm(`Удалить привычку "${habit.name}"?`);
            if (confirmed) {
                storageManager.deleteHabit(habit.id);
                renderEditHabitList(); // Перерисовка после удаления
            }
        });

        item.appendChild(label);
        item.appendChild(deleteBtn);
        habitEditContainer.appendChild(item);
    });
    renderHabits();
}