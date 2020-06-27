let inputTitle = document.querySelector("#inputField input");
let inputText = document.querySelector("#inputField textarea");
let buttonElement = document.querySelector("#inputField button");
let cardElement = document.querySelector("#scrapsField");

let cards = JSON.parse(localStorage.getItem("card_list")) || [];

function renderCards() {
  cardElement.innerHTML = "";

  for (const item of cards) {
    let card = document.createElement("div");
    card.setAttribute("class", "card text-white bg-dark m-2");

    let cardHeader = document.createElement("div");
    cardHeader.setAttribute("class", "card-header");

    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    let cardContent = document.createElement("p");
    cardContent.setAttribute("class", "card-text");

    let cardTitle = document.createTextNode(item.title);
    let cardText = document.createTextNode(item.text);

    cardElement.appendChild(card);
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    cardBody.appendChild(cardContent);

    cardContent.appendChild(cardText);
    cardHeader.appendChild(cardTitle);

    let nameCard = document.createElement("li");
    let nameText = document.createTextNode(name);
    let buttonElement = document.createElement("button");

    let position = cards.indexOf(item);
    buttonElement.setAttribute("onclick", `deleteCards(${position})`);

    let buttonText = document.createTextNode("Excluir");

    buttonElement.appendChild(buttonText);

    nameCard.appendChild(nameText);
    nameCard.appendChild(buttonElement);
    cardElement.appendChild(nameCard);
  }
}
renderCards();

function createCard() {
  let titleText = inputTitle.value;
  let text = inputText.value;
  if (validaDados(titleText, text)) {
    let card = {
      title: titleText,
      text: text,
    };
    cards.push(card);
    inputTitle.value = "";
    inputText.value = "";

    renderCards();
    saveInStorage();
  }
}

function validaDados(title, text) {
  if (title.length == 0) return alert(`Preencha todos os campos`);
  if (text.length == 0) return alert(`Preencha todos os campos`);
  return true;
}

buttonElement.onclick = createCard;

function deleteCards(position) {
  cards.splice(position, 1);

  renderCards();
}

function saveInStorage() {
  localStorage.setItem("card_list", JSON.stringify(cards));
}
