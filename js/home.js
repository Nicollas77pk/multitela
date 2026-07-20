/* ==========================================
   HOME MULTITELA 2.0
========================================== */

document.addEventListener("DOMContentLoaded", iniciarHome);

let heroId = null;
let heroTipo = "movie";

/* ==========================================
   INICIAR
========================================== */

async function iniciarHome() {

    console.log("HOME INICIOU");

    try{

        await carregarBanner();

        await carregarFilmes();

        await carregarSeries();

        await carregarAnimes();

        await carregarNovelas();

        ativarHero();

    }

    catch(e){

        console.error(e);

    }

}

/* ==========================================
   HERO
========================================== */

async function carregarBanner(){

    const dados = await api("/trending/all/day");

    if(!dados.results || !dados.results.length) return;

    const destaque = dados.results.find(item => item.backdrop_path);

    if(!destaque) return;

    heroId = destaque.id;

    heroTipo = destaque.media_type === "tv"
        ? "tv"
        : "movie";

    const hero = document.getElementById("hero");

    hero.style.backgroundImage =

        `url(${CONFIG.IMAGE_BACKDROP}${destaque.backdrop_path})`;

    document.getElementById("hero-title").textContent =

        destaque.title || destaque.name;

    document.getElementById("hero-description").textContent =

        destaque.overview || "";

    /* Ano */

    document.getElementById("hero-ano").textContent =

        (destaque.release_date ||

        destaque.first_air_date ||

        "").substring(0,4);

    /* Nota */

    document.getElementById("hero-nota").textContent =

        destaque.vote_average

        ? "⭐ " + destaque.vote_average.toFixed(1)

        : "";

    /* Gêneros */

    const detalhes = await api(`/${heroTipo}/${heroId}`);

    document.getElementById("hero-genero").textContent =

        detalhes.genres

        ? detalhes.genres.map(g=>g.name).join(" • ")

        : "";

}

/* ==========================================
   HERO CLICK
========================================== */

function ativarHero(){

    const hero = document.getElementById("hero");

    const btn = document.getElementById("btnDetalhes");

    if(btn){

        btn.addEventListener("click",function(e){

            e.stopPropagation();

            if(heroId){

                abrirModal(heroId,heroTipo);

            }

        });

    }

    if(hero){

        hero.addEventListener("click",function(){

            if(heroId){

                abrirModal(heroId,heroTipo);

            }

        });

    }

}

/* ==========================================
   FILMES
========================================== */

async function carregarFilmes(){

    const dados = await api("/movie/popular");

    renderizarCards(

        "carrossel-filmes",

        dados.results,

        "movie"

    );

}

/* ==========================================
   SÉRIES
========================================== */

async function carregarSeries(){

    const dados = await api("/tv/popular");

    renderizarCards(

        "carrossel-series",

        dados.results,

        "tv"

    );

}

/* ==========================================
   ANIMES
========================================== */

async function carregarAnimes(){

    const dados = await api(

        "/discover/tv?with_genres=16"

    );

    renderizarCards(

        "carrossel-animes",

        dados.results,

        "tv"

    );

}

/* ==========================================
   NOVELAS
========================================== */

async function carregarNovelas(){

    const dados = await api(

        "/discover/tv?with_genres=10766&with_origin_country=BR"

    );

    renderizarCards(

        "carrossel-novelas",

        dados.results,

        "tv"

    );

}
