const catalogoProdutos = document.getElementById("container-produto");

function exibirTodos() {
  const produtosEscondidos = Array.from(catalogoProdutos.getElementsByClassName("hidden") 
  );

  for (const produto of produtosEscondidos) {
    produto.classList.remove("hidden"); //percorre a lista que foi criada acima e retira o elemento encontrado.
  }
}

function esconderMasculinos() {
  exibirTodos(); //volta a exibir todos pra não correr o risco de aplicar um filtro sobre o outro
  const produtosMasculinos = Array.from(catalogoProdutos.getElementsByClassName("masculino")); //primeiro cria uma lista só com os produtos masculinos.

  for (const produto of produtosMasculinos) {
    produto.classList.add("hidden"); //percorre a lista que foi criada acima e esconde o elemento encontrado.
  }
}

function esconderFemininos() {
  exibirTodos();
  const produtosFemininos = Array.from(catalogoProdutos.getElementsByClassName("feminino"));

  for (const produto of produtosFemininos) {
    produto.classList.add("hidden");
  }
}

export function inicializarFiltros() {
  document.getElementById("exibir-todos").addEventListener("click", exibirTodos);
  document.getElementById("exibir-masculinos").addEventListener("click", esconderFemininos);
  document.getElementById("exibir-femininos").addEventListener("click", esconderMasculinos);
}
