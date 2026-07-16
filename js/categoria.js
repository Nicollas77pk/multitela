document.addEventListener("DOMContentLoaded",()=>{


    const caminho = window.location.pathname;


    const container = document.querySelector(".categoria-lista");


    if(!container) return;



    let tipo = "movie";

    let endpoint = "";



  if(caminho.includes("filmes")){


    endpointAtual="/discover/movie";

    tipoAtual="movie";


}



    else if(caminho.includes("series")){


        endpoint="/tv/popular";

        tipo="tv";


    }



    else if(caminho.includes("animes")){


        endpoint="/discover/tv?with_genres=16";

        tipo="tv";


    }



    else if(caminho.includes("doramas")){


        endpoint="/discover/tv?with_origin_country=KR";

        tipo="tv";


    }



    else if(caminho.includes("novelas")){


        endpoint="/discover/tv?with_genres=18";

        tipo="tv";


    }



    else if(caminho.includes("documentarios")){


        endpoint="/discover/movie?with_genres=99";

        tipo="movie";


    }



    carregarCategoria(endpoint,tipo,container);



});





async function carregarCategoria(endpoint,tipo,container){


    try{


        const dados = await api(endpoint);



        renderizarCards(

            container.id,

            dados.results,

            tipo

        );


    }


    catch(error){


        console.error(
            "Erro categoria:",
            error
        );


    }


}
