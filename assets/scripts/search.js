document.addEventListener('DOMContentLoaded', async function () {
    const searchInput = document.getElementById('search-input');
    const searchList = document.getElementById('search-list');
    const categorySelect = document.getElementById('category__select');
    let items = [];

    const response = await fetch('https://673611ff5995834c8a954d48.mockapi.io/tasks');
    const data = await response.json();
    items = data;

    function displayItems(itemsToDisplay) {
        searchList.innerHTML = '';
        itemsToDisplay.forEach(item => {
            searchList.innerHTML += `
              <section class="card__pag">
                  <div class="card__card">
                      <div class="card__card-block">
                          <img class="card__card-pic" src="${item.image}" alt="${item.title}">
                          <p class="card__card-txt-pic">${item.title}</p>
                      </div>
                      <p class="card__card-txt">${item.text}</p>
                      <p class="card__card-add">${item.addres}</p>
                  </div>
              </section>
            `;
        });
    }
    function filterItems() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value;
    
        const filteredItems = items.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategory === 'All' || selectedCategory === '' || item.category === selectedCategory; // Добавлено условие для "All"
            return matchesSearch && matchesCategory;
        });
        displayItems(filteredItems);
    }



    displayItems(items);

    searchInput.addEventListener('input', filterItems);
    categorySelect.addEventListener('change', filterItems);
});

