async function loader(id) {
  const container = document.getElementById("container");
  container.querySelector("main").innerHTML = "";

  //active remove
  const links = document.querySelectorAll(".nav-links li a");
  links.forEach((link) => {
    link.addEventListener("click", function () {
      links.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

  let content = "";

  switch (id) {
    case 1:
      content = showHome();
      break;
    case 2:
      content = await showUs();
      break;
    case 3:
      content = await showGallery();
      break;
    case 4:
      content = showReserve();
      break;
    default:
      content = showHome();
      break;
  }

  container.querySelector("main").innerHTML = content;
}

function showHome() {
  return `<section class="hero">
        <div class="hero-content">
          <h1 class="headings">PITBULL <br />HOTEL</h1>
          <button onclick="loader(2)" class="button">NASZA FIRMA</button>
        </div>
        <div class="hero-img">
          <img class="" src="Design/Photos/pitbull.png" alt="szef1" />
        </div>
      </section>

      <section class="boss">
        <div class="boss-img">
          <img src="Design/Photos/pitbull2.png" alt="szef2" />
        </div>

        <div class="boss-content">
          <h2 class="subheadings">GŁOWA NASZEJ FIRMY</h2>
          <p class="text">
            Pitbull, znany na całym świecie jako Mr. Worldwide, to nie tylko
            ikona muzyki, ale również wizjoner w świecie biznesu. Jego unikalna
            energia, pasja i poświęcenie stanowiły inspirację do stworzenia
            Pitbull Hotel – miejsca, które łączy luksus z latynoskim rytmem. Z
            każdym krokiem, Pitbull stawia na jakość, innowację i niezapomniane
            doświadczenia dla swoich gości. Witamy w miejscu, gdzie każdy czuje
            się wyjątkowo!
          </p>
        </div>
      </section>`;
}

async function showGallery() {
  const galleryData = await fetch("Jsons/gallery.json")
    .then((response) => response.json())
    .catch((error) => {
      console.error("Błąd ładowania galerii", error);
      return [];
    });

  let content = `
  <section class="gallery" id="gallery">
    <h1 class="headings">Galeria zdjęć</h1>
    <div class="photos" id="photos">
  `;

  galleryData.forEach((item) => {
    content += `
    <div class="photo">
      <a href="${item.src}" data-lightbox="roadtrip">
        <img src="${item.src}" alt="${item.alt}">
      </a>
    </div>
    `;
  });

  content += `</div></section>`;
  return content;
}

async function showUs() {
  const usData = await fetch("Jsons/us.json")
    .then((response) => response.json())
    .catch((error) => {
      console.error("Błąd ładowania danych o firmie", error);
      return [];
    });

  let content = `<section class="us" id="us">
                  <h1 class="headings">Co nas wyróżnia?</h1>
                  <div class="cards">`;

  usData.forEach((item) => {
    content += `
      <div class="card">
        <h2 class="subheadings">${item.title}</h2>
        <p class="text">${item.message}</p>
      </div>
    `;
  });

  content += `</div></section>`;
  content += await showOpinions();

  return content;
}

async function showOpinions() {
  const opinionsData = await fetch("Jsons/opinions.json")
    .then((response) => response.json())
    .catch((error) => {
      console.error("Błąd ładowania danych o opiniach", error);
      return [];
    });

  let tresc = `<section class="com" id="com">
                <h1 class="headings">Poznaj opinie <br/> naszych klientów!</h1>
                <div class="opinions">`;

  opinionsData.forEach((opinion) => {
    tresc += `
      <div class="opinion">
        <p class="client subheadings">${opinion.client}</p>
        <p class="message text">${opinion.message}</p>
        <hr/>
        <p class="rating text">${opinion.rating}</p>
      </div>
    `;
  });

  tresc += `</div></section>`;
  return tresc;
}

function showReserve() {
  const showButton = `<input type="button" name="pokaz" class="button" id="pokaz" value="Pokaż zapisane dane" onclick="showFormData()"/>`;

  const sentButton = `<input
                type="button"
                name="wyslij"
                value="Wyślij"
                class="button"
                onclick="checkForm()"
              />`;

  var tresc = `<section class="formularz" id="reserve">
        <h1 class="headings">Zarezerwuj noc</h1>
        <form id="form">
          <div class="wrapper">
            <div class="left-column">
              <div class="segment">
                <label for="name" class="subheadings">Imię</label>
                <input type="text" id="name" name="name" placeholder="Imię" />
                <p><span class="error"></span></p>
              </div>
              <div class="segment">
                <label for="number" class="subheadings">Numer</label>
                <input type="number" id="number" placeholder="Numer" />
                <p><span class="error"></span></p>
              </div>
              <div class="segment">
                <label for="email" class="subheadings">Email</label>
                <input type="email" id="email" placeholder="Email" />
                <p><span class="error"></span></p>
              </div>
              <div class="segment">
                <label class="subheadings">Płeć</label>
                <p class="text">
                  Mężczyzna
                  <input type="radio" id="M" name="sex" class="sex" value="M" />
                </p>
                <p class="text">
                  Kobieta
                  <input type="radio" id="K" name="sex" class="sex" value="K" />
                </p>
                <p><span class="error"></span></p>
              </div>
            </div>

            <div class="right-column">
              <div class="segment">
                <label class="subheadings">Dodatkowe usługi</label>
                <p class="text">
                  Dodatkowe łóżko
                  <input
                    type="checkbox"
                    class="check"
                    value="Dodatkowe lozko"
                  />
                </p>
                <p class="text">
                  Wifi premium
                  <input
                    type="checkbox"
                    checked=""
                    class="check text"
                    value="Wifi premium"
                  />
                </p>
                <p class="text">
                  Śniadanie w cenie
                  <input
                    type="checkbox"
                    class="check text"
                    value="Sniadanie w cenie"
                  />
                </p>
                <p><span class="error"></span></p>
              </div>
              <div class="segment">
                <label for="location" class="subheadings">Lokalizacja</label>
                <select class="inpt" id="location">
                  <option class="location" value="Marseille">Marseille</option>
                  <option class="location" value="NYC">NYC</option>
                  <option class="location" value="LA">LA</option>
                </select>
              </div>
              <div class="segment">
                <label for="add" class="subheadings"
                  >Dodatkowe informacje</label
                >
                <textarea
                  id="add"
                  cols="30"
                  rows="10"
                  style="resize: none"
                ></textarea>
              </div>
            </div>
          </div>`;
  const savedData = JSON.parse(localStorage.getItem("formData"));

  if (!savedData) {
    return (tresc += `<div class="buttons" id="buttons">
                ${sentButton}
              </div>
            </form>
          </section>`);
  }
  return (tresc += `<div class="buttons" id="buttons">
                ${sentButton} ${showButton}
              </div>
            </form>
          </section>`);
}
