async function buscarFilme(){


let nomeFilme = document.getElementById("nomeFilme").value;


if(nomeFilme.trim() === ""){

alert("Digite o nome de um filme");

return;

}



let url = 
`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=pt-BR&query=${nomeFilme}`;



try{


let resposta = await fetch(url);


let dados = await resposta.json();



console.log(dados);



document.getElementById("resultadoBusca").innerHTML = `

<h3>Resultados encontrados:</h3>

<p>${dados.results.length} filmes encontrados</p>

`;


}

catch(erro){

console.log(erro);

alert("Erro ao consultar TMDB");

}


}
