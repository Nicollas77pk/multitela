function criarCard(item, tipo = "movie") {

    const titulo = item.title || item.name || "Sem título";

    const poster = item.poster_path
        ? `${CONFIG.IMAGE_POSTER}${item.poster_path}`
        : "https://via.placeholder.com/342x513?text=Sem+Imagem";

    const nota = item.vote_average
        ? item.vote_average.toFixed(1)
        : "0.0";

    return `
        <div class="card"
             data-id="${item.id}"
             data-tipo="${tipo}">

            <img
                src="${poster}"
                alt="${titulo}"
                loading="lazy">

            <div class="card-info">

                <h3>${titulo}</h3>

                <span class="nota">
                    ⭐ ${nota}
                </span>

            </div>

        </div>
    `;
}


function renderizarCards(containerId, lista, tipo = "movie") {

    const container = document.getElementById(containerId);

    if (!container) return;

    lista.forEach(item => {

        if (!item.poster_path) return;

        container.innerHTML += criarCard(item, tipo);

    });

}
