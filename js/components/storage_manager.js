class StorageManager {
    constructor() {
        this.storageKey = 'habit_tracker';
    }

    // Сохранить привычки в localStorage
    saveHabits(habits) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(habits, null, 2)); // форматируем для читабельности
            console.log('✅ Привычки сохранены:', habits);
            return true;
        } catch (error) {
            console.error('❌ Ошибка при сохранении привычек:', error);
            return false;
        }
    }

    // Загрузить привычки из localStorage
    loadHabits() {
        try {
            const habitsRaw = localStorage.getItem(this.storageKey);
            const habitArray = habitsRaw ? JSON.parse(habitsRaw) : [];
            return habitArray.map(h => new Habit(false, h)); // преобразуем каждый элемент в объект Habit
        } catch (error) {
            console.error('❌ Ошибка при загрузке привычек:', error);
            return [];
        }
    }

    // Создание новой привычки
    createHabit(habit) {
        const habits = this.loadHabits();
        const exists = habits.some(h => h.id === habit.id || h.name === habit.name);
        if (exists) {
            console.warn('Привычка уже существует:', habit.name);
            return false;
        }
        habits.push(habit);
        this.saveHabits(habits);
        console.log('Создана новая привычка:', habit);
        return true;
    }

    // Обновление привычки
    updateHabit(updatedHabit) {
        const habits = this.loadHabits();
        const index = habits.findIndex(h => h.id === updatedHabit.id);
        if (index !== -1) {
            habits[index] = updatedHabit;
            this.saveHabits(habits); // Сохраняем обновлённую привычку
            console.log('Привычка обновлена:', updatedHabit);
            return true;
        }
        console.warn('Не удалось обновить — привычка не найдена:', updatedHabit.id);
        return false;
    }

    // Добавление лога в привычку
    addLog(habitId, log) {
        const habits = this.loadHabits();
        const habit = habits.find(h => h.id === habitId);
        if (habit) {
            habit.logs.push(log);
            this.saveHabits(habits);
            console.log('Лог добавлен в привычку:', habit);
            return true;
        }
        console.warn('Не найдена привычка для добавления лога:', habitId);
        return false;
    }

    // Удаление привычки
    deleteHabit(habitId) {
        const habits = this.loadHabits();
        const filteredHabits = habits.filter(h => h.id !== habitId);
        this.saveHabits(filteredHabits);
        console.log('Привычка удалена:', habitId);
        return true;
    }

    // Очистка всех привычек из localStorage
    clearStorage() {
        try {
            localStorage.removeItem(this.storageKey);
            console.log('✅ Все привычки удалены из localStorage');
            return true;
        } catch (error) {
            console.error('❌ Ошибка при очистке localStorage:', error);
            return false;
        }
    }
}
