console.log("TMDB JS NOVO CARREGADO");


async function buscarFilme(){

let nomeFilme = document.getElementById("nomeFilme").value;


if(nomeFilme.trim()==""){

alert("Digite um filme");

return;

}



let url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=pt-BR&query=${nomeFilme}`;



try{


let resposta = await fetch(url);


let dados = await resposta.json();



let filmes = dados.results;



if(filmes.length === 0){

document.getElementById("resultadoBusca").innerHTML =
`
<p>Nenhum filme encontrado.</p>
`;

return;

}



let html = "";



filmes.slice(0,5).forEach(filme => {



let imagem = filme.poster_path 
? 
`https://image.tmdb.org/t/p/w300${filme.poster_path}`
:
"";


let ano = filme.release_date 
? 
filme.release_date.substring(0,4)
:
"Não informado";



html += `

<div class="resultado-filme">


<img src="${imagem}" width="150">


<div>


<h3>${filme.title}</h3>


<p><strong>Ano:</strong> ${ano}</p>


<p>
<strong>Sinopse:</strong><br>
${filme.overview}
</p>


<button onclick="selecionarFilme(${filme.id})">

Selecionar

</button>


</div>


</div>


`;



});



document.getElementById("resultadoBusca").innerHTML = html;



}catch(erro){


console.log(erro);

alert("Erro ao buscar filmes");


}


}



function selecionarFilme(id){


alert("Filme selecionado ID: "+id);


}
