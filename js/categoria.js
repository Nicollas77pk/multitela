let paginaAtual = 1;

let carregando = false;

let tipoAtual = "movie";

let endpointAtual = "";

let containerCategoria;



document.addEventListener("DOMContentLoaded",()=>{


    const caminho = window.location.pathname;


    containerCategoria =
    document.querySelector(".categoria-lista");


    if(!containerCategoria) return;



    if(caminho.includes("filmes")){

    endpointAtual="/discover/movie";

    tipoAtual="movie";

}

else if(caminho.includes("series")){

    endpointAtual="/discover/tv";

    tipoAtual="tv";

}

else if(caminho.includes("animes")){

    endpointAtual="/discover/tv?with_genres=16&with_origin_country=JP";

    tipoAtual="tv";

}

else if(caminho.includes("desenhos")){

    endpointAtual="/discover/tv?with_genres=16";

    tipoAtual="tv";

}

else if(caminho.includes("doramas")){

    endpointAtual="/discover/tv?with_origin_country=KR";

    tipoAtual="tv";

}

else if(caminho.includes("novelas-turcas")){

    endpointAtual="/discover/tv?with_genres=10766&with_origin_country=TR";

    tipoAtual="tv";

}

else if(caminho.includes("novelas")){

    endpointAtual="/discover/tv?with_genres=10766&with_origin_country=BR";

    tipoAtual="tv";

}

else if(caminho.includes("documentarios")){

    endpointAtual="/discover/movie?with_genres=99";

    tipoAtual="movie";

}

/* ===========================
   GÊNEROS
=========================== */

else if(caminho.includes("terror")){

    endpointAtual="/discover/movie?with_genres=27";

    tipoAtual="movie";

}

else if(caminho.includes("suspense")){

    endpointAtual="/discover/movie?with_genres=53";

    tipoAtual="movie";

}

else if(caminho.includes("guerra")){

    endpointAtual="/discover/movie?with_genres=10752";

    tipoAtual="movie";

}

else if(caminho.includes("drama")){

    endpointAtual="/discover/movie?with_genres=18";

    tipoAtual="movie";

}

else if(caminho.includes("ficcao")){

    endpointAtual="/discover/movie?with_genres=878";

    tipoAtual="movie";

}

else if(caminho.includes("comedia")){

    endpointAtual="/discover/movie?with_genres=35";

    tipoAtual="movie";

}

else if(caminho.includes("romance")){

    endpointAtual="/discover/movie?with_genres=10749";

    tipoAtual="movie";

}

else if(caminho.includes("acao")){

    endpointAtual="/discover/movie?with_genres=28";

    tipoAtual="movie";

}

else if(caminho.includes("aventura")){

    endpointAtual="/discover/movie?with_genres=12";

    tipoAtual="movie";

}

else if(caminho.includes("fantasia")){

    endpointAtual="/discover/movie?with_genres=14";

    tipoAtual="movie";

}

else if(caminho.includes("animacao")){

    endpointAtual="/discover/movie?with_genres=16";

    tipoAtual="movie";

}

else if(caminho.includes("familia")){

    endpointAtual="/discover/movie?with_genres=10751";

    tipoAtual="movie";

}

else if(caminho.includes("crime")){

    endpointAtual="/discover/movie?with_genres=80";

    tipoAtual="movie";

}

else if(caminho.includes("misterio")){

    endpointAtual="/discover/movie?with_genres=9648";

    tipoAtual="movie";

}



    carregarCategoria();



    window.addEventListener(
        "scroll",
        verificarScroll
    );


});





async function carregarCategoria(){


    if(carregando) return;


    carregando = true;


    try{


        let url = endpointAtual;



        if(url.includes("?")){


            url += `&sort_by=popularity.desc&page=${paginaAtual}`;


        }else{


            url += `?sort_by=popularity.desc&page=${paginaAtual}`;


        }



        const dados = await api(url);



        const lista = dados.results;



        renderizarCards(

            containerCategoria.id,

            lista,

            tipoAtual

        );



        paginaAtual++;



    }


    catch(error){


        console.error(
            "Erro categoria:",
            error
        );


    }



    carregando=false;


}









function verificarScroll(){


    const chegouNoFinal =

    window.innerHeight +

    window.scrollY >=

    document.body.offsetHeight - 500;



    if(chegouNoFinal){


        carregarCategoria();


    }


}
