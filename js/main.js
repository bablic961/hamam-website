// Работа с анкетой
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('anketa-form');
    const formSection = document.getElementById('form-section');
    const resultSection = document.getElementById('result-section');
    const resultContent = document.getElementById('result-content');
    const editBtn = document.getElementById('edit-btn');
    const deleteBtn = document.getElementById('delete-btn');

    // Проверяем, есть ли сохранённая анкета
    checkSavedAnketa();

    // Обработка отправки формы
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            saveAnketa();
        });
    }

    // Кнопка редактирования
    if (editBtn) {
        editBtn.addEventListener('click', function() {
            showForm();
        });
    }

    // Кнопка удаления
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function() {
            if (confirm('Вы уверены, что хотите удалить свою анкету?')) {
                localStorage.removeItem('hamam_anketa');
                showForm();
                form.reset();
            }
        });
    }

    function saveAnketa() {
        const formData = {
            name: document.getElementById('name').value,
            position: document.getElementById('position').value,
            quote: document.getElementById('quote').value,
            game: document.getElementById('game').value,
            skill: document.getElementById('skill').value,
            why: document.getElementById('why').value,
            experience: document.getElementById('experience').value,
            timestamp: new Date().toLocaleString('ru-RU')
        };

        // Сохраняем в localStorage
        localStorage.setItem('hamam_anketa', JSON.stringify(formData));

        // Показываем результат
        displayAnketa(formData);
        showResult();
    }

    function checkSavedAnketa() {
        const saved = localStorage.getItem('hamam_anketa');
        if (saved) {
            const data = JSON.parse(saved);
            displayAnketa(data);
            showResult();
            fillForm(data);
        }
    }

    function fillForm(data) {
        document.getElementById('name').value = data.name || '';
        document.getElementById('position').value = data.position || '';
        document.getElementById('quote').value = data.quote || '';
        document.getElementById('game').value = data.game || '';
        document.getElementById('skill').value = data.skill || '';
        document.getElementById('why').value = data.why || '';
        document.getElementById('experience').value = data.experience || '';
    }

    function displayAnketa(data) {
        const html = `
            <h4>Информация о вас</h4>
            <p><strong>Имя/Ник:</strong> ${escapeHtml(data.name)}</p>
            <p><strong>Должность в "Хамаме":</strong> ${escapeHtml(data.position)}</p>
            <p><strong>Любимая цитата/мем:</strong> ${escapeHtml(data.quote)}</p>
            ${data.game ? `<p><strong>Любимая игра:</strong> ${escapeHtml(data.game)}</p>` : ''}
            <p><strong>Главный навык:</strong> ${escapeHtml(data.skill)}</p>
            <p><strong>Почему хотите в "Хамам":</strong> ${escapeHtml(data.why)}</p>
            ${data.experience ? `<p><strong>Опыт игры в команде:</strong> ${escapeHtml(data.experience)} лет</p>` : ''}
            <p style="margin-top: 1rem; color: #7f8c8d; font-size: 0.9rem;">
                <em>Анкета сохранена: ${data.timestamp}</em>
            </p>
        `;
        resultContent.innerHTML = html;
    }

    function showForm() {
        formSection.classList.remove('hidden');
        resultSection.classList.add('hidden');
    }

    function showResult() {
        formSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
