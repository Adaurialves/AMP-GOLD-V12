let clientes = JSON.parse(localStorage.getItem("AMP_DB")) || [];

function salvar(){

let total = Number(document.getElementById("valorTotal").value);
let entrada = Number(document.getElementById("entrada").value);
let quitacao = Number(document.getElementById("quitacao").value);

let restante = total - (entrada + quitacao);

let cliente = {

nome: document.getElementById("nome").value,
telefone: document.getElementById("telefone").value,
servico: document.getElementById("servico").value,

total,
entrada,
quitacao,
restante

};

clientes.push(cliente);

localStorage.setItem("AMP_DB", JSON.stringify(clientes));

render();

}

function render(){

let lista = document.getElementById("lista");

lista.innerHTML = "";

clientes.forEach((c,i)=>{

let status = c.restante <= 0 ? "PAGO" : "PENDENTE";

lista.innerHTML += `

<tr>

<td>${c.nome}</td>

<td>${c.servico}</td>

<td>

Total: R$${c.total}<br>

Entrada: R$${c.entrada}<br>

Quitação: R$${c.quitacao}<br>

Restante: R$${c.restante}

</td>

<td>${status}</td>

<td>

<button onclick="whats('${c.telefone}')">

WhatsApp

</button>

<button onclick="pdf(${i})">

Recibo

</button>

<button onclick="del(${i})">

Excluir

</button>

</td>

</tr>

`;

});

grafico();

}

function del(i){

clientes.splice(i,1);

localStorage.setItem("AMP_DB", JSON.stringify(clientes));

render();

}

function whats(num){

window.open(`https://wa.me/55${num}?text=Olá cliente da AMP Montagens`);

}

function pdf(i){

let c = clientes[i];

let doc = new jspdf.jsPDF();

doc.text("RECIBO AMP MONTAGENS",20,20);

doc.text("Cliente: "+c.nome,20,40);
doc.text("Serviço: "+c.servico,20,50);

doc.text("Total: R$"+c.total,20,70);
doc.text("Entrada: R$"+c.entrada,20,80);
doc.text("Quitação: R$"+c.quitacao,20,90);
doc.text("Restante: R$"+c.restante,20,100);

doc.save("recibo.pdf");

}

function grafico(){

let total = clientes.reduce((s,c)=> s + c.total ,0);

new Chart(document.getElementById("grafico"),{

type:"bar",

data:{
labels:["Faturamento"],
datasets:[{
label:"Total R$",
data:[total]
}]
}

});

}

render();
