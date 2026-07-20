/* ==========================================
   HOME MULTITELA 2.0
========================================== */

document.addEventListener("DOMContentLoaded", iniciarHome);

let heroId = null;
let heroTipo = "movie";
let banners = [];

let bannerAtual = 0;

const TEMPO_BANNER = 10000; // altere para 180000 se quiser 3 minutos

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

    if(!dados.results) return;

    banners = dados.results.filter(item => item.backdrop_path);

    if(!banners.length) return;

    bannerAtual = 0;

    mostrarBanner();

    setInterval(() => {

        bannerAtual++;

        if(bannerAtual >= banners.length){

            bannerAtual = 0;

        }

        mostrarBanner();

    }, TEMPO_BANNER);

}

async function mostrarBanner(){

    const destaque = banners[bannerAtual];

    heroId = destaque.id;

    heroTipo = destaque.media_type === "tv"

        ? "tv"

        : "movie";

    const hero = document.getElementById("hero");

    hero.style.opacity = "0";

    setTimeout(async ()=>{

        hero.style.backgroundImage =

            `url(${CONFIG.IMAGE_BACKDROP}${destaque.backdrop_path})`;

        document.getElementById("hero-title").textContent =

            destaque.title || destaque.name;

        document.getElementById("hero-description").textContent =

            destaque.overview || "";

        document.getElementById("hero-ano").textContent =

            (destaque.release_date ||

            destaque.first_air_date ||

            "").substring(0,4);

        document.getElementById("hero-nota").textContent =

            destaque.vote_average

            ? "⭐ " + destaque.vote_average.toFixed(1)

            : "";

        const detalhes = await api(`/${heroTipo}/${heroId}`);

        document.getElementById("hero-genero").textContent =

            detalhes.genres

            ? detalhes.genres.map(g=>g.name).join(" • ")

            : "";

        hero.style.opacity = "1";

    },300);

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
