const gameBox = document.querySelector(".game-box");
const stars = document.querySelector(".stars");
const movesDiv = document.querySelector(".moves");

const cardIcons = [
  "twitter",
  "twitter",
  "facebook",
  "facebook",
  "internet-explorer",
  "internet-explorer",
  "safari",
  "safari",
  "whatsapp",
  "whatsapp",
  "linkedin",
  "linkedin",
  "google",
  "google",
  "pinterest-p",
  "pinterest-p",
];

const shuffledCardIcons = shuffleArray(cardIcons);

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

const openData = {
  isAlreadyOpened: false,
  previousOpenedCardName: -1,
  previousCardDOM: null,
  alreadySelected: [],
  moves: 0,
};

function add(e) {
  // Get clicked Card and cardName
  const card = e.target;
  const cardName = e.target.dataset.name;

  //If clicking a already selected Card
  const isDone = openData.alreadySelected.some(
    (cardName_) => cardName_ === cardName
  );

  //Already Selected or First Selected Card
  if (isDone === true || openData.previousCardDOM === card) {
    return;
  }

  //Show Card Icon
  card.className = "game-card front";

  //If selected the First Card
  if (openData.isAlreadyOpened === false) {
    //Entry the Clicked Card in openData
    setOpenData(cardName, true, card);
  } else {
    // Update move
    openData.moves++;

    updateStars();

    movesDiv.innerHTML = openData.moves;

    // If first CardName is equal to clicked Cardname
    if (openData.previousOpenedCardName === cardName) {
      //Card Matched so make them Selected Card
      openData.previousCardDOM.className = "game-card selected-card";
      card.className = "game-card selected-card";

      //   Push matched cards
      openData.alreadySelected.push(cardName);
      if (openData.alreadySelected.length === 8) {
        winnerMsg();
      }

      // Reset
      setOpenData("", false, null);
    } else {
      // Card not matched
      card.className = "game-card not-matched animated infinite wobble";
      openData.previousCardDOM.className =
        "game-card not-matched animated infinite wobble";
      setTimeout(() => {
        closeAllCards();
      }, 500);
    }
  }
}

const refershGame = () => {
  swal({
    allowEscapeKey: false,
    allowOutsideClick: false,
    title: "Are you sure?",
    text: "Your progress will be Lost!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#9BCB3C",
    cancelButtonColor: "#EE0E51",
    confirmButtonText: "Yes, Restart Game!",
  }).then(function (isConfirm) {
    if (isConfirm) {
      window.location.reload();
    }
  });
};

const winnerMsg = () => {
  swal({
    allowEscapeKey: false,
    allowOutsideClick: false,
    title: "Congratulations! 🎉",
    text: `You have completed game in ${openData.moves} moves`,
    type: "success",
    showCancelButton: false,
    confirmButtonColor: "#9BCB3C",
    cancelButtonColor: "#EE0E51",
    confirmButtonText: "Start, another game!",
  }).then(function (isConfirm) {
    if (isConfirm) {
      window.location.reload();
    }
  });
};

const setOpenData = (
  previousOpenedCardName,
  isAlreadyOpened,
  previousCardDOM
) => {
  //   Reset
  openData.previousOpenedCardName = previousOpenedCardName;
  openData.isAlreadyOpened = isAlreadyOpened;
  openData.previousCardDOM = previousCardDOM;
};

const updateStars = () => {
  if (openData.moves > 10) {
    stars.children[2].className = "fa fa-star-o";
  }

  if (openData.moves > 20) {
    stars.children[1].className = "fa fa-star-o";
  }

  if (openData.moves > 30) {
    stars.children[0].className = "fa fa-star-o";
  }
};

function closeAllCards() {
  // Remove All the front, back classes Except for the selected cards
  Array.from(gameBox.children).map((child) => {
    const isSelected = openData.alreadySelected.some(
      (cardName) => cardName === child.dataset.name
    );

    if (isSelected === false) {
      child.className = "game-card back";
    }
  });
  //   Reset
  setOpenData("", false, null);
}

const addGameCard = () => {
  for (let i = 0; i < 16; i++) {
    gameBox.innerHTML += `
            <div class="game-card back"  data-name=${shuffledCardIcons[i]} onclick="add(event)"><i class="fa fa-${shuffledCardIcons[i]} card-icon"></i></div>
        `.trim();
  }
};

addGameCard();
