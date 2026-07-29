const modalSimilar = document.getElementById("modalSimilar");
const tituloSimilares = document.getElementById("tituloSimilares");

async function carregarSimilares(id, tipo = "movie") {

    if (!modalSimilar) return;

    modalSimilar.innerHTML = "<p>Carregando recomendações...</p>";

    try {

        const dados = await api(`/${tipo}/${id}/recommendations`);

        modalSimilar.innerHTML = "";

        if (!dados.results || dados.results.length === 0) {

            modalSimilar.innerHTML =
                "<p>Nenhuma recomendação encontrada.</p>";

            return;
        }

        if (tituloSimilares) {

            tituloSimilares.textContent =
                tipo === "movie"
                ? "🎬 Filmes parecidos"
                : "📺 Séries parecidas";

        }

        dados.results
            .slice(0, 6)
            .forEach(item => {

                modalSimilar.appendChild(
                    criarCard(item, tipo)
                );

            });

    } catch (erro) {

        console.error(erro);

        modalSimilar.innerHTML =
            "<p>Erro ao carregar recomendações.</p>";

    }

}
