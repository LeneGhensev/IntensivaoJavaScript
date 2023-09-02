import { catalogo } from "./utilidades";

function abrirCarrinho() {
  document.getElementById("carrinho").classList.add("right-[0px]");
  document.getElementById("carrinho").classList.remove("right-[-320px]");
}

function fecharCarrinho() {
  document.getElementById("carrinho").classList.remove("right-[0px]");
  document.getElementById("carrinho").classList.add("right-[-320px]");
}

export function inicializarCarrinho() {
  const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
  const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");

  botaoFecharCarrinho.addEventListener("click", fecharCarrinho);
  botaoAbrirCarrinho.addEventListener("click", abrirCarrinho);
}

export function adicionarAoCarrinho(idProduto){
  const produto = catalogo.find((p) => p.id === idProduto); 
  const containerProdutosCarrinho = document.getElementById("produtos-carrinho");
  const cartaoProdutoCarrinho = 
  `<article class="flex bg-pink-600 rounded-lg p-1 relative">
  <button id="fechar-carrinho" class="absolute top-0 right-2">
    <i class="fa-solid fa-circle-xmark text-neutral-950 hover:text-slate-800"></i>
  </button>
  <img src="./assets/img/${produto.imagem}" alt="descrição do produto"${produto.nome}" class="h-24 rounded-lg"/>
  <div class="py-2">
    <p class="text-neutral-950 text-sm">${produto.nome}</p>
    <p class="text-neutral-450 text-xs"> Tamanho: M </p>
    <p class="text-green-650 text-lg">$${produto.preco}</p>
  </div>
</article>`;
  containerProdutosCarrinho.innerHTML += cartaoProdutoCarrinho;
}