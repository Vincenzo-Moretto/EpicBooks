const url = "https://striveschool-api.herokuapp.com/books";

window.onload = () => {
  fetchBooks();
};

const fetchBooks = () => {
  fetch(url)
    .then((raw) => raw.json())
    .then((res) => {
      let cont = document.querySelector(".album .row");

      cont.innerHTML = res
        .map((book) => {
          return ` <div class="col col-2">
          <div class="card mb-4 shadow-sm" id="book_${book.asin}">
            <img src="${book.img}" />
        
            <div class="card-body">
              <p class="font-weight-bold text-truncate book-title">${book.title}</p>
              <div class="d-flex justify-content-between align-items-center">
                <button class="btn btn-primary" onclick="addToCart('${book.title}', '${book.price}', '${book.asin}')">
                 ${book.price} €
                </button>
                <button class="btn btn-secondary" onclick="changeBook(event)">Nascondi</button>
              </div>
            </div>
          </div>
        </div>`;
        })
        .join("");
    })
    .catch((err) => console.error(err));
};

const addToCart = (title, price, asin) => {
  const book = document.querySelector("#book_" + asin);
  book.style.border = "2px red solid";
  const cart = document.querySelector(".list-group");
  cart.innerHTML += `
  <li class="list-group-item">${title}, ${price} <button class='btn btn-danger' onclick='removeFromCart(event, "${asin}", "${price}")'> X </button></li>
  
  `;
  const totale = document.querySelector("h1 span");
  totale.innerText = (Number(totale.innerText) + Number(price)).toFixed(2);
  const span = document.querySelector(".badge");
  span.innerHTML = `${cart.childElementCount}`;
};

const searchBook = (ev) => {
  let query = ev.target.value;
  let allTitles = document.querySelectorAll(".book-title");
  console.log(query, allTitles[0].innerText.toLowerCase().includes(query.toLowerCase()));
  allTitles.forEach((title) => {
    const currCard = title.parentElement.parentElement.parentElement;
    if (!title.innerText.toLowerCase().includes(query.toLowerCase())) {
      currCard.style.display = "none";
    } else {
      currCard.style.display = "block";
    }
  });
};

const removeFromCart = (event, asin, price) => {
  event.target.closest("li").remove();
  const totale = document.querySelector("h1 span");
  totale.innerText = (Number(totale.innerText) - Number(price)).toFixed(2);
  const book = document.querySelector("#book_" + asin);
  book.style.border = "none";
  const cart = document.querySelector(".list-group");
  const span = document.querySelector(".badge");
  span.innerHTML = `${cart.childElementCount}`;
};

const emptyCart = () => {
  document.querySelector(".list-group").innerHTML = "";
  document.querySelectorAll(".card").forEach((card) => (card.style.border = "none"));
  const totale = document.querySelector("h1 span");
  totale.innerText = "0";
  const cart = document.querySelector(".list-group");
  const span = document.querySelector(".badge");
  span.innerHTML = `${cart.childElementCount}`;
};

const changeBook = (event) => {
  event.target.parentElement.parentElement.parentElement.parentElement.remove();
};

const scroll = () => {
  let scrollY = window.scrollY;
  console.log(scrollY);
  const nav = document.querySelector(".navbar");
  if (scrollY > 200) {
    nav.classList.add("nav");
  } else {
    nav.classList.remove("nav");
  }
};
