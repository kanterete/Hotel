let sent = 0;

const patternCheck = (element, value) => {
  const patterns = {
    email:
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+(?<!\.\.)(?<=\S)\.(?!\.)[a-zA-Z]{2,}$/,
    name: /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+(?:\s[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+)?$/,
    number: /^\d{9}$/,
  };

  return patterns[element].test(value);
};

function checkForm() {
  sent = 0;
  let valid = true;

  //inputy
  var name = document.getElementById("name");
  var email = document.getElementById("email");
  var number = document.getElementById("number");
  var sexM = document.getElementById("M");
  var sexK = document.getElementById("K");
  var checkInput = document.getElementsByClassName("check");

  //error divy
  var nameError = name.nextElementSibling.querySelector(".error");
  var emailError = email.nextElementSibling.querySelector(".error");
  var numberError = number.nextElementSibling.querySelector(".error");
  var sexError = sexM.parentElement.parentElement.querySelector(".error");
  var checkError =
    checkInput[0].parentElement.parentElement.querySelector(".error");

  //check
  if (!patternCheck("name", name.value)) {
    nameError.innerText = "Podaj poprawne imię";
    valid = false;
  } else {
    nameError.innerText = "";
  }

  if (!patternCheck("email", email.value)) {
    emailError.innerText = "Podaj poprawny email";
    valid = false;
  } else {
    emailError.innerText = "";
  }

  if (!patternCheck("number", number.value)) {
    numberError.innerText = "Numer musi mieć 9 cyfr";
    valid = false;
  } else {
    numberError.innerText = "";
  }

  const sexChecked = sexM.checked || sexK.checked;

  if (!sexChecked) {
    sexError.innerText = "Wybierz płeć";
    valid = false;
  } else {
    sexError.innerText = "";
  }

  var checkChecked = Array.from(checkInput).some(
    (checkbox) => checkbox.checked
  );
  if (!checkChecked) {
    checkError.innerText = "Wybierz co najmniej jedną opcję";
    valid = false;
  } else {
    checkError.innerText = "";
  }

  if (valid) {
    saveForm();
  }
}

function saveForm() {
  const form = document.getElementById("form");
  const formData = {
    name: document.getElementById("name").value,
    number: document.getElementById("number").value,
    email: document.getElementById("email").value,
    sex: document.getElementById("M").checked
      ? "M"
      : document.getElementById("K").checked
      ? "K"
      : "",
    services: Array.from(document.querySelectorAll(".check:checked")).map(
      (checkbox) => checkbox.value
    ),
    location: document.getElementById("location").value,
    additional: document.getElementById("add").value,
  };

  localStorage.setItem("formData", JSON.stringify(formData));
  sent = 1;

  form.reset();

  const buttonsDiv = document.getElementById("buttons");
  const showButton = `<input type="button" name="pokaz" class="button" id="pokaz" value="Pokaż zapisane dane" onclick="showFormData()"/>`;
  const sentInfo = '<h2 class="sub green">Wysłano pomyślnie formularz</h2>';
  buttonsDiv.innerHTML = sentInfo + showButton;
}

function showFormData() {
  const buttonsDiv = document.getElementById("buttons");
  buttonsDiv.innerHTML = "";

  const savedData = JSON.parse(localStorage.getItem("formData"));

  document.getElementById("name").value = savedData.name;
  document.getElementById("number").value = savedData.number;
  document.getElementById("email").value = savedData.email;
  document.getElementById("location").value = savedData.location;
  document.getElementById("add").value = savedData.additional || "";

  document.getElementById("M").checked = savedData.sex === "M";
  document.getElementById("K").checked = savedData.sex === "K";

  document.querySelectorAll(".check").forEach((checkbox) => {
    checkbox.checked = savedData.services.includes(checkbox.value);
  });

  const deleteButton = `<input type="button" id="deleteBtn" class="button" value="Usuń dane" onclick="deleteFormData()"/>`;
  const editButton = `<input type="button" name="zapisz dane" value="Nadpisz dane" class="button" onclick="checkForm()"/>`;

  buttonsDiv.innerHTML = deleteButton + editButton;
}

function deleteFormData() {
  localStorage.removeItem("formData");
  document.getElementById("form").reset();
  const buttonsDiv = document.getElementById("buttons");

  const deleteInfo =
    '<h2 class="sub red">Usunięto zapisane dane formularza</h2>';
  const sentNew = `<input
                type="button"
                name="wyslij"
                value="Wyślij nowe dane"
                class="button"
                onclick="checkForm()"
              />`;
  buttonsDiv.innerHTML = deleteInfo + sentNew;
}
