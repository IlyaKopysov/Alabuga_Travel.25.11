document.addEventListener('DOMContentLoaded', async function () {
    const content = document.querySelector('.content');
    console.log(content);
    const itemsPerPage = 4;
    let currentPage = 0;
        const response = await fetch('https://673611ff5995834c8a954d48.mockapi.io/tasks');
        const data = await response.json();
        data.forEach(item => {
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
              </section>`;
        });
        items = Array.from(content.querySelectorAll('.card__pag'));
        totalPages = Math.ceil(items.length / itemsPerPage);
        showPage(currentPage);
        createPaginationButtons();

    function showPage(pageNumber) {
        const startIndex = pageNumber * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        items.forEach((item, index) => {
            if (index >= startIndex && index < endIndex) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    function createPaginationButtons() {
        const paginationContainer = document.createElement('div');
        paginationContainer.classList.add('pagination');

        for (let i = 0; i < totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i + 1;
            button.addEventListener('click', () => {
                currentPage = i;
                showPage(currentPage);
                updateActiveButton(button);
            });
            paginationContainer.appendChild(button);
        }
        content.parentNode.insertBefore(paginationContainer, content.nextSibling);
        updateActiveButton(paginationContainer.firstChild);
    }
    function updateActiveButton(activeButton) {
        const buttons = document.querySelectorAll('.pagination button');
        buttons.forEach(button => button.classList.remove('active'));
        activeButton.classList.add('active');
    }
});