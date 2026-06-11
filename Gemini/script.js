/** * DECLARAÇÃO DE VARIÁVEIS PRINCIPAIS
 */
let jogos = ["The Legend of Zelda", "Super Mario World", "Hollow Knight"];

// Elementos de Login
const loginSection = document.getElementById('login-section');
const inputUser = document.getElementById('username');
const inputPass = document.getElementById('password');
const btnLogin = document.getElementById('btn-login');
const loginError = document.getElementById('login-error');

// Elementos do App (CRUD)
const appSection = document.getElementById('app-section');
const inputNewGame = document.getElementById('new-game');
const btnAddStart = document.getElementById('btn-add-start');
const btnAddEnd = document.getElementById('btn-add-end');
const appError = document.getElementById('app-error');
const gameList = document.getElementById('game-list');

/**
 * FUNÇÕES DE LOGIN
 */
function realizarLogin() {
    const usuario = inputUser.value.trim();
    const senha = inputPass.value.trim();

    // Validação de campos vazios
    if (usuario === "" || senha === "") {
        exibirErroLogin("Os campos de usuário e senha não podem estar vazios.");
        return;
    }

    // Validação de credenciais
    if (usuario === "aluno" && senha === "fiap2025") {
        ocultarErroLogin();
        loginSection.classList.add('hidden');
        appSection.classList.remove('hidden');
        renderizarLista();
    } else {
        exibirErroLogin("Usuário ou senha incorretos.");
    }
}

function exibirErroLogin(mensagem) {
    loginError.textContent = mensagem;
    loginError.classList.remove('hidden');
}

function ocultarErroLogin() {
    loginError.classList.add('hidden');
    loginError.textContent = "";
}

/**
 * FUNÇÕES DO CRUD
 */

// READ: Mostra todos os jogos
function renderizarLista() {
    // Limpa a lista atual na tela
    gameList.innerHTML = "";

    // Percorre o array e cria os elementos HTML
    for (let i = 0; i < jogos.length; i++) {
        const li = document.createElement('li');
        
        const spanNome = document.createElement('span');
        spanNome.textContent = jogos[i];
        
        const divAcoes = document.createElement('div');
        divAcoes.classList.add('item-actions');

        const btnEdit = document.createElement('button');
        btnEdit.textContent = "Editar";
        btnEdit.classList.add('btn-edit');
        btnEdit.onclick = function() { editarJogo(i); };

        const btnDelete = document.createElement('button');
        btnDelete.textContent = "Remover";
        btnDelete.classList.add('btn-delete');
        btnDelete.onclick = function() { removerJogo(i); };

        divAcoes.appendChild(btnEdit);
        divAcoes.appendChild(btnDelete);
        
        li.appendChild(spanNome);
        li.appendChild(divAcoes);
        
        gameList.appendChild(li);
    }
}

// CREATE: Lógica base para adicionar
function adicionarJogo(noInicio) {
    const nomeJogo = inputNewGame.value.trim();

    if (nomeJogo === "") {
        exibirErroApp("O nome do jogo não pode estar vazio.");
        return;
    }

    ocultarErroApp();

    if (noInicio) {
        jogos.unshift(nomeJogo); // Adiciona no início
    } else {
        jogos.push(nomeJogo); // Adiciona no fim
    }

    inputNewGame.value = ""; // Limpa o input
    renderizarLista();
}

// UPDATE: Edita um jogo específico pelo índice
function editarJogo(indice) {
    ocultarErroApp();
    const jogoAtual = jogos[indice];
    const novoNome = prompt("Edite o nome do jogo:", jogoAtual);

    // Se o usuário cancelar (null) ou enviar vazio, o original continua igual
    if (novoNome !== null && novoNome.trim() !== "") {
        jogos[indice] = novoNome.trim();
        renderizarLista();
    }
}

// DELETE: Remove um jogo específico pelo índice
function removerJogo(indice) {
    ocultarErroApp();
    // Remove 1 elemento a partir do índice passado
    jogos.splice(indice, 1);
    renderizarLista();
}

// Helpers de Erro do App
function exibirErroApp(mensagem) {
    appError.textContent = mensagem;
    appError.classList.remove('hidden');
}

function ocultarErroApp() {
    appError.classList.add('hidden');
    appError.textContent = "";
}

/**
 * INICIALIZAÇÃO
 */
function iniciarApp() {
    // Eventos de Login
    btnLogin.addEventListener('click', realizarLogin);

    // Eventos de Adição (CRUD)
    btnAddStart.addEventListener('click', function() { adicionarJogo(true); });
    btnAddEnd.addEventListener('click', function() { adicionarJogo(false); });
}

// Chamada inicial
iniciarApp();