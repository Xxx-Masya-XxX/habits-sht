class Habit {
    constructor(is_new, data) {
        if (is_new) {
            this.id = Date.now();
            this.name = data[0];
            this.unit = data[1];
            this.dailyGoal = data[2];
            this.total = 0;
            this.logs = [];
            this.daily = 0; // изначально 0
        } else {
            this.id = data.id;
            this.name = data.name;
            this.unit = data.unit;
            this.dailyGoal = data.dailyGoal;
            this.total = data.total;
            this.logs = data.logs ?? [];
    
            const today = new Date().toLocaleDateString();
            this.daily = this.logs
                .filter(log => log.date === today)
                .reduce((sum, log) => sum + log.value, 0);
        }
    }
    

    addLog() {
        const input = document.getElementById(`input-${this.id}`);
        let amount = parseInt(input.value);
        if (isNaN(amount) || amount <= 0) {
            console.warn("Введено неверное количество");
            return;
        }
        this.total += amount;
        this.daily += amount;
        this.logs.push({
            date: new Date().toLocaleDateString(),
            value: amount
        });
        console.log('Лог добавлен:', this.logs);

        // Обновляем привычку в localStorage после добавления лога
        storageManager.updateHabit(this);
        input.value = 0;
        renderHabits();
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            unit: this.unit,
            dailyGoal: this.dailyGoal,
            total: this.total,
            logs: this.logs
        };
    }
    

    render() {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <div class="habit-card" id="habit-${this.id}">
                <h3>${this.name}</h3>
                <div class="info">
                    <p>Цель: ${this.dailyGoal} ${this.unit}</p>
                    <p>Всего: ${this.total} ${this.unit}</p>
                    <p>Сегодня: ${this.daily} ${this.unit}</p>
                </div>
                <div class="number-input">
                    <button class="decrement">-</button>
                    <input id="input-${this.id}" type="number" value="0" min="0" />
                    <button class="increment">+</button>
                </div>
                <button class="save-btn">Сохранить</button>
            </div>
        `;

        wrapper.querySelector('.save-btn').addEventListener('click', () => {
            this.addLog();
        });

        return wrapper;
    }
}