/* ==========================================================
   MULTITELA SEARCH v2.0
   Busca Global + Autocomplete + Infinite Scroll
========================================================== */

/* ==========================================================
   ESTADO DA BUSCA
========================================================== */

const Search = {

    cache: {},

    timeout: null,

    pagina: 1,

    carregando: false,

    termo: "",

    resultados: [],

    categoria: "",

    autocomplete: null,

    campo: null,

    botao: null,

    containerResultados: null

};

/* ==========================================================
   INICIALIZAÇÃO
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    Search.campo = document.getElementById("campoBusca");

    Search.botao = document.getElementById("btnBusca");

    Search.containerResultados =
        document.getElementById("resultadoBusca");

    criarAutocomplete();

    iniciarEventosBusca();

    verificarPaginaBusca();

});

/* ==========================================================
   EVENTOS
========================================================== */

function iniciarEventosBusca(){

    if(Search.botao){

        Search.botao.addEventListener("click", pesquisar);

    }

    if(Search.campo){

        Search.campo.addEventListener("keydown", eventoTeclado);

        Search.campo.addEventListener("input", eventoDigitacao);

    }

    document.addEventListener("click", clicarForaAutocomplete);

}

/* ==========================================================
   TECLADO
========================================================== */

function eventoTeclado(e){

    if(e.key === "Enter"){

        e.preventDefault();

        pesquisar();

    }

    if(e.key === "Escape"){

        fecharAutocomplete();

    }

}

/* ==========================================================
   DIGITAÇÃO
========================================================== */

function eventoDigitacao(){

    clearTimeout(Search.timeout);

    const texto = Search.campo.value.trim();

    if(texto.length < 2){

        fecharAutocomplete();

        return;

    }

    Search.timeout = setTimeout(()=>{

        pesquisarAutocomplete(texto);

    },300);

}


/* ==========================================================
   CRIA O AUTOCOMPLETE
========================================================== */

function criarAutocomplete(){

    if(document.getElementById("autocompleteBusca")){

        Search.autocomplete =
            document.getElementById("autocompleteBusca");

        return;

    }

    Search.autocomplete = document.createElement("div");

    Search.autocomplete.id = "autocompleteBusca";

    Search.autocomplete.className = "autocomplete";

    const header = document.querySelector(".header-right");

    if(header){

        header.style.position = "relative";

        header.appendChild(Search.autocomplete);

    }

}

/* ==========================================================
   FECHAR AUTOCOMPLETE
========================================================== */

function fecharAutocomplete(){

    if(Search.autocomplete){

        Search.autocomplete.innerHTML = "";

        Search.autocomplete.style.display = "none";

    }

}

/* ==========================================================
   CLIQUE FORA
========================================================== */

function clicarForaAutocomplete(e){

    if(!Search.autocomplete) return;

    if(

        !Search.autocomplete.contains(e.target) &&

        e.target !== Search.campo

    ){

        fecharAutocomplete();

    }

}

/* ==========================================================
   PESQUISA AUTOCOMPLETE
========================================================== */

async function pesquisarAutocomplete(texto){

    if(Search.cache[texto]){

        mostrarAutocomplete(

            Search.cache[texto]

        );

        return;

    }

    try{

        const dados = await api(

            `/search/multi?query=${encodeURIComponent(texto)}&page=1`

        );

        const resultados = dados.results.filter(item =>

            item.poster_path &&

            (item.media_type === "movie" ||

             item.media_type === "tv")

        ).slice(0,6);

        Search.cache[texto] = resultados;

        mostrarAutocomplete(resultados);

    }

    catch(error){

        console.error(error);

    }

}

/* ==========================================================
   PESQUISAR
========================================================== */

function pesquisar(){

    if(!Search.campo) return;

    const texto = Search.campo.value.trim();

    if(texto === "") return;

    Search.termo = texto;

    fecharAutocomplete();

    let destino = "";

    if(window.location.pathname.includes("/paginas/")){

        destino = "busca.html";

    }else{

        destino = "paginas/busca.html";

    }

    window.location.href =
        `${destino}?q=${encodeURIComponent(texto)}`;

}

/* ==========================================================
   VERIFICA SE ESTÁ NA PÁGINA DE BUSCA
========================================================== */

function verificarPaginaBusca(){

    if(!window.location.pathname.includes("busca.html")){

        return;

    }

    const params = new URLSearchParams(window.location.search);

    Search.termo = params.get("q") || "";

    Search.pagina = 1;

    Search.carregando = false;

    if(Search.campo){

        Search.campo.value = Search.termo;

    }

    const titulo = document.getElementById("tituloBusca");

    if(titulo){

        titulo.innerHTML =
            `Resultados para "${Search.termo}"`;

    }

    carregarResultados();

    window.addEventListener("scroll", scrollBusca);

}

/* ==========================================================
   SCROLL INFINITO
========================================================== */

function scrollBusca(){

    if(Search.carregando) return;

    if(

        window.innerHeight +

        window.scrollY >=

        document.body.offsetHeight - 800

    ){

        carregarResultados();

    }

}

/* ==========================================================
   CARREGA RESULTADOS
========================================================== */

async function carregarResultados(){

    if(Search.carregando) return;

    Search.carregando = true;

    try{

        const dados = await api(

            `/search/multi?query=${encodeURIComponent(Search.termo)}&page=${Search.pagina}`

        );

        const resultados = dados.results.filter(item=>

            item.poster_path &&

            (

                item.media_type==="movie" ||

                item.media_type==="tv"

            )

        );

        resultados.forEach(item=>{

            renderizarCards(

                "resultadoBusca",

                [item],

                item.media_type

            );

        });

        Search.pagina++;

    }

    catch(error){

        console.error(error);

    }

    Search.carregando = false;

}
