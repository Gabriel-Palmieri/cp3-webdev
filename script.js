const USUARIO_CORRETO = "aluno";
const SENHA_CORRETA = "fiap2025";

let jogos = ["The Legend of Zelda: Breath of the Wild", "Red Dead Redemption 2", "Hollow Knight"];

let telaLogin;
let telaLista;
let formularioLogin;
let formularioJogo;
let campoUsuario;
let campoSenha;
let mensagemLogin;
let campoJogo;
let mensagemJogo;
let listaJogos;
let contadorJogos;
let botaoAdicionarFim;
let botaoAdicionarInicio;
let botaoSair;

function selecionarElementos() {
  telaLogin = document.getElementById("tela-login");
  telaLista = document.getElementById("tela-lista");
  formularioLogin = document.getElementById("form-login");
  formularioJogo = document.getElementById("form-jogo");
  campoUsuario = document.getElementById("input-usuario");
  campoSenha = document.getElementById("input-senha");
  mensagemLogin = document.getElementById("erro-login");
  campoJogo = document.getElementById("input-jogo");
  mensagemJogo = document.getElementById("erro-jogo");
  listaJogos = document.getElementById("lista-jogos");
  contadorJogos = document.getElementById("contador");
  botaoAdicionarFim = document.getElementById("btn-add-fim");
  botaoAdicionarInicio = document.getElementById("btn-add-inicio");
  botaoSair = document.getElementById("btn-logout");
}

function inicializarApp() {
  selecionarElementos();
  registrarEventos();
  mostrarTelaLogin();
  renderizarJogos();
}

function registrarEventos() {
  formularioLogin.addEventListener("submit", handleLogin);
  formularioJogo.addEventListener("submit", handleEnvioFormularioJogo);
  botaoAdicionarFim.addEventListener("click", adicionarJogoNoFim);
  botaoAdicionarInicio.addEventListener("click", adicionarJogoNoInicio);
  botaoSair.addEventListener("click", handleSair);
}

function handleEnvioFormularioJogo(event) {
  event.preventDefault();
  adicionarJogoNoFim();
}

function handleLogin(event) {
  event.preventDefault();

  const usuario = campoUsuario.value.trim();
  const senha = campoSenha.value.trim();

  limparMensagem(mensagemLogin);

  if (usuario === "" || senha === "") {
    exibirMensagem(mensagemLogin, "Preencha o usuário e a senha para continuar.");
    return;
  }

  if (usuario !== USUARIO_CORRETO || senha !== SENHA_CORRETA) {
    exibirMensagem(mensagemLogin, "Usuário ou senha incorretos.");
    return;
  }

  mostrarTelaLista();
}

function handleSair() {
  formularioLogin.reset();
  limparMensagem(mensagemLogin);
  limparMensagem(mensagemJogo);
  mostrarTelaLogin();
}

function mostrarTelaLogin() {
  telaLogin.classList.remove("hidden");
  telaLista.classList.add("hidden");
  campoUsuario.focus();
}

function mostrarTelaLista() {
  telaLogin.classList.add("hidden");
  telaLista.classList.remove("hidden");
  campoJogo.focus();
}

function obterJogoDigitado() {
  return campoJogo.value.trim();
}

function validarNomeJogo(nomeJogo) {
  if (nomeJogo === "") {
    exibirMensagem(mensagemJogo, "Digite o nome de um jogo antes de adicionar.");
    return false;
  }

  limparMensagem(mensagemJogo);
  return true;
}

function adicionarJogoNoFim() {
  const nomeJogo = obterJogoDigitado();

  if (!validarNomeJogo(nomeJogo)) {
    return;
  }

  jogos.push(nomeJogo);
  resetarFormularioJogo();
  renderizarJogos();
}

function adicionarJogoNoInicio() {
  const nomeJogo = obterJogoDigitado();

  if (!validarNomeJogo(nomeJogo)) {
    return;
  }

  jogos.unshift(nomeJogo);
  resetarFormularioJogo();
  renderizarJogos();
}

function editarJogo(indice) {
  const jogoAtual = jogos[indice];
  const novoJogo = prompt("Edite o nome do jogo:", jogoAtual);

  if (novoJogo === null) {
    return;
  }

  const jogoEditado = novoJogo.trim();

  if (jogoEditado === "") {
    exibirMensagem(mensagemJogo, "O jogo não foi alterado porque o nome ficou vazio.");
    return;
  }

  jogos[indice] = jogoEditado;
  limparMensagem(mensagemJogo);
  renderizarJogos();
}

function removerJogo(indice) {
  jogos.splice(indice, 1);
  limparMensagem(mensagemJogo);
  renderizarJogos();
}

function renderizarJogos() {
  listaJogos.innerHTML = "";
  contadorJogos.textContent = formatarContador();

  jogos.forEach(function renderizarItemJogo(jogo, indice) {
    const item = document.createElement("li");
    const posicao = document.createElement("span");
    const nome = document.createElement("span");
    const botaoEditar = document.createElement("button");
    const botaoRemover = document.createElement("button");

    item.className = "item-jogo";
    posicao.className = "item-index";
    nome.className = "item-nome";
    botaoEditar.className = "btn btn--edit";
    botaoRemover.className = "btn btn--danger";

    posicao.textContent = indice + 1 + ".";
    nome.textContent = jogo;
    botaoEditar.textContent = "✎ Editar";
    botaoRemover.textContent = "✕ Remover";

    botaoEditar.type = "button";
    botaoRemover.type = "button";

    botaoEditar.addEventListener("click", function handleCliqueEditar() {
      editarJogo(indice);
    });

    botaoRemover.addEventListener("click", function handleCliqueRemover() {
      removerJogo(indice);
    });

    item.appendChild(posicao);
    item.appendChild(nome);
    item.appendChild(botaoEditar);
    item.appendChild(botaoRemover);
    listaJogos.appendChild(item);
  });
}

function formatarContador() {
  if (jogos.length === 1) {
    return "1 jogo";
  }

  return jogos.length + " jogos";
}

function resetarFormularioJogo() {
  campoJogo.value = "";
  campoJogo.focus();
}

function exibirMensagem(elemento, texto) {
  elemento.textContent = texto;
}

function limparMensagem(elemento) {
  elemento.textContent = "";
}

inicializarApp();