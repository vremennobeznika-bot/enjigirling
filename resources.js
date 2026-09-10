document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('resourcesGrid');
    const filter = document.getElementById('resourcesFilter');

    const types = ['Все', 'Журналы', 'Форумы', 'Платформы для разработок', 'Чаты в Telegram', 'Дружественные каналы'];

    let activeType = null;

    types.forEach(type => {
        const btn = document.createElement('button');
        btn.className = 'eng-filter-btn';
        btn.textContent = type;
        btn.dataset.type = type;
        if (type === 'Все') btn.classList.add('active');
        btn.addEventListener('click', () => {
            if (activeType === type) {
                activeType = null;
                document.querySelectorAll('#resourcesFilter button').forEach(b => b.classList.remove('active'));
                renderResources(resources);
            } else {
                activeType = type;
                document.querySelectorAll('#resourcesFilter button').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderResources(type === 'Все' ? resources : resources.filter(r => r.type === type));
            }
        });
        filter.appendChild(btn);
    });

    function renderResources(items) {
        grid.innerHTML = '';
        items.forEach(item => {
            const card = document.createElement('a');
            card.className = 'eng-card eng-card--link';
            card.href = item.link;
            card.target = '_blank';
            card.rel = 'noopener noreferrer';

            card.innerHTML = `
                <h3 class="eng-title">${item.name}</h3>
                <p class="eng-desc">${item.desc}</p>
                <span class="eng-resource-link">Перейти →</span>
            `;
            grid.appendChild(card);
        });
    }

    renderResources(resources);
});