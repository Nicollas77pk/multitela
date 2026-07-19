const campoBusca = document.getElementById("campoBusca");

if(campoBusca){

    const wrapper = campoBusca.parentElement;

    wrapper.style.position = "relative";

    const lista = document.createElement("div");

    lista.className = "autocomplete";

    wrapper.appendChild(lista);

    let timeout = null;

    campoBusca.addEventListener("input",()=>{

        clearTimeout(timeout);

        const texto = campoBusca.value.trim();

        if(texto.length < 2){

            lista.style.display="none";

            return;

        }

        timeout = setTimeout(()=>{

            pesquisar(texto);

        },350);

    });

    async function pesquisar(texto){

        lista.style.display="block";

        lista.innerHTML='<div class="autocomplete-loading">Pesquisando...</div>';

        try{

            const dados = await api(

                `/search/multi?query=${encodeURIComponent(texto)}`
            );

            const resultados = dados.results.filter(item=>

                (item.media_type==="movie" || item.media_type==="tv")

                && item.poster_path

            ).slice(0,6);

            if(resultados.length===0){

                lista.innerHTML='<div class="autocomplete-empty">Nenhum resultado encontrado.</div>';

                return;

            }

            lista.innerHTML="";

            resultados.forEach(item=>{

                const div=document.createElement("div");

                div.className="autocomplete-item";

                const titulo=item.title || item.name;

                const ano=(item.release_date || item.first_air_date || "").substring(0,4);

                const tipo=item.media_type==="movie"

                    ? "🎬 Filme"

                    : "📺 Série";

                div.innerHTML=`

                    <img src="${CONFIG.IMAGE_POSTER}${item.poster_path}">

                    <div class="autocomplete-info">

                        <div class="autocomplete-title">

                            ${titulo}

                        </div>

                        <div class="autocomplete-meta">

                            ${tipo} • ${ano}

                        </div>

                    </div>

                `;

                div.onclick=()=>{

                    lista.style.display="none";

                    abrirModal(item.id,item.media_type);

                };

                lista.appendChild(div);

            });

        }

        catch(e){

            console.log(e);

        }

    }

    document.addEventListener("click",(e)=>{

        if(!wrapper.contains(e.target)){

            lista.style.display="none";

        }

    });

}
