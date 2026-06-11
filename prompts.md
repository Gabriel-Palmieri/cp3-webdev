# IAs Utilizadas
* Claude sonnet 4.6
* GPT-5.5/Codex
* gemini 3.1 Pro

# Prompt

Imagine que você é desenvolvedor de webdev e front-end que foi contratado por uma empresa e precisa desenvolver um sistema simples de cadastro de itens com login e CRUD completo!
Crie esse sistema usando apenas **HTML, CSS e JavaScript puro**, sem frameworks e sem bibliotecas externas.
A aplicação deve simular um sistema de cadastro de jogos favoritos

---

## Tela de login

* A aplicação deve começar exibindo apenas a tela de login.

* A lista de jogos deve ficar oculta até o login ser realizado corretamente.

As credenciais corretas são:

```text
Usuário: aluno
Senha: fiap2025
```

### Regras do login

* Os campos de usuário e senha não podem ser enviados vazios.
* Caso o usuário ou a senha estejam incorretos, exibir uma mensagem de erro na tela.
* A mensagem de erro não pode aparecer apenas no console.
* Se o login estiver correto, ocultar a tela de login e mostrar a tela da lista de jogos.

---

## Lista com CRUD completo

Após o login, o usuário deve conseguir:

* Ver todos os jogos cadastrados na tela.
* Adicionar um jogo ao final da lista.
* Adicionar um jogo ao início da lista.
* Editar qualquer jogo individualmente.
* Remover qualquer jogo individualmente.

A lista deve começar com pelo menos **3 jogos iniciais**, armazenados em um array de strings.

O array deve conter apenas strings, sem objetos.

---

## Validações obrigatórias

A aplicação deve validar:

* Nenhum jogo pode ser adicionado com o campo vazio.
* Se o campo estiver vazio, exibir uma mensagem de erro na tela.
* Ao editar um jogo, se o usuário cancelar a edição, o item original deve continuar igual.
* Ao editar um jogo, se o usuário confirmar com o campo vazio, o item original deve continuar igual.
* A remoção de um jogo deve ser feita pela posição dele na lista, usando o índice, e não pelo valor do texto. Isso evita remover vários jogos com o mesmo nome ao mesmo tempo.

---
## Organização do código

Crie os arquivos:

```text
index.html
style.css
script.js
```
---
* A lógica deve estar organizada em funções nomeadas.
* Evitar código solto fora de funções.
* Declaração de variáveis principais.
* Seleção de elementos do HTML.
* Chamada inicial da função de renderização ou inicialização.


## Comentários
* O Codex foi a mais organizada na parte de JavaScript, com funções bem separadas e uma lógica mais clara. Porém, o front-end ficou mais simples e visualmente menos atrativo.
* A resposta do Claude ficou melhor visualmente, com uma interface mais completa e bonita. Porém, apresentou pequenos problemas no JavaScript, principalmente em algumas validações de erro e uso de javascript muito avançado.
* Já a resposta do Gemini foi a mais básica. O CRUD funcionava, mas era bem simples, o front-end ficou pouco trabalhado e também havia mais problemas na parte de JavaScript, especialmente nas validações.


## IA utilizada

Escolhi a resposta do Claude como base porque foi a que apresentou o melhor front-end, com uma interface mais bonita, organizada e interessante para demonstrar no vídeo. Apesar disso, a lógica em JavaScript ainda precisava de alguns ajustes, principalmente nas validações e na organização de algumas funções. Por isso, mantive a estrutura visual do Claude, mas refinei um pouco a lógica para atender melhor aos requisitos da atividade pegando partes do codex e adaptando ao front.