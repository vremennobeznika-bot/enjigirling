document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('calendarGrid');
    const emptyMsg = document.getElementById('calendarEmpty');
    const monthFilter = document.getElementById('monthFilter');
    const profFilter = document.getElementById('professionFilter');
    const searchInput = document.getElementById('searchInput');

    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    let activeMonth = null;
    let activeProfessionId = null;

    // Кнопки выбора месяца (визуально как фильтры на других вкладках)
    months.forEach(month => {
        const btn = document.createElement('button');
        btn.className = 'eng-filter-btn';
        btn.textContent = month;
        btn.dataset.month = month;
        btn.addEventListener('click', () => {
            if (activeMonth === month) {
                activeMonth = null;
                btn.classList.remove('active');
            } else {
                activeMonth = month;
                document.querySelectorAll('#monthFilter button').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }
            applyFilters();
        });
        monthFilter.appendChild(btn);
    });

    // Заполнение выпадающего списка профессий (по holiday-map, гарантированно совпадает с праздниками)
    if (typeof professionsData !== 'undefined' && typeof profHolidays !== 'undefined') {
        professionsData.forEach(prof => {
            if (!profHolidays[prof.id]) return;
            const opt = document.createElement('option');
            opt.value = prof.id;
            opt.textContent = prof.title;
            profFilter.appendChild(opt);
        });
    }

    profFilter.addEventListener('change', () => {
        activeProfessionId = profFilter.value || null;
        applyFilters();
    });

    searchInput.addEventListener('input', applyFilters);

    function applyFilters() {
        let items = holidays;

        if (activeMonth) {
            items = items.filter(h => h.month === activeMonth);
        }

        if (activeProfessionId) {
            const holiday = profHolidays[activeProfessionId];
            items = items.filter(h => holiday && h.name === holiday.name && h.date === holiday.date);
        }

        const q = searchInput.value.trim().toLowerCase();
        if (q) {
            items = items.filter(h => h.name.toLowerCase().includes(q));
        }

        renderHolidays(items);
    }

    function renderHolidays(items) {
        grid.innerHTML = '';
        if (items.length === 0) {
            emptyMsg.style.display = 'block';
            return;
        }
        emptyMsg.style.display = 'none';
        items.forEach(item => {
            const card = document.createElement('article');
            card.className = 'eng-card';
            card.innerHTML = `
                <p class="eng-salary">${item.date}</p>
                <h3 class="eng-title">${item.name}</h3>
                <p class="eng-prof">${item.professions.join(' · ')}</p>
                <p class="eng-desc">${item.note}</p>
            `;
            grid.appendChild(card);
        });
    }

    renderHolidays(holidays);
});