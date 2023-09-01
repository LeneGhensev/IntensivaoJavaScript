import { inicializarCarrinho } from "./src/menuCarrinho";

const catalogo = [
  {
    id: 1,
    marca: "Shein",
    nome: "Camisa Larga com Bolsos",
    preco: 70,
    imagem: "product-1.jpg",
    feminino: false,
  },
  {
    id: 2,
    marca: "Shein",
    nome: "Casaco Reto com Lã",
    preco: 85,
    imagem: "product-2.jpg",
    feminino: true,
  },
  {
    id: 3,
    marca: "Shein",
    nome: "Jaqueta com Efeito Camurça",
    preco: 60,
    imagem: "product-3.jpg",
    feminino: false,
  },
  {
    id: 4,
    marca: "Shein",
    nome: "Sobretudo em Mescla de Lã",
    preco: 160,
    imagem: "product-4.jpg",
    feminino: false,
  },
  {
    id: 5,
    marca: "Shein",
    nome: "Camisa Larga Acolchoada de Veludo Cotelê",
    preco: 110,
    imagem: "product-5.jpg",
    feminino: false,
  },
  {
    id: 6,
    marca: "Shein",
    nome: "Casaco de Lã com Botões",
    preco: 170,
    imagem: "product-6.jpg",
    feminino: true,
  },
  {
    id: 7,
    marca: "Shein",
    nome: "Casaco com Botões",
    preco: 75,
    imagem: "product-7.jpg",
    feminino: true,
  },
  {
    id: 8,
    marca: "Shein q",
    nome: "Colete Comprido com Cinto",
    preco: 88,
    imagem: "product-8.jpg",
    feminino: true,
  },
];

for (const produtoCatalogo of catalogo) {
  const cartaoProduto = `<div class='border-double border-4 border-pink-600 w-48 m-2' id="card-produto-${produtoCatalogo.id}">
<img
  src="./assets/img/${produtoCatalogo.imagem}"
  alt="Produto 1 do Magazine Hashtag."
  style="height: 300px"
/>
<p class='marca'>${produtoCatalogo.marca}</p>
<p>${produtoCatalogo.nome}</p>
<p>$${produtoCatalogo.preco}</p>
<button>Adicionar</button>
</div>`;

  document.getElementById("container-produto").innerHTML += cartaoProduto;
}

inicializarCarrinho();
