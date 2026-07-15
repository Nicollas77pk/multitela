function criarCard(item, tipo = "movie") {

    const titulo = item.title || item.name;

    const poster = item.poster_path
        ? CONFIG.IMAGE_POSTER + item.poster_path
        : "https://via.placeholder.com/342x513";

    const nota = item.vote_average
        ? item.vote_average.toFixed(1)
        : "-";

    const ano = (
        item.release_date ||
        item.first_air_date ||
        ""
    ).substring(0,4);

    return `

        <div
            class="card"
            data-id="${item.id}"
            data-tipo="${tipo}">

            <img
                src="${poster}"
                loading="lazy"
                alt="${titulo}">

            <div class="card-overlay">

                <div class="card-title">

                    ${titulo}

                </div>

                <div class="card-meta">

                    <span class="card-rating">

                        ⭐ ${nota}

                    </span>

                    <span>

                        ${ano}

                    </span>

                </div>

                <button class="card-btn">

                    Ver detalhes

                </button>

            </div>

        </div>

    `;

}
