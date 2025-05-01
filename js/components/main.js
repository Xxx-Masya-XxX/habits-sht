console.log(Date.now());
storageManager = new StorageManager();
let data = storageManager.loadHabits().map(obj => new Habit(false, obj)); // 🛠️ фикс
console.log(data);
render = new Render();
function renderHabits() {
    let html = document.querySelector('.habits-container');
    html.innerHTML = '';
    let habits_list = '.habits-container';

    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            render.render(habits_list, data[i].render());
        }
    }
}
renderHabits();
let form = new CreateHabitForm();
let habit_form = '#habitForm';
render.render(habit_form, form.render());
form.attachEventListeners();



function downloadHabitsAsJson() {
    const habits = storageManager.loadHabits();
    const jsonString = JSON.stringify(habits.map(h => h.toJSON()), null, 2);

    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "habits.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
    console.log("📁 JSON-файл привычек сформирован и загружается.");
}

function importHabitsFromJson() {
    const fileInput = document.getElementById('importFile');
    const file = fileInput.files[0];

    if (!file) {
        alert("Выберите JSON-файл для импорта.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        try {
            const json = JSON.parse(event.target.result);

            if (!Array.isArray(json)) {
                throw new Error("Файл должен содержать массив привычек.");
            }

            const valid = json.every(habit =>
                'id' in habit &&
                'name' in habit &&
                'unit' in habit &&
                'dailyGoal' in habit &&
                'total' in habit &&
                'logs' in habit
            );
            
            if (!valid) {
                throw new Error("Некорректный формат привычек в файле.");
            }
            
            // Добавим поле daily, если отсутствует
            json.forEach(habit => {
                if (!('daily' in habit)) {
                    habit.daily = 0;
                }
            });
            
            // Преобразуем в объекты Habit и сохраняем
            const habits = json.map(data => new Habit(false, data));
            storageManager.saveHabits(habits);
            alert("✅ Привычки успешно импортированы!");

            // Перерисовка
            const render = new Render();
            render.renderHabits();

        } catch (error) {
            console.error("Ошибка при импорте:", error);
            alert("❌ Ошибка при импорте: " + error.message);
        }
    };

    reader.readAsText(file);
}


