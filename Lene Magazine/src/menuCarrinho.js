import { catalogo, salvarLocalStorage, lerLocalStorage } from "./utilidades";

//const idsProdutoCarrinhoComQuantidade = {}; criação do dicionário vazio
const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {}; // o simbolo ?? representa que se a primeira opção der errado, ele tenta a segunda que seria: se não tiver um carrinho salvo, retorna um dicionário vazio.

function abrirCarrinho() {
  document.getElementById("carrinho").classList.add("right-[0px]");
  document.getElementById("carrinho").classList.remove("right-[-360px]");
}

function fecharCarrinho() {
  document.getElementById("carrinho").classList.remove("right-[0px]");
  document.getElementById("carrinho").classList.add("right-[-360px]");
}

function irParaCheckout() { //verifica se tem produtos no carrinho antes de prosseguir para o checkout.
  if (Object.keys(idsProdutoCarrinhoComQuantidade).length === 0) {  //Object.keys retorna a lista e no caso verifica se o tamanho dela é igual a zero, pois se for ai não prossegue para o checkout.
    return;
  }
  window.location.href = "./checkout.html"; 
}

export function inicializarCarrinho() {
  const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
  const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");
  const botaoIrParaCheckout = document.getElementById("finalizar-compra");

  botaoFecharCarrinho.addEventListener("click", fecharCarrinho);
  botaoAbrirCarrinho.addEventListener("click", abrirCarrinho);
  botaoIrParaCheckout.addEventListener("click", irParaCheckout);
}

function removerDoCarrinho(idProduto) {
  delete idsProdutoCarrinhoComQuantidade[idProduto]; //precisa remover do dicionário também e do carrinho na tela
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
  atualizarPrecoCarrinho();
  renderizarProdutosCarrinho();
}

function incrementarQuantidadeProduto(idProduto) {
  idsProdutoCarrinhoComQuantidade[idProduto]++; //se já tem o id, incrementa no carrinho
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
  atualizarPrecoCarrinho();
  atualizarInformacaoQuantidade(idProduto);
}

function decrementarQuantidadeProduto(idProduto) {
  if (idsProdutoCarrinhoComQuantidade[idProduto] === 1) { //se a quantidade do produto no carrinho for igual a 1 e a função for aplicada, então o produto será removido (fazer isso pra não ficar com valor negativo na quantidade dos produtos).
    removerDoCarrinho(idProduto);
    return;
  }
  idsProdutoCarrinhoComQuantidade[idProduto]--;
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
  atualizarPrecoCarrinho();
  atualizarInformacaoQuantidade(idProduto);
}

function atualizarInformacaoQuantidade(idProduto) { //função que dá o comando para atualizar as informações do dicionário, toda vez que as informações do dicionário forem modificadas.
  document.getElementById(`quantidade-${idProduto}`).innerText =
    idsProdutoCarrinhoComQuantidade[idProduto];
}

function desenharProdutoNoCarrinho(idProduto) { //função responsável somente pela parte visual, não interfere na lógica (não altera o carrinho)
  const produto = catalogo.find((p) => p.id === idProduto);
  const containerProdutosCarrinho =
    document.getElementById("produtos-carrinho");

  const elementoArticle = document.createElement("article"); //cria um elemento js, com os itens que estavam na tag <article>
  const articleClasses = ["flex", "bg-slate-100", "rounded-lg", "p-1", "relative"];

  for (const articleClass of articleClasses) {
    elementoArticle.classList.add(articleClass);
  }
  //<article class="flex bg-slate-100 rounded-lg p-1 relative"></article>
  //tira a responsabilidade do container e coloca para cada card em separado. Assim, consigo incrementar ou decrementar itens de cada um dos cards.

  const cartaoProdutoCarrinho = 
  `<button id="remover-item-${produto.id}" class="absolute top-0 right-2">
      <i class="fa-solid fa-circle-xmark text-slate-500 hover:text-slate-800"></i>
    </button>
    <img src="./assets/img/${produto.imagem}"
      alt="Carrinho: ${produto.nome}"
      class="h-24 rounded-lg"/>
    <div class="p-2 flex flex-col justify-between">
      <p class="text-slate-900 text-sm"> ${produto.nome} </p>
      <p class="text-slate-400 text-xs">Tamanho: M</p>
      <p class="text-green-700 text-lg">R$${produto.preco}</p>
    </div>
    <div class='flex text-slate-950 items-end absolute bottom-0 right-2 text-lg'>
        <button id='decrementar-produto-${produto.id}'>-</button>
        <p id='quantidade-${produto.id}' class='ml-2'>${
    idsProdutoCarrinhoComQuantidade[produto.id]
  }</p>
        <button class='ml-2' id='incrementar-produto-${produto.id}'>+</button>
    </div>`;
  //<article class="flex bg-slate-100 rounded-lg p-1 relative">codigo do cartao do produto</article>

  elementoArticle.innerHTML = cartaoProdutoCarrinho;
  containerProdutosCarrinho.appendChild(elementoArticle); //"puxa um filho" para dentro do container

  document.getElementById(`decrementar-produto-${produto.id}`).addEventListener("click", () => decrementarQuantidadeProduto(produto.id));

  document.getElementById(`incrementar-produto-${produto.id}`).addEventListener("click", () => incrementarQuantidadeProduto(produto.id));

  document.getElementById(`remover-item-${produto.id}`).addEventListener("click", () => removerDoCarrinho(produto.id));
}

export function renderizarProdutosCarrinho() { //olha para os produtos que estão no dicionário e gera um card para cada um deles, para conseguir manipular os itens.
  const containerProdutosCarrinho =
    document.getElementById("produtos-carrinho");
  containerProdutosCarrinho.innerHTML = "";

  for (const idProduto in idsProdutoCarrinhoComQuantidade) {
    desenharProdutoNoCarrinho(idProduto); //pra cada produto que existe no dicionário, desenha o produto no carrinho com o seu respectivo id.
  }
}

export function adicionarAoCarrinho(idProduto) {
  if (idProduto in idsProdutoCarrinhoComQuantidade) { //verifica se a chave existe dentro do objeto
    incrementarQuantidadeProduto(idProduto); //se o produto com esse id já existir no carrinho, ele irá incrementar no que já existe.
    return;
  }
  idsProdutoCarrinhoComQuantidade[idProduto] = 1; //adiciona o produto num novo campo dentro do dicionário criado
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
  desenharProdutoNoCarrinho(idProduto);
  atualizarPrecoCarrinho();
}

export function atualizarPrecoCarrinho() {
  const precoCarrinho = document.getElementById("preco-total");
  let precoTotalCarrinho = 0;
  for (const idProdutoNoCarrinho in idsProdutoCarrinhoComQuantidade) { //percorre pelo dicionário, pega cada um dos ids dos produtos no carrinho e vai incrementando no preço total
    precoTotalCarrinho += catalogo.find((p) => p.id === idProdutoNoCarrinho).preco * idsProdutoCarrinhoComQuantidade[idProdutoNoCarrinho]; //p=produto. Faz o cálculo do valor de cada produto (usando o find pra pegar pelo seu id no catálogo), multiplicado pela quantidade. E soma ao preço total do carrinho.
  }
  precoCarrinho.innerText = `TOTAL: RS$${precoTotalCarrinho}`;
}
