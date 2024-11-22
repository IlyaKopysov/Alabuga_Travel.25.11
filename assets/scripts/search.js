document.addEventListener('DOMContentLoaded', async function () {
    const searchInput = document.getElementById('search-input');
    const searchList = document.getElementById('search-list');
    let items = [];
        const response = await fetch('https://673611ff5995834c8a954d48.mockapi.io/tasks');
        const data = await response.json();
        items = data;

        displayItems(items);
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredItems = items.filter(item => {
                return (
                    item.title.toLowerCase().includes(searchTerm) ||
                    item.text.toLowerCase().includes(searchTerm) ||
                    item.addres.toLowerCase().includes(searchTerm)
                );
            });
            displayItems(filteredItems);
        });
    function displayItems(itemsToDisplay) {
        searchList.innerHTML = '';
        itemsToDisplay.forEach(item => {
            const cardHTML = `
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
            searchList.innerHTML += cardHTML;
        });
    }
});
