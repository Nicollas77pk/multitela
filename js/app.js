fetch('../database/filmes.json')
.then(r => r.json())
.then(filmes => {

    document.getElementById("totalFilmes").textContent = filmes.length;

    let html = '';

    filmes.forEach(f => {

        html += `
        <tr>
            <td>${f.id}</td>
            <td>${f.titulo}</td>
            <td>${f.ano}</td>
            <td>
                <a href="#" class="btn-editar">Editar</a>
            </td>
        </tr>
        `;

    });

    document.getElementById("filmes").innerHTML = html;

});
