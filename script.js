let clientes = JSON.parse(localStorage.getItem("AMP_CLIENTES")) || [];

function salvar(){

let cliente = {

nome: document.getElementById("nome").value,
telefone: document.getElementById("telefone").value,
servico: document.getElementById("servico").value,
valor: document.getElementById("valorTotal").value

};

clientes.push(cliente);

localStorage.setItem("AMP_CLIENTES", JSON.stringify(clientes));

render();

}

function render(){

let lista = document.getElementById("lista");

lista.innerHTML = "";

clientes.forEach((c,i)=>{

lista.innerHTML += `

<tr>

<td>${c.nome}</td>
<td>${c.servico}</td>
<td>R$ ${c.valor}</td>

<td>Pendente</td>

<td>

<button onclick="whats('${c.telefone}')">
WhatsApp
</button>

<button onclick="remover(${i})">
Excluir
</button>

</td>

</tr>

`;

});

}

function remover(i){

clientes.splice(i,1);

localStorage.setItem("AMP_CLIENTES", JSON.stringify(clientes));

render();

}

function whats(numero){

window.open(`https://wa.me/55${numero}`);

}

render();