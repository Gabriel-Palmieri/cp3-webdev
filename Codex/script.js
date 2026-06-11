const CORRECT_USER = "aluno";
const CORRECT_PASSWORD = "fiap2025";

let games = ["The Legend of Zelda", "Minecraft", "God of War"];

let loginScreen;
let gamesScreen;
let loginForm;
let gameForm;
let usernameInput;
let passwordInput;
let loginMessage;
let gameInput;
let gameMessage;
let gamesList;
let gameCount;
let addEndButton;
let addStartButton;
let logoutButton;

function selectElements() {
  loginScreen = document.getElementById("login-screen");
  gamesScreen = document.getElementById("games-screen");
  loginForm = document.getElementById("login-form");
  gameForm = document.getElementById("game-form");
  usernameInput = document.getElementById("username");
  passwordInput = document.getElementById("password");
  loginMessage = document.getElementById("login-message");
  gameInput = document.getElementById("game-input");
  gameMessage = document.getElementById("game-message");
  gamesList = document.getElementById("games-list");
  gameCount = document.getElementById("game-count");
  addEndButton = document.getElementById("add-end-button");
  addStartButton = document.getElementById("add-start-button");
  logoutButton = document.getElementById("logout-button");
}

function initializeApp() {
  selectElements();
  bindEvents();
  showLoginScreen();
  renderGames();
}

function bindEvents() {
  loginForm.addEventListener("submit", handleLogin);
  gameForm.addEventListener("submit", handleGameFormSubmit);
  addEndButton.addEventListener("click", addGameToEnd);
  addStartButton.addEventListener("click", addGameToStart);
  logoutButton.addEventListener("click", handleLogout);
}

function handleGameFormSubmit(event) {
  event.preventDefault();
  addGameToEnd();
}

function handleLogin(event) {
  event.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  clearMessage(loginMessage);

  if (username === "" || password === "") {
    showMessage(loginMessage, "Preencha usuario e senha para continuar.");
    return;
  }

  if (username !== CORRECT_USER || password !== CORRECT_PASSWORD) {
    showMessage(loginMessage, "Usuario ou senha incorretos.");
    return;
  }

  showGamesScreen();
}

function handleLogout() {
  loginForm.reset();
  clearMessage(loginMessage);
  clearMessage(gameMessage);
  showLoginScreen();
}

function showLoginScreen() {
  loginScreen.classList.remove("hidden");
  gamesScreen.classList.add("hidden");
  usernameInput.focus();
}

function showGamesScreen() {
  loginScreen.classList.add("hidden");
  gamesScreen.classList.remove("hidden");
  gameInput.focus();
}

function getTypedGame() {
  return gameInput.value.trim();
}

function validateGameName(gameName) {
  if (gameName === "") {
    showMessage(gameMessage, "Digite o nome de um jogo antes de adicionar.");
    return false;
  }

  clearMessage(gameMessage);
  return true;
}

function addGameToEnd() {
  const gameName = getTypedGame();

  if (!validateGameName(gameName)) {
    return;
  }

  games.push(gameName);
  resetGameForm();
  renderGames();
}

function addGameToStart() {
  const gameName = getTypedGame();

  if (!validateGameName(gameName)) {
    return;
  }

  games.unshift(gameName);
  resetGameForm();
  renderGames();
}

function editGame(index) {
  const currentGame = games[index];
  const newGame = prompt("Edite o nome do jogo:", currentGame);

  if (newGame === null) {
    return;
  }

  const trimmedGame = newGame.trim();

  if (trimmedGame === "") {
    showMessage(gameMessage, "O jogo nao foi alterado porque o nome ficou vazio.");
    return;
  }

  games[index] = trimmedGame;
  clearMessage(gameMessage);
  renderGames();
}

function removeGame(index) {
  games.splice(index, 1);
  clearMessage(gameMessage);
  renderGames();
}

function renderGames() {
  gamesList.innerHTML = "";
  gameCount.textContent = formatGameCount();

  games.forEach(function renderGameItem(game, index) {
    const item = document.createElement("li");
    const position = document.createElement("span");
    const name = document.createElement("span");
    const editButton = document.createElement("button");
    const removeButton = document.createElement("button");

    item.className = "game-item";
    position.className = "game-index";
    name.className = "game-name";
    removeButton.className = "danger-button";

    position.textContent = "#" + (index + 1);
    name.textContent = game;
    editButton.textContent = "Editar";
    removeButton.textContent = "Remover";

    editButton.type = "button";
    removeButton.type = "button";

    editButton.addEventListener("click", function handleEditClick() {
      editGame(index);
    });

    removeButton.addEventListener("click", function handleRemoveClick() {
      removeGame(index);
    });

    item.appendChild(position);
    item.appendChild(name);
    item.appendChild(editButton);
    item.appendChild(removeButton);
    gamesList.appendChild(item);
  });
}

function formatGameCount() {
  if (games.length === 1) {
    return "1 jogo";
  }

  return games.length + " jogos";
}

function resetGameForm() {
  gameInput.value = "";
  gameInput.focus();
}

function showMessage(element, text) {
  element.textContent = text;
}

function clearMessage(element) {
  element.textContent = "";
}

initializeApp();
