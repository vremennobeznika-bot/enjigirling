document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('resourcesGrid');
    const filter = document.getElementById('resourcesFilter');
    if (!grid || !filter || !Array.isArray(window.resources || resources)) return;
    const data = window.resources || resources;
    const types = ['Все', ...Array.from(new Set(data.map(r => r.type).filter(Boolean)))];
    let activeType = 'Все';
    let query = '';

    filter.innerHTML = `
      <div class="resource-filter-row">
        <div class="resource-buttons" id="resourceTypeButtons"></div>
        <input class="resource-search" id="resourceSearch" type="search" placeholder="Поиск по ресурсам" autocomplete="off">
      </div>`;
    const buttons = document.getElementById('resourceTypeButtons');
    const search = document.getElementById('resourceSearch');

    types.forEach(type => {
        const btn = document.createElement('button');
        btn.className = 'eng-filter-btn' + (type === 'Все' ? ' active' : '');
        const filterLabels = {
            'Дружественные каналы': 'Каналы',
            'Чаты в Telegram': 'Чаты',
            'Платформы для разработок': 'Платформы'
        };
        btn.textContent = filterLabels[type] || type;
        btn.addEventListener('click', () => {
            activeType = type;
            buttons.querySelectorAll('button').forEach(b => b.classList.toggle('active', b === btn));
            render();
        });
        buttons.appendChild(btn);
    });

    search.addEventListener('input', () => { query = search.value.trim().toLocaleLowerCase('ru-RU'); render(); });

    function esc(value) {
        return String(value ?? '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
    }
    function render() {
        const items = data.filter(item => {
            const typeOk = activeType === 'Все' || item.type === activeType;
            const hay = `${item.name || ''} ${item.desc || ''} ${item.type || ''}`.toLocaleLowerCase('ru-RU');
            return typeOk && (!query || hay.includes(query));
        });
        grid.innerHTML = items.map(item => `
          <a class="eng-card eng-card--link resource-card" href="${esc(item.link)}" target="_blank" rel="noopener noreferrer">
            <div class="resource-type">${esc(item.type || 'Ресурс')}</div>
            <h3 class="eng-title">${esc(item.name)}</h3>
            <p class="eng-desc">${esc(item.desc)}</p>
            <span class="eng-resource-link">Перейти →</span>
          </a>`).join('');
        if (!items.length) grid.innerHTML = '<p class="eng-empty">Ничего не найдено.</p>';
    }
    render();
});