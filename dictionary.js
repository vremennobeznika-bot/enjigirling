document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('dictionaryGrid');
    const emptyMsg = document.getElementById('dictionaryEmpty');
    const searchInput = document.getElementById('searchInput');

    function renderTerms(items) {
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
                <h3 class="eng-title">${item.term}</h3>
                <p class="eng-desc">${item.def}</p>
            `;
            grid.appendChild(card);
        });
    }

    searchInput.addEventListener('input', () => {
        const q = searchInput.value.trim().toLowerCase();
        const items = dictionary.filter(item =>
            item.term.toLowerCase().includes(q) || item.def.toLowerCase().includes(q)
        );
        renderTerms(items);
    });

    renderTerms(dictionary);
});