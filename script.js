const PROFESSION_CATEGORIES = {
    "civil-engineer": "Строительство",
    "architect-engineer": "Строительство",
    "road-engineer": "Строительство",
    "bridge-engineer": "Строительство",
    "tunnel-engineer": "Строительство",
    "mechanical-engineer": "Машиностроение",
    "automotive-engineer": "Машиностроение",
    "mechatronics-engineer": "Машиностроение",
    "power-engineer": "Энергетика",
    "electrical-engineer": "Энергетика",
    "nuclear-engineer": "Энергетика",
    "aerospace-engineer": "Авиация и космос",
    "space-engineer": "Авиация и космос",
    "chemical-engineer": "Химия и нефтехимия",
    "oil-gas-engineer": "Химия и нефтехимия",
    "metallurgical-engineer": "Металлургия",
    "mining-engineer": "Горное дело",
    "geophysicist-engineer": "Геология и геофизика",
    "environmental-engineer": "Экология",
    "biomedical-engineer": "Биомедицина и биотех",
    "biotech-engineer": "Биомедицина и биотех",
    "robotics-engineer": "Робототехника",
    "railway-engineer": "Железная дорога",
    "shipbuilding-engineer": "Кораблестроение",
    "instrumentation-engineer": "АСУ ТП и приборостроение",
    "metrology-engineer": "Метрология и качество",
    "quality-engineer": "Метрология и качество",
    "food-engineer": "Пищевая промышленность",
    "textile-engineer": "Текстильная промышленность",
    "forest-engineer": "Лесная промышленность",
    "telecom-engineer": "Связь и телекоммуникации",
    "radio-engineer": "Радиотехника и электроника",
    "microelectronics-engineer": "Радиотехника и электроника",
    "water-engineer": "Водоснабжение и водоотведение",
    "lighting-engineer": "Светотехника и оптика",
    "optics-engineer": "Светотехника и оптика",
    "laser-engineer": "Светотехника и оптика",
    "acoustic-engineer": "Акустика",
    "data-engineer": "IT",
    "devops-engineer": "IT",
    "ml-engineer": "IT",
    "security-engineer": "IT",
    "cloud-engineer": "IT",
    "embedded-engineer": "IT",
    "frontend-engineer": "IT",
    "backend-engineer": "IT",
    "qa-engineer": "IT",
    "mobile-engineer": "IT",
    "military-engineer": "Военное дело",
    "polygraph-engineer": "Полиграфия",
    "materials-engineer": "Материаловедение и нанотехнологии",
    "nano-engineer": "Материаловедение и нанотехнологии",
    "civil-defense-engineer": "ГО и ЧС",
    "geodetic-engineer": "Геодезия и землеустройство",
    "land-surveyor": "Геодезия и землеустройство",
    "astronomer-engineer": "Астрономия",
    "restoration-engineer": "Реставрация",
    "standardization-engineer": "Стандартизация",
    "patent-engineer": "Патентоведение"
};

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('professionsGrid');
    const categoriesEl = document.getElementById('categories');
    const overlay = document.getElementById('modalOverlay');
    const modalContent = document.getElementById('modalContent');
    const modalClose = document.getElementById('modalClose');

    let activeCategory = 'Все';

    function getCategories() {
        const cats = new Set();
        professionsData.forEach(p => {
            cats.add(PROFESSION_CATEGORIES[p.id] || 'Прочее');
        });
        return Array.from(cats).sort((a, b) => a.localeCompare(b, 'ru'));
    }

    function renderFilters() {
        if (!categoriesEl) return;
        const cats = ['Все', ...getCategories()];
        categoriesEl.innerHTML = '';
        cats.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'eng-filter-btn' + (cat === activeCategory ? ' active' : '');
            btn.textContent = cat;
            btn.addEventListener('click', () => {
                activeCategory = cat;
                renderFilters();
                renderGrid();
            });
            categoriesEl.appendChild(btn);
        });
    }

    function buildCard(p) {
        const card = document.createElement('article');
        card.className = 'eng-card';
        card.innerHTML = `
            ${p.icon ? `<div class="eng-icon">${p.icon}</div>` : ''}
            <h3 class="eng-title">${p.title}</h3>
        `;
        card.addEventListener('click', () => openModal(p));
        return card;
    }

    function renderGrid() {
        if (!grid) return;
        grid.innerHTML = '';
        const items = activeCategory === 'Все'
            ? professionsData
            : professionsData.filter(p => (PROFESSION_CATEGORIES[p.id] || 'Прочее') === activeCategory);
        items.forEach(p => grid.appendChild(buildCard(p)));
    }

    function openModal(p) {
        if (!overlay || !modalContent) return;

        const s = p.stats || {};
        const edu = p.education || {};
        const sal = p.salary || {};
        const growth = (p.careerGrowth || [])
            .map(g => `<li><strong>${g.title}</strong> (${g.period}) — ${g.salary}</li>`)
            .join('');
        const courses = (edu.courses || []).map(c => `<li>${c}</li>`).join('');
        const regions = sal.regions
            ? `<ul class="modal-regions">
                   <li><span>ЦФО</span><b>${sal.regions.central || '—'}</b></li>
                   <li><span>СЗФО</span><b>${sal.regions.northwest || '—'}</b></li>
                   <li><span>ЮФО</span><b>${sal.regions.south || '—'}</b></li>
                   <li><span>СКФО</span><b>${sal.regions.northcaucasus || '—'}</b></li>
                   <li><span>ПФО</span><b>${sal.regions.volga || '—'}</b></li>
                   <li><span>УФО</span><b>${sal.regions.ural || '—'}</b></li>
                   <li><span>СФО</span><b>${sal.regions.siberia || '—'}</b></li>
                   <li><span>ДФО</span><b>${sal.regions.fareast || '—'}</b></li>
               </ul>`
            : '';

        modalContent.innerHTML = `
            <div class="modal-header">
                <h2>${p.icon ? p.icon + ' ' : ''}${p.title}</h2>
                <p class="eng-prof">${p.shortDesc || ''}</p>
            </div>
            <div class="modal-body">
                ${s.specialists ? `<p><strong>Специалистов:</strong> ${s.specialists.toLocaleString('ru-RU')}</p>` : ''}
                ${s.avgAge ? `<p><strong>Средний возраст:</strong> ${s.avgAge} лет</p>` : ''}
                ${s.genderRatio ? `<p><strong>Гендерное соотношение:</strong> ${s.genderRatio}</p>` : ''}

                <h3>Образование</h3>
                ${edu.duration ? `<p><strong>Срок:</strong> ${edu.duration}</p>` : ''}
                ${edu.requirements ? `<p><strong>Требования:</strong> ${edu.requirements}</p>` : ''}
                ${courses ? `<ul>${courses}</ul>` : ''}

                <h3>Зарплата</h3>
                ${sal.start ? `<p><strong>Старт:</strong> ${sal.start}</p>` : ''}
                ${sal.median ? `<p><strong>Медиана:</strong> ${sal.median}</p>` : ''}
                ${sal.peak ? `<p><strong>Потолок:</strong> ${sal.peak}</p>` : ''}
                ${regions}

                ${growth ? `<h3>Карьерный рост</h3><ul>${growth}</ul>` : ''}

                ${p.easy ? `<h3>Плюсы</h3><p>${p.easy}</p>` : ''}
                ${p.hard ? `<h3>Минусы</h3><p>${p.hard}</p>` : ''}
            </div>
        `;
        overlay.classList.add('active');
        overlay.style.display = 'flex';
    }

    if (modalClose) modalClose.addEventListener('click', () => {
        overlay.classList.remove('active');
        overlay.style.display = 'none';
    });
    if (overlay) overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
            overlay.style.display = 'none';
        }
    });

    renderFilters();
    renderGrid();
});