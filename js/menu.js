/* ==========================================
   MENU MOBILE
========================================== */

const menu = document.getElementById("menu");
const menuToggle = document.getElementById("menuToggle");
const overlay = document.getElementById("menuOverlay");

function abrirMenu() {

    menu.classList.add("ativo");

    overlay?.classList.add("ativo");

    menuToggle.innerHTML = "✕";

    menuToggle.setAttribute("aria-label", "Fechar menu");

}

function fecharMenu() {

    menu.classList.remove("ativo");

    overlay?.classList.remove("ativo");

    menuToggle.innerHTML = "☰";

    menuToggle.setAttribute("aria-label", "Abrir menu");

}

if(menu && menuToggle){

    menuToggle.addEventListener("click", function(e){

        e.stopPropagation();

        if(menu.classList.contains("ativo")){

            fecharMenu();

        }else{

            abrirMenu();

        }

    });

}

/* ==========================================
   FECHA AO CLICAR EM UM LINK
========================================== */

document.querySelectorAll(".menu a").forEach(link=>{

    link.addEventListener("click", fecharMenu);

});

/* ==========================================
   FECHA AO CLICAR FORA
========================================== */

document.addEventListener("click",function(e){

    if(!menu.classList.contains("ativo")) return;

    if(
        !menu.contains(e.target) &&
        !menuToggle.contains(e.target)
    ){

        fecharMenu();

    }

});

/* ==========================================
   OVERLAY
========================================== */

overlay?.addEventListener("click", fecharMenu);

/* ==========================================
   ESC
========================================== */

document.addEventListener("keydown",function(e){

    if(e.key==="Escape"){

        fecharMenu();

        if(typeof fecharDropdown==="function"){

            fecharDropdown();

        }

    }

});

/* ==========================================
   DESKTOP
========================================== */

window.addEventListener("resize",function(){

    if(window.innerWidth>768){

        fecharMenu();

    }

});
