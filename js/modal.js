const modal = document.getElementById("modal");
const modalBanner = document.getElementById("modalBanner");
const modalTitulo = document.getElementById("modalTitulo");
const modalMeta = document.getElementById("modalMeta");
const modalDescricao = document.getElementById("modalDescricao");
const modalProviders = document.getElementById("modalProviders");
const fecharModal = document.getElementById("fecharModal");

/* ===========================
   ABRIR MODAL
=========================== */

async function abrirModal(id, tipo = "movie") {

    modal.classList.add("ativo");

    modalTitulo.innerHTML = "Carregando...";

    modalDescricao.innerHTML = "";

    modalMeta.innerHTML = "";

    modalProviders.innerHTML = "";

    try {

        const detalhes = await api(`/${tipo}/${id}`);

        preencherModal(detalhes, tipo);

        await carregarOndeAssistir(id, tipo);

    } catch (erro) {

        console.error(erro);

        modalTitulo.innerHTML = "Erro ao carregar";

    }

}

/* ===========================
   PREENCHER MODAL
=========================== */

function preencherModal(item, tipo) {

    modalBanner.style.backgroundImage =
        `url(${CONFIG.IMAGE_BACKDROP}${item.backdrop_path})`;

    modalTitulo.innerHTML =
        item.title || item.name;

    const ano = (
        item.release_date ||
        item.first_air_date ||
        ""
    ).substring(0, 4);

    const nota = item.vote_average
        ? item.vote_average.toFixed(1)
        : "-";

    const duracao = item.runtime
        ? item.runtime + " min"
        : "";

    const generos = item.genres
        .map(g => g.name)
        .join(" • ");

    modalMeta.innerHTML = `

        ⭐ ${nota}

        &nbsp;&nbsp;|&nbsp;&nbsp;

        ${ano}

        ${duracao ? "&nbsp;&nbsp;|&nbsp;&nbsp;" + duracao : ""}

        ${generos ? "&nbsp;&nbsp;|&nbsp;&nbsp;" + generos : ""}

    `;

    modalDescricao.innerHTML =
        item.overview || "Sinopse não disponível.";

}

/* ===========================
   ONDE ASSISTIR
=========================== */

async function carregarOndeAssistir(id, tipo) {

    const dados = await api(`/${tipo}/${id}/watch/providers`);

    modalProviders.innerHTML = "<h3>Onde assistir</h3>";

    if (
        !dados.results ||
        !dados.results.BR
    ) {

        modalProviders.innerHTML +=

            "<p>Não encontramos plataformas disponíveis para o Brasil.</p>";

        return;

    }

    const br = dados.results.BR;

    if (br.flatrate) {

        const lista = document.createElement("div");

        lista.className = "providers";

        br.flatrate.forEach(provider => {

            lista.innerHTML += `

                <div class="provider">

                    <img
                        src="https://image.tmdb.org/t/p/w92${provider.logo_path}"
                        alt="${provider.provider_name}">

                    <span>

                        ${provider.provider_name}

                    </span>

                </div>

            `;

        });

        modalProviders.appendChild(lista);

    }

    if (br.link) {

        modalProviders.innerHTML += `

            <p style="margin-top:20px">

                <a
                    href="${br.link}"
                    target="_blank"
                    class="assistir-btn">

                    Ver opções oficiais

                </a>

            </p>

        `;

    }

}

/* ===========================
   FECHAR
=========================== */

fecharModal.onclick = () => {

    modal.classList.remove("ativo");

};

modal.onclick = e => {

    if (e.target === modal) {

        modal.classList.remove("ativo");

    }

};

document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

        modal.classList.remove("ativo");

    }

});
