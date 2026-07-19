let paginaBusca = 1;

let carregandoBusca = false;

let termoBusca = "";

const containerBusca = document.getElementById("resultadoBusca");

document.addEventListener("DOMContentLoaded", () => {

    // Campo de busca do header
    const campo = document.getElementById("campoBusca");
    const botao = document.getElementById("btnBusca");

    if (campo && botao) {

        botao.addEventListener("click", iniciarBusca);

        campo.addEventListener("keydown", e => {

            if (e.key === "Enter") {

                iniciarBusca();

            }

        });

    }

    // Estamos na página busca.html?
    if (window.location.pathname.includes("busca.html")) {

        const params = new URLSearchParams(window.location.search);

        termoBusca = params.get("q") || "";
        const categoria = params.get("categoria");

        if (campo) campo.value = termoBusca;

        const titulo = document.getElementById("tituloBusca");

        if (titulo) {

            titulo.textContent = `Resultados para "${termoBusca}"`;

        }

        if (termoBusca !== "") {

            buscarConteudo();

            window.addEventListener("scroll", verificarScrollBusca);

        }

    }

});

function iniciarBusca() {

    const campo = document.getElementById("campoBusca");

    if (!campo) return;

    const texto = campo.value.trim();

    if (!texto) return;

    let categoria = "";

    const pagina = window.location.pathname.toLowerCase();

    if (pagina.includes("filmes")) {

        categoria = "filmes";

    } else if (pagina.includes("series")) {

        categoria = "series";

    } else if (pagina.includes("animes")) {

        categoria = "animes";

    } else if (pagina.includes("doramas")) {

        categoria = "doramas";

    } else if (pagina.includes("novelas")) {

        categoria = "novelas";

    } else if (pagina.includes("documentarios")) {

        categoria = "documentarios";

    }

    const destino = pagina.includes("/paginas/")
        ? "busca.html"
        : "paginas/busca.html";

    let url = `${destino}?q=${encodeURIComponent(texto)}`;

    if (categoria) {

        url += `&categoria=${categoria}`;

    }

    window.location.href = url;

}

async function buscarConteudo() {

    if (carregandoBusca) return;

    carregandoBusca = true;

    try {

        const dados = await api(

            `/search/multi?query=${encodeURIComponent(termoBusca)}&page=${paginaBusca}`

        );

        const resultados = dados.results.filter(item =>

            item.media_type === "movie" ||

            item.media_type === "tv"

        );

        resultados.forEach(item => {

            const tipo = item.media_type === "tv"
                ? "tv"
                : "movie";

            renderizarCards(

                "resultadoBusca",

                [item],

                tipo

            );

        });

        paginaBusca++;

    }

    catch (erro) {

        console.error(erro);

    }

    carregandoBusca = false;

}

function verificarScrollBusca() {

    if (

        window.innerHeight + window.scrollY >=

        document.body.offsetHeight - 700

    ) {

        buscarConteudo();

    }

}
