const menu = document.getElementById("menu");
const menuToggle = document.getElementById("menuToggle");

if (menu && menuToggle) {

    menuToggle.addEventListener("click", () => {

        menu.classList.toggle("ativo");

        if (menu.classList.contains("ativo")) {

            menuToggle.innerHTML = "✕";

            menuToggle.setAttribute("aria-label", "Fechar menu");

        } else {

            menuToggle.innerHTML = "☰";

            menuToggle.setAttribute("aria-label", "Abrir menu");

        }

    });

}

/* Fecha ao clicar em um link */

document.querySelectorAll(".menu a").forEach(link => {

    link.addEventListener("click", () => {

        menu.classList.remove("ativo");

        menuToggle.innerHTML = "☰";

    });

});

/* Fecha clicando fora */

document.addEventListener("click", e => {

    if (

        menu.classList.contains("ativo") &&

        !menu.contains(e.target) &&

        !menuToggle.contains(e.target)

    ) {

        menu.classList.remove("ativo");

        menuToggle.innerHTML = "☰";

    }

});

/* Fecha ao voltar para desktop */

window.addEventListener("resize", () => {

    if (window.innerWidth > 768) {

        menu.classList.remove("ativo");

        menuToggle.innerHTML = "☰";

    }

});
