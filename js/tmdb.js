function buscarFilme(){

    let nomeFilme = document.getElementById("nomeFilme").value;


    if(nomeFilme.trim() === ""){
        alert("Digite o nome de um filme");
        return;
    }


    document.getElementById("resultadoBusca").innerHTML = `

        <div class="resultado-filme">

            <h3>Filme pesquisado:</h3>

            <p>${nomeFilme}</p>

            <p>Aguardando conexão com TMDB...</p>

        </div>

    `;

}
