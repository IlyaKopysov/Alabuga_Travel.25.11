document.addEventListener("DOMContentLoaded", async () => {
  const content = document.querySelector(".content");
  const itemsPerPage = 4;
  let currentPage = 1;
  let totalPages = 0;
  let mask = document.querySelector(".mask");

  async function fetchTasks(page) {
    const url = new URL("https://673611ff5995834c8a954d48.mockapi.io/tasks");
    url.searchParams.append("page", page);
    url.searchParams.append("limit", itemsPerPage);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
      return [];
    } finally {
    }
  }

  async function displayPage(pageNumber) {
    mask.classList.add('active');
    currentPage = pageNumber;
    const data = await fetchTasks(currentPage);

    content.innerHTML = "";

    if (data.length > 0) {
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
          </section>
        `;
      });
      mask.classList.remove('active');
    }
  }

  async function inicialize() {
    try {
      mask.classList.add('active');
      const allDataResponse = await fetch(
        "https://673611ff5995834c8a954d48.mockapi.io/tasks"
      );
      if (!allDataResponse.ok) {
        throw new Error(`HTTP error! status: ${allDataResponse.status}`);
      }
      const allData = await allDataResponse.json();
      totalItems = allData.length;
      totalPages = Math.ceil(totalItems / itemsPerPage);

      await displayPage(currentPage);
      createPagination(totalPages);
    } catch (error) {
      console.error("Ошибка при инициализации:", error);
    } finally {
      mask.classList.remove('active');
    }
  }

  function createPagination(totalPages) {
    const pagination = document.createElement("div");
    pagination.classList.add("pagination");

    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      button.addEventListener("click", async () => {
        await displayPage(i);
      });
      pagination.appendChild(button);
    }

    content.after(pagination);
  }

  inicialize();
});
