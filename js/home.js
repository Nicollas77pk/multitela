document.addEventListener("DOMContentLoaded", iniciarHome);

async function iniciarHome() {

    try {

        await carregarBanner();

        await carregarFilmes();

        await carregarSeries();

        await carregarAnimes();

        await carregarNovelas();

    } catch (erro) {

        console.error("Erro ao iniciar Home:", erro);

    }

}

/* ===========================
   HERO
=========================== */

async function carregarBanner() {

    const dados = await api("/trending/all/day");

    if (!dados.results || !dados.results.length) return;

    const destaque = dados.results[0];

    const hero = document.getElementById("hero");

    hero.style.backgroundImage =
        `url(${CONFIG.IMAGE_BACKDROP}${destaque.backdrop_path})`;

    document.getElementById("hero-title").textContent =
        destaque.title || destaque.name;

    document.getElementById("hero-description").textContent =
        destaque.overview || "";

}

/* ===========================
   FILMES
=========================== */

async function carregarFilmes() {

    const dados = await api("/movie/popular");

    renderizarCards(
        "carrossel-filmes",
        dados.results,
        "movie"
    );

}

/* ===========================
   SÉRIES
=========================== */

async function carregarSeries() {

    const dados = await api("/tv/popular");

    renderizarCards(
        "carrossel-series",
        dados.results,
        "tv"
    );

}

/* ===========================
   ANIMES
=========================== */

async function carregarAnimes() {

    const dados = await api(
        "/discover/tv?with_genres=16"
    );

    renderizarCards(
        "carrossel-animes",
        dados.results,
        "tv"
    );

}

/* ===========================
   NOVELAS
=========================== */

async function carregarNovelas() {

    const dados = await api(
        "/discover/tv?with_genres=10766&with_origin_country=BR"
    );

    renderizarCards(
        "carrossel-novelas",
        dados.results,
        "tv"
    );

}
