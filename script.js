const tempDrinks = {
  drinks: [
    {
      strDrink: "Amaretto Shake",
      strDrinkThumb:
        "https://www.thecocktaildb.com/images/media/drink/xk79al1493069655.jpg",
      idDrink: "15194",
    },
    {
      strDrink: "Bermuda Highball",
      strDrinkThumb:
        "https://www.thecocktaildb.com/images/media/drink/qrvtww1441206528.jpg",
      idDrink: "11084",
    },
    {
      strDrink: "Between The Sheets",
      strDrinkThumb:
        "https://www.thecocktaildb.com/images/media/drink/of1rj41504348346.jpg",
      idDrink: "17184",
    },
    {
      strDrink: "Boston Sidecar",
      strDrinkThumb:
        "https://www.thecocktaildb.com/images/media/drink/qzs5d11504365962.jpg",
      idDrink: "11128",
    },
    {
      strDrink: "Brandy Alexander",
      strDrinkThumb:
        "https://www.thecocktaildb.com/images/media/drink/mlyk1i1606772340.jpg",
      idDrink: "11016",
    },
    {
      strDrink: "Brandy Flip",
      strDrinkThumb:
        "https://www.thecocktaildb.com/images/media/drink/6ty09d1504366461.jpg",
      idDrink: "11164",
    },
    {
      strDrink: "Brandy Sour",
      strDrinkThumb:
        "https://www.thecocktaildb.com/images/media/drink/b1bxgq1582484872.jpg",
      idDrink: "11170",
    },
    {
      strDrink: "City Slicker",
      strDrinkThumb:
        "https://www.thecocktaildb.com/images/media/drink/dazdlg1504366949.jpg",
      idDrink: "11251",
    },
    {
      strDrink: "English Highball",
      strDrinkThumb:
        "https://www.thecocktaildb.com/images/media/drink/dhvr7d1504519752.jpg",
      idDrink: "11338",
    },
    {
      strDrink: "Gentleman's Club",
      strDrinkThumb:
        "https://www.thecocktaildb.com/images/media/drink/k2r7wv1582481454.jpg",
      idDrink: "11396",
    },
    {
      strDrink: "Horse's Neck",
      strDrinkThumb:
        "https://www.thecocktaildb.com/images/media/drink/006k4e1504370092.jpg",
      idDrink: "17202",
    },
    {
      strDrink: "Kioki Coffee",
      strDrinkThumb:
        "https://www.thecocktaildb.com/images/media/drink/uppqty1441247374.jpg",
      idDrink: "16951",
    },
    {
      strDrink: "Mississippi Planters Punch",
      strDrinkThumb:
        "https://www.thecocktaildb.com/images/media/drink/urpyqs1439907531.jpg",
      idDrink: "11786",
    },
    {
      strDrink: "Port Wine Cocktail",
      strDrinkThumb:
        "https://www.thecocktaildb.com/images/media/drink/qruprq1441553976.jpg",
      idDrink: "11963",
    },
    {
      strDrink: "Porto flip",
      strDrinkThumb:
        "https://www.thecocktaildb.com/images/media/drink/64x5j41504351518.jpg",
      idDrink: "17192",
    },
    {
      strDrink: "Quaker's Cocktail",
      strDrinkThumb:
        "https://www.thecocktaildb.com/images/media/drink/yrqppx1478962314.jpg",
      idDrink: "11983",
    },
    {
      strDrink: "Scooter",
      strDrinkThumb:
        "https://www.thecocktaildb.com/images/media/drink/twuptu1483388307.jpg",
      idDrink: "12130",
    },
    {
      strDrink: "Scotch Cobbler",
      strDrinkThumb:
        "https://www.thecocktaildb.com/images/media/drink/1q7coh1504736227.jpg",
      idDrink: "12138",
    },
    {
      strDrink: "Sidecar Cocktail",
      strDrinkThumb:
        "https://www.thecocktaildb.com/images/media/drink/ewjxui1504820428.jpg",
      idDrink: "12198",
    },
    {
      strDrink: "Sol Y Sombra",
      strDrinkThumb:
        "https://www.thecocktaildb.com/images/media/drink/3gz2vw1503425983.jpg",
      idDrink: "12256",
    },
    {
      strDrink: "Stinger",
      strDrinkThumb:
        "https://www.thecocktaildb.com/images/media/drink/2ahv791504352433.jpg",
      idDrink: "17193",
    },
    {
      strDrink: "Victor",
      strDrinkThumb:
        "https://www.thecocktaildb.com/images/media/drink/voapgc1492976416.jpg",
      idDrink: "12450",
    },
  ],
};

let currentSpirit = "";
const drinkButtons = document.getElementsByClassName("spirit-button");
const drinksContainer = document.getElementById("drinks");

const toggleClass = (el, className) => {
  if (el.classList.contains(className)) el.classList.remove(className);
  else el.classList.add(className);
};

const createImgEl = (drink) => {
  const imgEl = document.createElement("img");
  imgEl.src = drink.strDrinkThumb + "/preview";
  imgEl.alt = drink.strDrink + " preview";
  imgEl.classList.add("drink-card-image");
  imgEl.classList.add("animate-fadein");
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
  const text = document.createTextNode(`SHOWING ${totalDrinks} DRINKS`);
  el.appendChild(text);
  el.classList.add("drinks-container-description");
  return el;
};

const renderDrinks = (drinks) => {
  toggleClass(drinksContainer, "hidden");

  let descriptionEl = renderDrinksDescription(drinks.length)
  drinksContainer.append(descriptionEl)

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
      toggleClass(el, "hidden");
    }
  }
};

const handleClick = async (event) => {
  if (event.target.classList.contains("spirit-button")) {
    event.preventDefault();

    if (currentSpirit === event.target.id) {
      showActiveButton(currentSpirit);
      clearDrinks();
      currentSpirit = ""
      return;
    }

    currentSpirit = event.target.id;
    const apiEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${currentSpirit}`;

    try {
      const response = await fetch(apiEndpoint)
      const jsonData = await response.json();
      console.log(jsonData);

      showActiveButton(currentSpirit);
      clearDrinks();
      renderDrinks(jsonData.drinks);
    } catch (error) {
      console.log(error);
    }
  }
};

document.addEventListener("click", handleClick);
