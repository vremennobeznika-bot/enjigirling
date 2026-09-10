const PROFESSION_CATEGORIES = {
    "civil-engineer": "Строительство",
    "architect-engineer": "Строительство",
    "road-engineer": "Строительство",
    "mechanical-engineer": "Машиностроение",
    "power-engineer": "Энергетика"
};

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('professionsGrid');
    const categoriesEl = document.getElementById('categories');

    let activeCategory = 'Все';

    function getCategories() {
        const cats = new Set();
        professionsData.forEach(p => {
            const c = PROFESSION_CATEGORIES[p.id] || 'Прочее';
            cats.add(c);
        });
        return Array.from(cats).sort();
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
        const category = PROFESSION_CATEGORIES[p.id] || 'Прочее';
        const s = p.stats || {};
        const sal = p.salary || {};
        const edu = p.education || {};
        const growth = p.careerGrowth || [];

        const specialists = s.specialists ? s.specialists.toLocaleString('ru-RU') : '—';
        const avgAge = s.avgAge ? s.avgAge + ' лет' : '—';
        const gender = s.genderRatio || '—';

        card.innerHTML = `
            ${p.icon ? `<div class="eng-icon">${p.icon}</div>` : ''}
            <h3 class="eng-title">${p.title}</h3>
            <p class="eng-prof">${category}</p>
            <p class="eng-desc">${p.shortDesc || ''}</p>

            <div class="eng-card-info">
                <div><span>Специалистов</span><b>${specialists}</b></div>
                <div><span>Средний возраст</span><b>${avgAge}</b></div>
                <div><span>М / Ж</span><b>${gender}</b></div>
                <div><span>Старт</span><b>${sal.start || '—'}</b></div>
                <div><span>Медиана</span><b>${sal.median || '—'}</b></div>
                <div><span>Потолок</span><b>${sal.peak || '—'}</b></div>
            </div>

            ${edu.duration ? `<p class="eng-card-edu"><span>Обучение</span> ${edu.duration}</p>` : ''}

            ${growth.length ? `
                <div class="eng-card-growth">
                    <p class="eng-card-growth-title">Карьерный рост</p>
                    <ul>
                        ${growth.slice(0, 2).map(g => `<li><b>${g.title}</b> <span>(${g.period})</span><i>${g.salary}</i></li>`).join('')}
                    </ul>
                </div>
            ` : ''}
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
        const overlay = document.getElementById('modalOverlay');
        const modalContent = document.getElementById('modalContent');
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
                <h2>${p.icon || ''} ${p.title}</h2>
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

    document.getElementById('modalClose').addEventListener('click', () => {
        const overlay = document.getElementById('modalOverlay');
        overlay.classList.remove('active');
        overlay.style.display = 'none';
    });
    document.getElementById('modalOverlay').addEventListener('click', (e) => {
        if (e.target === document.getElementById('modalOverlay')) {
            e.target.classList.remove('active');
            e.target.style.display = 'none';
        }
    });

    renderFilters();
    renderGrid();
});