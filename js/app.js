fetch("../database/filmes.json")
    .then(response => response.json())
    .then(filmes => {

        document.getElementById("totalFilmes").textContent = filmes.length;

        let html = "";

        filmes.forEach(filme => {

            html += `
                <tr>

                    <td>${filme.id}</td>

                    <td>${filme.titulo}</td>

                    <td>${filme.ano}</td>

                    <td>

                        <a href="#" class="btn-editar">
                            Editar
                        </a>

                    </td>

                </tr>
            `;

        });

        document.getElementById("filmes").innerHTML = html;

    })
    .catch(error => {

        console.error(error);

    });
