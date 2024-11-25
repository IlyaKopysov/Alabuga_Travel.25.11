document.addEventListener('DOMContentLoaded', async function () {
    const content = document.querySelector('.drop__search');
    const categorySelect = document.getElementById('category__select');
    let items = [];

    const response = await fetch('https://673611ff5995834c8a954d48.mockapi.io/tasks');
    const data = await response.json();
    items = data;
    displayItems(items.slice(0, 4));

    function displayItems(itemsToDisplay) {
        content.innerHTML = '';
        itemsToDisplay.forEach(item => {
            content.innerHTML += `
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
        items = Array.from(content.querySelectorAll('.card__pag'));
  });