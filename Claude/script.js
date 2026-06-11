/* ==============================================
   GAMEVAULT — script.js
   Sistema de cadastro de jogos favoritos
   ============================================== */

/* --------------------------------------------
   CREDENCIAIS
   -------------------------------------------- */
const USUARIO_CORRETO = "aluno";
const SENHA_CORRETA   = "fiap2025";

/* --------------------------------------------
   ESTADO DA APLICAÇÃO
   -------------------------------------------- */
let jogos = [
  "The Legend of Zelda: Breath of the Wild",
  "Red Dead Redemption 2",
  "Hollow Knight",
];

/* --------------------------------------------
   SELEÇÃO DE ELEMENTOS
   -------------------------------------------- */
// Telas
const telaLogin  = document.getElementById("tela-login");
const telaLista  = document.getElementById("tela-lista");

// Login
const inputUsuario = document.getElementById("input-usuario");
const inputSenha   = document.getElementById("input-senha");
const btnLogin     = document.getElementById("btn-login");
const erroLogin    = document.getElementById("erro-login");

// Lista
const inputJogo    = document.getElementById("input-jogo");
const btnAddFim    = document.getElementById("btn-add-fim");
const btnAddInicio = document.getElementById("btn-add-inicio");
const erroJogo     = document.getElementById("erro-jogo");
const listaJogos   = document.getElementById("lista-jogos");
const contador     = document.getElementById("contador");
const btnLogout    = document.getElementById("btn-logout");

/* --------------------------------------------
   FUNÇÕES DE LOGIN
   -------------------------------------------- */
function mostrarErroLogin(mensagem) {
  erroLogin.textContent = mensagem;
}

function limparErroLogin() {
  erroLogin.textContent = "";
}

function fazerLogin() {
  const usuario = inputUsuario.value.trim();
  const senha   = inputSenha.value.trim();

  limparErroLogin();

  if (usuario === "" || senha === "") {
    mostrarErroLogin("Preencha o usuário e a senha.");
    return;
  }

  if (usuario !== USUARIO_CORRETO || senha !== SENHA_CORRETA) {
    mostrarErroLogin("Usuário ou senha incorretos.");
    inputSenha.value = "";
    inputSenha.focus();
    return;
  }

  abrirTelaLista();
}

function fazerLogout() {
  inputUsuario.value = "";
  inputSenha.value   = "";
  limparErroLogin();
  telaLista.classList.add("hidden");
  telaLogin.classList.remove("hidden");
  inputUsuario.focus();
}

/* --------------------------------------------
   FUNÇÕES DE NAVEGAÇÃO ENTRE TELAS
   -------------------------------------------- */
function abrirTelaLista() {
  telaLogin.classList.add("hidden");
  telaLista.classList.remove("hidden");
  renderizarLista();
  inputJogo.focus();
}

/* --------------------------------------------
   FUNÇÕES DE VALIDAÇÃO
   -------------------------------------------- */
function mostrarErroJogo(mensagem) {
  erroJogo.textContent = mensagem;
}

function limparErroJogo() {
  erroJogo.textContent = "";
}

function valorInputJogoValido() {
  const valor = inputJogo.value.trim();
  if (valor === "") {
    mostrarErroJogo("O nome do jogo não pode ser vazio.");
    inputJogo.focus();
    return null;
  }
  limparErroJogo();
  return valor;
}

/* --------------------------------------------
   FUNÇÕES CRUD
   -------------------------------------------- */
function adicionarJogoFim() {
  const nome = valorInputJogoValido();
  if (nome === null) return;

  jogos.push(nome);
  inputJogo.value = "";
  renderizarLista();
  inputJogo.focus();
}

function adicionarJogoInicio() {
  const nome = valorInputJogoValido();
  if (nome === null) return;

  jogos.unshift(nome);
  inputJogo.value = "";
  renderizarLista();
  inputJogo.focus();
}

function removerJogo(indice) {
  jogos.splice(indice, 1);
  renderizarLista();
}

function iniciarEdicao(indice) {
  // Re-renderiza com aquele índice em modo de edição
  renderizarLista(indice);

  const inputEdicao = document.getElementById("input-edicao-" + indice);
  if (inputEdicao) {
    inputEdicao.focus();
    inputEdicao.select();
  }
}

function confirmarEdicao(indice) {
  const inputEdicao = document.getElementById("input-edicao-" + indice);
  if (!inputEdicao) return;

  const novoNome = inputEdicao.value.trim();

  // Campo vazio: mantém o valor original, sai do modo edição
  if (novoNome !== "") {
    jogos[indice] = novoNome;
  }

  renderizarLista();
}

function cancelarEdicao() {
  // Simplesmente re-renderiza sem alterações
  renderizarLista();
}


function renderizarLista(indiceEditando = -1) {
  contador.textContent = jogos.length;
  listaJogos.innerHTML = "";

  if (jogos.length === 0) {
    listaJogos.innerHTML = `
      <li class="empty-state">
        <span class="empty-icon">🎮</span>
        Nenhum jogo cadastrado ainda.<br>Adicione o primeiro acima!
      </li>`;
    return;
  }

  jogos.forEach(function (nome, indice) {
    const li = document.createElement("li");
    li.className = "item-jogo" + (indice === indiceEditando ? " editando" : "");

    if (indice === indiceEditando) {
      li.innerHTML = `
        <span class="item-index">${String(indice + 1).padStart(2, "0")}</span>
        <div class="edit-row">
          <input
            type="text"
            id="input-edicao-${indice}"
            value="${escaparHTML(nome)}"
            maxlength="120"
          />
          <button class="btn btn--save" onclick="confirmarEdicao(${indice})">Salvar</button>
          <button class="btn btn--cancel" onclick="cancelarEdicao()">Cancelar</button>
        </div>`;

      // Permite confirmar com Enter, cancelar com Escape
      li.querySelector("input").addEventListener("keydown", function (e) {
        if (e.key === "Enter")  confirmarEdicao(indice);
        if (e.key === "Escape") cancelarEdicao();
      });

    } else {
      li.innerHTML = `
        <span class="item-index">${String(indice + 1).padStart(2, "0")}</span>
        <span class="item-nome" title="${escaparHTML(nome)}">${escaparHTML(nome)}</span>
        <div class="item-acoes">
          <button class="btn btn--edit"   onclick="iniciarEdicao(${indice})">✎ Editar</button>
          <button class="btn btn--danger" onclick="removerJogo(${indice})">✕ Remover</button>
        </div>`;
    }

    listaJogos.appendChild(li);
  });
}
function escaparHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}


function registrarEventos() {
  btnLogin.addEventListener("click", fazerLogin);

  inputUsuario.addEventListener("keydown", function (e) {
    if (e.key === "Enter") inputSenha.focus();
  });

  inputSenha.addEventListener("keydown", function (e) {
    if (e.key === "Enter") fazerLogin();
  });

  btnAddFim.addEventListener("click", adicionarJogoFim);
  btnAddInicio.addEventListener("click", adicionarJogoInicio);

  inputJogo.addEventListener("keydown", function (e) {
    if (e.key === "Enter") adicionarJogoFim();
  });

  inputJogo.addEventListener("input", function () {
    if (inputJogo.value.trim() !== "") limparErroJogo();
  });

  btnLogout.addEventListener("click", fazerLogout);
}


function inicializar() {
  registrarEventos();
  inputUsuario.focus();
}

inicializar();