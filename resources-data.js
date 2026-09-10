const resources = [
    // ===== Журналы =====
    {
        id: "mag-science-life",
        type: "Журналы",
        name: "Наука и жизнь",
        desc: "Классический научно-популярный журнал с материалами по физике, химии, биологии и технике. Один из старейших изданий для инженеров.",
        link: "https://nkj.ru"
    },
    {
        id: "mag-kvant-digital",
        type: "Журналы",
        name: "Квант (цифровой)",
        desc: "Научно-популярный физико-математический журнал для школьников и студентов. Статьи по физике и математике на высоком уровне.",
        link: "https://www.kvant.digital/"
    },
    {
        id: "mag-biblio-mccme",
        type: "Журналы",
        name: "Библиотека МЦНМО",
        desc: "Книги и материалы Московского центра непрерывного математического образования: математика, физика, инженерные науки.",
        link: "https://mccme.ru/ru/magazins/"
    },
    {
        id: "mag-kvantik",
        type: "Журналы",
        name: "Квантик",
        desc: "Детский научно-популярный журнал о математике, физике и лингвистике. Увлекательные задачи и эксперименты для юных инженеров.",
        link: "https://kvantik.com/"
    },
    {
        id: "mag-krugozor-kolobok",
        type: "Журналы",
        name: "Кругозор / Колобок",
        desc: "Архив советских детских журналов с пластинками: увлекательно о технике, науке и путешествиях.",
        link: "http://www.krugozor-kolobok.ru/"
    },
    {
        id: "mag-trv-science",
        type: "Журналы",
        name: "Троицкий вариант — Наука",
        desc: "Независимая научно-популярная газета о науке, академической жизни и технологиях. Актуальные статьи для инженеров и учёных.",
        link: "https://www.trv-science.ru/"
    },
    {
        id: "mag-moluch",
        type: "Журналы",
        name: "Молодой учёный",
        desc: "Научный журнал для молодых исследователей и студентов. Публикация статей по техническим и естественным наукам.",
        link: "https://moluch.ru/"
    },

    // ===== Форумы =====
    {
        id: "forum-habr",
        type: "Форумы",
        name: "Хабр",
        desc: "Крупнейшая русскоязычная платформа о технологиях, IT и инженерии. Статьи, вопросы и обсуждения по всем направлениям.",
        link: "https://habr.com"
    },
    {
        id: "forum-ixbt",
        type: "Форумы",
        name: "iXBT.com",
        desc: "Площадка о компьютерном железе, электронике, радиотехнике и новых технологиях. Активное сообщество технических энтузиастов.",
        link: "https://forum.ixbt.com"
    },

    // ===== Платформы для разработок =====
    {
        id: "dev-github",
        type: "Платформы для разработок",
        name: "GitHub",
        desc: "Крупнейшая в мире платформа для хостинга кода, совместной разработки и управления проектами.",
        link: "https://github.com/"
    },
    {
        id: "dev-gitflic",
        type: "Платформы для разработок",
        name: "GitFlic",
        desc: "Российская платформа для хранения и совместной разработки кода. Аналог GitHub для работы над инженерными и программными проектами.",
        link: "https://gitflic.ru/"
    },
    {
        id: "dev-hub-mos",
        type: "Платформы для разработок",
        name: "Hub.Mos",
        desc: "Московская платформа для обсуждения проектов и идей развития города. Площадка для инженеров и инициативных жителей.",
        link: "https://hub.mos.ru/"
    },
    {
        id: "dev-gitee",
        type: "Платформы для разработок",
        name: "Gitee",
        desc: "Крупнейшая китайская платформа для хостинга кода и совместной разработки. Популярная альтернатива GitHub.",
        link: "https://gitee.com/"
    },
    {
        id: "dev-gitcode",
        type: "Платформы для разработок",
        name: "GitCode",
        desc: "Китайская платформа для хранения и совместной разработки кода, ориентированная на программные и инженерные проекты.",
        link: "https://gitcode.com/"
    },

    // ===== Чаты в Telegram =====
    {
        id: "tg-electronix",
        type: "Чаты в Telegram",
        name: "Electronix",
        desc: "Telegram-чат для общения об электронике, схемотехнике и разработке электронных устройств.",
        link: "https://t.me/electronix"
    },
    {
        id: "tg-it-chats",
        type: "Чаты в Telegram",
        name: "IT-чаты",
        desc: "Сборник Telegram-чатов для IT-специалистов: обмен опытом, вакансии и обсуждение технологий.",
        link: "https://t.me/it_chats"
    },
    {
        id: "tg-speech-recognition-ru",
        type: "Чаты в Telegram",
        name: "Распознавание речи RU",
        desc: "Русскоязычный Telegram-чат о распознавании речи, обработке аудио и речевых технологиях.",
        link: "https://t.me/speech_recognition_ru"
    },
    {
        id: "tg-russianphoneclub",
        type: "Чаты в Telegram",
        name: "Russian Phone Club",
        desc: "Telegram-чат о телефонах, мобильных устройствах и связанных с ними технологиях.",
        link: "https://t.me/russianphoneclub"
    },
    {
        id: "tg-solidsovet",
        type: "Чаты в Telegram",
        name: "SolidSovet",
        desc: "Сообщество пользователей САПР SolidWorks: обсуждение моделирования, чертежей и проектирования.",
        link: "https://t.me/solidsovet"
    },
    {
        id: "tg-decadentia-chat",
        type: "Чаты в Telegram",
        name: "DeCADentia Chat",
        desc: "Telegram-чат о САПР AutoCAD и проектировании: обмен опытом, лайфхаки и решение задач.",
        link: "https://t.me/DeCADentia_Chat"
    },
    {
        id: "tg-brainfuckpc-chat",
        type: "Чаты в Telegram",
        name: "BrainfuckPC Chat",
        desc: "Telegram-чат о компьютерах, железе и сборке ПК: советы, обсуждения и помощь.",
        link: "https://t.me/brainfuckpc_chat"
    },
    {
        id: "tg-ru2chmobi",
        type: "Чаты в Telegram",
        name: "Ru2ch mobil",
        desc: "Telegram-чат о мобильных устройствах и гаджетах: новости, обсуждения и рекомендации.",
        link: "https://t.me/ru2chmobi"
    },
    {
        id: "tg-cadmeetup",
        type: "Чаты в Telegram",
        name: "CAD Meetup",
        desc: "Telegram-чат о САПР и инженерном проектировании: встречи, обсуждения и обмен опытом.",
        link: "https://t.me/cadmeetup"
    },
    {
        id: "tg-ru-iot",
        type: "Чаты в Telegram",
        name: "RU IoT",
        desc: "Русскоязычный Telegram-чат об интернете вещей (IoT): устройства, протоколы и умный дом.",
        link: "https://t.me/ru_iot"
    },
    {
        id: "tg-ru-electronics",
        type: "Чаты в Telegram",
        name: "RU Electronics",
        desc: "Русскоязычный Telegram-чат об электронике: схемы, компоненты и разработка устройств.",
        link: "https://t.me/ru_electronics"
    },
    {
        id: "tg-ru-arduino",
        type: "Чаты в Telegram",
        name: "RU Arduino",
        desc: "Русскоязычный Telegram-чат об Arduino и микроконтроллерах: проекты, код и помощь.",
        link: "https://t.me/ru_arduino"
    },

    // ===== Дружественные каналы =====
    {
        id: "fr-you-engineer-asu",
        type: "Дружественные каналы",
        name: "You_engineer_asu",
        desc: "Канал о жизни инженера АСУ ТП без приукрашиваний. Там же большой чат для обмена опытом.",
        link: "https://t.me/you_engineer_asu"
    },
    {
        id: "fr-forodirch-news",
        type: "Дружественные каналы",
        name: "ForodirchNEWS",
        desc: "Канал доктора физико-математических наук: много непопулярной политики, занимательных вещей и путешествий.",
        link: "https://t.me/forodirchNEWS"
    },
    {
        id: "fr-mathrocknroll",
        type: "Дружественные каналы",
        name: "Mathrocknroll",
        desc: "Красота математики, пригодной для быта.",
        link: "https://t.me/mathrocknroll"
    },
    {
        id: "fr-nachertillicome",
        type: "Дружественные каналы",
        name: "Nachertilicome",
        desc: "Корабел шутит и объясняет сложное на пальцах под музыку.",
        link: "https://t.me/Nachertilicome"
    },
    {
        id: "fr-catin-asutp",
        type: "Дружественные каналы",
        name: "CatinAsuTp",
        desc: "Канал инженера АСУ ТП и его аккуратных проектов с юмором.",
        link: "https://t.me/catinAsuTp"
    },
    {
        id: "fr-pro-asutp",
        type: "Дружественные каналы",
        name: "Pro_asutp",
        desc: "Роботы на зарплате. Оптимизация по высшему разряду.",
        link: "https://t.me/pro_asutp"
    },
    {
        id: "fr-dragon-logic",
        type: "Дружественные каналы",
        name: "Dragon_logic",
        desc: "Новые инструментальные средства для программирования ПЛК (ООП).",
        link: "https://t.me/dragon_logic"
    },
    {
        id: "fr-whyisitso",
        type: "Дружественные каналы",
        name: "Whyisitso",
        desc: "Проблемы людей, железок, людей с железками и железок с людьми.",
        link: "https://t.me/whyisitso"
    },
    {
        id: "fr-cerreradark-official",
        type: "Дружественные каналы",
        name: "Cerreradarkofficial",
        desc: "Канал, где делают самый лучший фонк.",
        link: "https://t.me/cerreradarkofficial/763"
    },
    {
        id: "fr-aiunusov",
        type: "Дружественные каналы",
        name: "Aiunusov",
        desc: "Канал философа-практика, режиссёра и эзотерика.",
        link: "https://t.me/aiunusov"
    },
    {
        id: "fr-popyachsa",
        type: "Дружественные каналы",
        name: "Popyachsa",
        desc: "Агрегатор хорошего настроения от иностранного агента. Разработка, мемы, много непопулярной политики и науки.",
        link: "https://t.me/popyachsa"
    },
    {
        id: "fr-prlshrlinlove",
        type: "Дружественные каналы",
        name: "Prlshrlinlove",
        desc: "Психологический канал о людях с расстройствами личности.",
        link: "https://t.me/prlshrlinlove"
    }
];