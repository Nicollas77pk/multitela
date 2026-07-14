fetch('../database/filmes.json')
    .then(response => response.json())
    .then(filmes => {

        const tabela = document.getElementById('filmes');

        filmes.forEach(filme => {

            tabela.innerHTML += `
                <tr>
                    <td>${filme.id}</td>
                    <td>${filme.titulo}</td>
                    <td>${filme.ano}</td>
                </tr>
            `;

        });

    });
