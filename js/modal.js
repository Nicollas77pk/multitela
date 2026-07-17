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

   console.log(id);

console.log(tipo);
   
   modal.classList.add("ativo");

document.body.style.overflow="hidden";

    modalTitulo.innerHTML = "Carregando...";

    modalDescricao.innerHTML = "";

    modalMeta.innerHTML = "";

    modalProviders.innerHTML = "";
   
    modalTrailer.innerHTML = "";

    try {

        const detalhes = await api(`/${tipo}/${id}`);

        preencherModal(detalhes, tipo);

        await carregarOndeAssistir(id, tipo);

await carregarTrailer(id, tipo);

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
   FECHAR MODAL
=========================== */


function fecharModalFuncao(){

    if(modal){

        modal.classList.remove("ativo");

        document.body.style.overflow = "";

    }

}



if(fecharModal){

    fecharModal.addEventListener("click", function(e){

        e.stopPropagation();

        fecharModalFuncao();

    });

}



if(modal){

    modal.addEventListener("click", function(e){

        if(e.target === modal){

            fecharModalFuncao();

        }

    });

}



document.addEventListener("keydown", function(e){

    if(e.key === "Escape"){

        fecharModalFuncao();

    }

});





/* ===========================
   TRAILER YOUTUBE
=========================== */


async function carregarTrailer(id, tipo){


    try{


        const dados = await api(`/${tipo}/${id}/videos`);



        if(!dados.results || dados.results.length === 0){

            return;

        }



        const trailer = dados.results.find(video =>

            video.site === "YouTube" &&

            video.type === "Trailer"

        );



        if(!trailer){

            return;

        }



        modalTrailer.innerHTML = `


            <h3>

                🎬 Trailer

            </h3>


            <div class="trailer-box">


                <iframe

                src="https://www.youtube.com/embed/${trailer.key}"

                title="Trailer"

                frameborder="0"

                allowfullscreen>

                </iframe>


            </div>


        `;


    }catch(error){


        console.error(
            "Erro ao carregar trailer:",
            error
        );


    }


}
