const menu = document.getElementById("menu");

const menuToggle = document.getElementById("menuToggle");

const overlay = document.getElementById("menuOverlay");

function abrirMenu(){

    menu.classList.add("ativo");

    overlay.classList.add("ativo");

    menuToggle.innerHTML="✕";

    document.body.style.overflow="hidden";

}

function fecharMenu(){

    menu.classList.remove("ativo");

    overlay.classList.remove("ativo");

    menuToggle.innerHTML="☰";

    document.body.style.overflow="";

}

menuToggle.addEventListener("click",()=>{

    if(menu.classList.contains("ativo")){

        fecharMenu();

    }else{

        abrirMenu();

    }

});

overlay.addEventListener("click",fecharMenu);

document.querySelectorAll(".menu a").forEach(link=>{

    link.addEventListener("click",fecharMenu);

});

window.addEventListener("resize",()=>{

    if(window.innerWidth>768){

        fecharMenu();

    }

});
