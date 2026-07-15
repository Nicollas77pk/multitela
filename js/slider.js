document.addEventListener("DOMContentLoaded", iniciarSliders);

function iniciarSliders(){

    document.querySelectorAll(".slider").forEach(slider=>{

        const carrossel = slider.querySelector(".carrossel");

        const prev = slider.querySelector(".prev");

        const next = slider.querySelector(".next");

        let auto;

        function iniciar(){

            auto = setInterval(()=>{

                carrossel.scrollBy({

                    left:320,

                    behavior:"smooth"

                });

                if(
                    carrossel.scrollLeft >=
                    carrossel.scrollWidth -
                    carrossel.clientWidth - 20
                ){

                    carrossel.scrollTo({

                        left:0,

                        behavior:"smooth"

                    });

                }

            },4000);

        }

        function parar(){

            clearInterval(auto);

        }

        next.addEventListener("click",()=>{

            carrossel.scrollBy({

                left:320,

                behavior:"smooth"

            });

        });

        prev.addEventListener("click",()=>{

            carrossel.scrollBy({

                left:-320,

                behavior:"smooth"

            });

        });

        slider.addEventListener("mouseenter",parar);

        slider.addEventListener("mouseleave",iniciar);

        iniciar();

    });

}
