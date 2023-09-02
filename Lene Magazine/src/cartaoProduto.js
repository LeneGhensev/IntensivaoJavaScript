import {catalogo} from "./utilidades";
import {adicionarAoCarrinho} from "./menuCarrinho";

export function renderizarCatalogo() {
    for (const produtoCatalogo of catalogo) {
        const cartaoProduto = `<div class='border-double w-48 m-2 flex flex-col p-2 justify-between shadow-lg shadow-slate-400 rounded-lg group' id="card-produto-${produtoCatalogo.id}">
      <img
        src="./assets/img/${produtoCatalogo.imagem}"
        alt="Produto 1 do Magazine Hashtag." class="group-hover:scale-110 duration-300 my-3 rounded-lg"
      />
      <p class="text-sm">${produtoCatalogo.marca}</p>
      <p class="text-sm">${produtoCatalogo.nome}</p>
      <p class="text-sm">$${produtoCatalogo.preco}</p>
      <button id='adicionar-${produtoCatalogo.id}' class="bg-slate-950 hover:bg-slate-700 text-slate-200"><i class="fa-solid fa-cart-plus"></i> Adicionar</button>
      </div>`;
      
        document.getElementById("container-produto").innerHTML += cartaoProduto;
    }

    for (const produtoCatalogo of catalogo) {
        document.getElementById(`adicionar-${produtoCatalogo.id}`).addEventListener("click", () => adicionarAoCarrinho(produtoCatalogo.id));
      }
}

  