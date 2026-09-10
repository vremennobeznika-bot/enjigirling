document.addEventListener('DOMContentLoaded', () => {
    const pathSelect = document.getElementById('calcPath');
    const workSelect = document.getElementById('calcWork');
    const ageSelect = document.getElementById('calcAge');
    const resultValue = document.getElementById('calcResultValue');
    const resultHint = document.getElementById('calcResultHint');

    if (!pathSelect || !workSelect || !ageSelect || !resultValue || !resultHint) return;

    // Данные по путям: срок обучения в годах
    const PATHS = {
        college9: { label: 'Техникум после 9 классов', years: 3.8, after: 'после 9 класса', grad: 'по окончании техникума' },
        college11: { label: 'Техникум после 11 классов', years: 2.8, after: 'после 11 класса', grad: 'по окончании техникума' },
        college9_uni: { label: 'Техникум → вуз', years: 3.8 + 3, after: 'после 9 класса', grad: 'по окончании вуза' },
        unibach: { label: 'Вуз: бакалавриат', years: 4, after: 'после 11 класса', grad: 'по окончании бакалавриата' },
        unispec: { label: 'Вуз: специалитет', years: 5.5, after: 'после 11 класса', grad: 'по окончании специалитета' },
        unimaster: { label: 'Вуз: бакалавриат + магистратура', years: 6, after: 'после 11 класса', grad: 'по окончании магистратуры' }
    };

    function formatYears(years) {
        if (years <= 0) return 'уже сейчас';
        const y = Math.floor(years);
        const months = Math.round((years - y) * 12);
        if (y === 0) return `${months} ${pluralMonths(months)}`;
        if (months === 0) return `${y} ${pluralYears(y)}`;
        return `${y} ${pluralYears(y)} и ${months} ${pluralMonths(months)}`;
    }

    function pluralYears(n) {
        const m10 = n % 10, m100 = n % 100;
        if (m10 === 1 && m100 !== 11) return 'год';
        if ([2,3,4].includes(m10) && ![12,13,14].includes(m100)) return 'года';
        return 'лет';
    }

    function pluralMonths(n) {
        const m10 = n % 10, m100 = n % 100;
        if (m10 === 1 && m100 !== 11) return 'месяц';
        if ([2,3,4].includes(m10) && ![12,13,14].includes(m100)) return 'месяца';
        return 'месяцев';
    }

    function calculate() {
        const pathKey = pathSelect.value;
        const workWhen = workSelect.value;
        const age = parseFloat(ageSelect.value) || 0;
        const path = PATHS[pathKey];
        if (!path) return;

        let total = path.years;
        let hint = '';

        // Учитываем уже пройденные годы после школы/колледжа
        let alreadyText = '';
        if (age > 0) {
            total = Math.max(0, total - age);
            alreadyText = ` Вы уже прошли ${formatYears(age)} — это вычитается из общего срока.`;
        }

        if (workWhen === 'during') {
            const startYear = 1.5;
            if (total <= startYear) {
                hint = `Учиться ${formatYears(path.years)}${age > 0 ? `, осталось примерно ${formatYears(total)}` : ''}. Совмещая с работой, можно начать зарабатывать раньше окончания учёбы.${alreadyText}`;
            } else {
                total = Math.max(0, startYear - age);
                hint = `Совмещая учёбу с работой, первую зарплату реально получить уже через ~1.5 года (обычно со 2-го курса). Диплом при этом позже.${alreadyText}`;
            }
        } else {
            hint = `Путь: ${path.label} (${path.after}). Первая полноценная зарплата — ${path.grad}.${alreadyText}`;
        }

        resultValue.textContent = formatYears(total);
        resultHint.textContent = hint;
    }

    pathSelect.addEventListener('change', calculate);
    workSelect.addEventListener('change', calculate);
    ageSelect.addEventListener('change', calculate);

    calculate();
});