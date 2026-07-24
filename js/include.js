async function carregarHeader() {

    const destino = document.getElementById("header");

    if (!destino) return;

    const resposta = await fetch("/componentes/header.html");

    destino.innerHTML = await resposta.text();

    // reinicializa scripts da header
    if (typeof iniciarMenu === "function") iniciarMenu();
    if (typeof iniciarBusca === "function") iniciarBusca();
    if (typeof iniciarAutocomplete === "function") iniciarAutocomplete();

}

document.addEventListener("DOMContentLoaded", carregarHeader);
