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



                    <p>
                    <strong>Ano:</strong> ${ano}
                    </p>



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



    }

    catch(erro){


        console.log(erro);


        alert("Erro ao buscar filmes");


    }



}







async function selecionarFilme(id){



    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=pt-BR`;



    try{


        let resposta = await fetch(url);



        let filme = await resposta.json();



        console.log(filme);




        document.getElementById("titulo").value = filme.title;



        document.getElementById("ano").value = filme.release_date

        ?

        filme.release_date.substring(0,4)

        :

        "";




        document.getElementById("sinopse").value = filme.overview;




        document.getElementById("imagem").value =

        filme.poster_path

        ?

        `https://image.tmdb.org/t/p/w500${filme.poster_path}`

        :

        "";




        let generos = filme.genres

        .map(genero => genero.name)

        .join(", ");




        document.getElementById("genero").value = generos;




        alert("Filme importado com sucesso!");



    }

    catch(erro){


        console.log(erro);


        alert("Erro ao importar filme");


    }



}









async function salvarFilme(){



    let filme = {



        titulo: document.getElementById("titulo").value,


        ano: document.getElementById("ano").value,


        genero: document.getElementById("genero").value,


        diretor: document.getElementById("diretor").value,


        sinopse: document.getElementById("sinopse").value,


        imagem: document.getElementById("imagem").value



    };



    console.log(filme);




    try{


        let resposta = await fetch("../salvar-filme.php",{



            method:"POST",



            headers:{


                "Content-Type":"application/json"


            },



            body:JSON.stringify(filme)



        });





        let resultado = await resposta.json();




        alert(resultado.mensagem);



    }

    catch(erro){



        console.log(erro);



        alert("Erro ao salvar filme");



    }



}
