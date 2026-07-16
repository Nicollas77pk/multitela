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


        endpointAtual="/discover/tv?with_genres=16";

        tipoAtual="tv";


    }


    else if(caminho.includes("doramas")){


        endpointAtual="/discover/tv?with_origin_country=KR";

        tipoAtual="tv";


    }


    else if(caminho.includes("novelas")){


        endpointAtual="/discover/tv?with_genres=18";

        tipoAtual="tv";


    }


    else if(caminho.includes("documentarios")){


        endpointAtual="/discover/movie?with_genres=99";

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



        const lista = dados.results.slice(0,10);



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
