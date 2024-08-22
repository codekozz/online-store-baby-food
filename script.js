const items = [{
        title: "Деревянный котёнок",
        description: "Игрушка расписана вручную акриловыми красками и покрыта специальным лаком для деревянных игрушек.",
        tags: ["0 +", "животные"],
        price: 300,
        img: "./img/1.jpg",
        rating: 2.4,
    },
    {
        title: "Трактор с прицепом",
        description: "Прицеп легко отсоединяется, машинкой можно играть отдельно.",
        tags: ["12 +", "техника"],
        price: 4250,
        img: "./img/2.jpg",
        rating: 4.1,
    },
    {
        title: "Игрушка-каталка - Гусь",
        description: "Материал: дерево липа, краски и лаки на водной основе.",
        tags: ["12 +", "другое", "животные"],
        price: 1500,
        img: "./img/3.jpg",
        rating: 5.0,
    },
    {
        title: "Радуга",
        description: "Размер: 26х13х4,5 см",
        tags: ["0 +", "другое"],
        price: 2400,
        img: "./img/4.jpg",
        rating: 3.7,
    },
    {
        title: "Пирамидка-маяк",
        description: "Важно: отправляется в разобранном виде.",
        tags: ["12 +", "другое"],
        price: 1600,
        img: "./img/5.jpg",
        rating: 4.9,
    },
    {
        title: "Сортер - Человечки",
        description: "Отличный материал для изучения цвета и  счета.",
        tags: ["12 +", "другое"],
        price: 1400,
        img: "./img/6.jpg",
        rating: 5.0,
    },
];


const itemsContainer = document.querySelector('#shop-items');
const itemTemplate = document.querySelector('#item-template');
const nothingFound = document.querySelector('#nothing-found');

const tagsFilter = document.querySelector('.tag-filters');
const arrTags = [];

function prepareShopItem(shopItem) {
    const { title, description, tags, img, price, rating } = shopItem;
    const item = itemTemplate.content.cloneNode(true);

    item.querySelector("h1").textContent = title;
    item.querySelector("p").textContent = description;
    item.querySelector("img").src = img;
    item.querySelector('.price').textContent = `${price}P`;

    const ratingContainer = item.querySelector('.rating');
    for (let i = 0; i < rating; i++) {
        const star = document.createElement('i');
        star.classList.add('fa', 'fa-star');
        ratingContainer.append(star);
    }

    const tagsHolder = item.querySelector('.tags');

    tags.forEach((tag) => {
        const element = document.createElement('span');
        element.textContent = tag;
        element.classList.add('tag');
        tagsHolder.append(element);
        arrTags.push(tag);
    });

    return item;
}

let currentState = [...items];

function renderItems(arr) {
    nothingFound.textContent = '';
    itemsContainer.innerHTML = '';

    arr.forEach((item) => {
        itemsContainer.append(prepareShopItem(item));
    });

    if (!arr.length) {
        nothingFound.textContent = "Ничего не надено";
    }
}

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

arrTags.sort();
arrTags.push('все');
const arrFilter = [...new Set(arrTags)];

arrFilter.forEach((tag) => {
    const element = document.createElement('span');
    element.textContent = tag;
    element.classList.add('tag-filter');
    tagsFilter.append(element);
});

function sortByAlphabet(a, b) {
    if (a.title > b.title) {
        return 1;
    }

    if (a.title < b.title) {
        return -1;
    }

    return 0;
}

const sortControl = document.querySelector('#sort');

sortControl.addEventListener('change', (event) => {
    const selectedOption = event.target.value;

    switch (selectedOption) {
        case 'expensive':
            {
                currentState.sort((a, b) => b.price - a.price);
                break;
            }
        case 'cheap':
            {
                currentState.sort((a, b) => a.price - b.price);
                break;
            }
        case 'rating':
            {
                currentState.sort((a, b) => b.rating - a.rating);
                break;
            }
        case 'alphabet':
            {
                currentState.sort((a, b) => sortByAlphabet(a, b));
                break;
            }
    }

    renderItems(currentState);
})

const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-btn');

function applySearch() {
    const searchString = searchInput.value.trim().toLowerCase();

    currentState = items.filter((el) =>
        el.title.toLocaleLowerCase().includes(searchString)
    );
    currentState.sort((a, b) => sortByAlphabet(a, b));

    sortControl.selectedIndex = 0;

    renderItems(currentState);
}

searchButton.addEventListener('click', applySearch);
searchInput.addEventListener('search', applySearch);

const tagElement = document.querySelectorAll('.tag-filter');

tagElement.forEach(item => {
    item.addEventListener('click', () => {
        tagElement.forEach(item => {
            item.classList.remove('tag-active');
        });

        item.classList.add('tag-active');

        const activTag = document.querySelector('.tag-active');

        if (activTag.textContent === 'все') {
            currentState = [...items];
        } else {

            currentState = items.filter((element) =>
                element.tags.includes(activTag.textContent)
            );
        }

        currentState.sort((a, b) => sortByAlphabet(a, b));

        sortControl.selectedIndex = 0;

        renderItems(currentState);
    });

});