let currentSpirit = "";
let babyCache = {};

const drinkButtons = document.getElementsByClassName("spirit-button");
const drinksContainer = document.getElementById("drinks");

const fixButtonHeights = () => {
  const header = document.querySelector("header");
  const viewport = window.visualViewport;
  const buttonHeight =
    (viewport.height - header.offsetHeight) / drinkButtons.length;
    
  for (el of drinkButtons) {
    el.style.height = `${buttonHeight}px`;
  }
};

const toggleClass = (el, className) => {
  if (el.classList.contains(className)) el.classList.remove(className);
  else el.classList.add(className);
};

const createImgEl = (drink) => {
  const imgEl = document.createElement("img");
  imgEl.src = drink.strDrinkThumb + "/preview";
  imgEl.alt = drink.strDrink + " preview";
  imgEl.classList.add("drink-card-image");
  return imgEl;
};

const createTitleEl = (drinkName) => {
  const divEl = document.createElement("div");
  const titleEl = document.createTextNode(drinkName);
  divEl.classList.add("drink-card-title");
  divEl.appendChild(titleEl);
  return divEl;
};

const getDrinkQueryLink = (drinkName) => {
  let query = drinkName.replace(" ", "+");
  return `https://www.google.com/search?q=${query}+recipe`;
};

const createDrinkCard = (drink) => {
  const cardEl = document.createElement("a");
  cardEl.href = getDrinkQueryLink(drink.strDrink);
  cardEl.classList.add("drink-card");

  const imgEl = createImgEl(drink);
  cardEl.appendChild(imgEl);

  const titleEl = createTitleEl(drink.strDrink);
  cardEl.appendChild(titleEl);

  return cardEl;
};

const renderDrinksDescription = (totalDrinks) => {
  const el = document.createElement("p");
  const text = document.createTextNode(`SHOWING ${totalDrinks} ${currentSpirit.toLocaleUpperCase()} DRINKS`);
  el.appendChild(text);
  el.classList.add("drinks-container-description");
  return el;
};

const renderDrinks = (drinks) => {
  toggleClass(drinksContainer, "hidden");

  let descriptionEl = renderDrinksDescription(drinks.length);
  drinksContainer.append(descriptionEl);

  drinks.forEach((drink) => {
    const drinkCard = createDrinkCard(drink);
    drinksContainer.appendChild(drinkCard);
  });
};

const clearDrinks = () => {
  drinksContainer.innerHTML = "";
  toggleClass(drinksContainer, "hidden");
};

const showActiveButton = (buttonId) => {
  for (const el of drinkButtons) {
    if (el.id !== buttonId) {
      toggleClass(el, "spirit-button-hidden");
    }
  }
};

const handleClick = async (event) => {
  if (event.target.classList.contains("spirit-button")) {
    event.preventDefault();

    if (currentSpirit === event.target.id) {
      showActiveButton(currentSpirit);
      clearDrinks();
      currentSpirit = "";
      return;
    }

    currentSpirit = event.target.id;
    const apiEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${currentSpirit}`;

    if (currentSpirit in babyCache) {
      showActiveButton(currentSpirit);
      clearDrinks();
      renderDrinks(babyCache[currentSpirit]);
      return;
    }

    try {
      const response = await fetch(apiEndpoint);
      const jsonData = await response.json();

      showActiveButton(currentSpirit);
      clearDrinks();
      renderDrinks(jsonData.drinks);

      babyCache[currentSpirit] = jsonData.drinks;
    } catch (error) {
      console.log(error);
    }
  }
};

document.addEventListener("click", handleClick);

window.visualViewport.addEventListener("resize", function () {
  fixButtonHeights();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("../serviceWorker.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}

fixButtonHeights();
