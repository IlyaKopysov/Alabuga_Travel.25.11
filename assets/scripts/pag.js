document.addEventListener("DOMContentLoaded", async () => {
  const content = document.querySelector(".content");
  const itemsPerPage = 4;
  let currentPage = 0;
  let items = [];
  let mask = document.querySelector(".mask");

  const response = await fetch("https://673611ff5995834c8a954d48.mockapi.io/tasks");
  const data = await response.json();
  data.forEach((item) => {
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
  mask.style.display = "none";
  items = Array.from(content.querySelectorAll(".card__pag"));
  totalPages = Math.ceil(items.length / itemsPerPage);

  showPage(currentPage);
  createPagination(totalPages);

  function showPage(pageNumber) {
    const startIndex = pageNumber * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    items.forEach((item, index) => {
      if (index >= startIndex && index < endIndex) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }
  function createPagination(totalPages) {
    const pagination = document.createElement("div");
    pagination.classList.add("pagination");

    for (let i = 0; i < totalPages; i++) {
      const button = document.createElement("button");
      button.textContent = i + 1;
      button.addEventListener("click", () => {
        currentPage = i;
        showPage(currentPage);
      });
      pagination.appendChild(button);
}
    content.after(pagination);
  }
});
