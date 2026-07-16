async function api(endpoint) {

    const url =
        `${CONFIG.API_URL}${endpoint}` +
        `${endpoint.includes("?") ? "&" : "?"}` +
        `api_key=${CONFIG.API_KEY}` +
        `&language=${CONFIG.LANGUAGE}`;

    console.log("URL:", url);

    const resposta = await fetch(url);

    const dados = await resposta.json();

    console.log("RESPOSTA:", dados);

    return dados;

}
