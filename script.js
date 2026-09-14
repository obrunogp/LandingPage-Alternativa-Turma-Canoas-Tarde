document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       DADOS DA EQUIPE
       ===================================================== */

    const equipe = [

        {
            nome: "Integrante 01",
            area: "frontend",
            imagem: "assets/pessoa1.png"
        },

        {
            nome: "Integrante 02",
            area: "backend",
            imagem: "assets/pessoa2.png"
        },

        {
            nome: "Integrante 03",
            area: "dados",
            imagem: "assets/pessoa3.png"
        },

        {
            nome: "Integrante 04",
            area: "frontend",
            imagem: "assets/pessoa1.png"
        },

        {
            nome: "Integrante 05",
            area: "backend",
            imagem: "assets/pessoa2.png"
        },

        {
            nome: "Integrante 06",
            area: "dados",
            imagem: "assets/pessoa3.png"
        },

        {
            nome: "Integrante 07",
            area: "frontend",
            imagem: "assets/pessoa1.png"
        },

        {
            nome: "Integrante 08",
            area: "backend",
            imagem: "assets/pessoa2.png"
        },

        {
            nome: "Integrante 09",
            area: "dados",
            imagem: "assets/pessoa3.png"
        },

        {
            nome: "Integrante 10",
            area: "frontend",
            imagem: "assets/pessoa1.png"
        },

        {
            nome: "Integrante 11",
            area: "backend",
            imagem: "assets/pessoa2.png"
        },

        {
            nome: "Integrante 12",
            area: "dados",
            imagem: "assets/pessoa3.png"
        },

        {
            nome: "Integrante 13",
            area: "frontend",
            imagem: "assets/pessoa1.png"
        },

        {
            nome: "Integrante 14",
            area: "backend",
            imagem: "assets/pessoa2.png"
        },

        {
            nome: "Integrante 15",
            area: "dados",
            imagem: "assets/pessoa3.png"
        },

        {
            nome: "Integrante 16",
            area: "frontend",
            imagem: "assets/pessoa1.png"
        },

        {
            nome: "Integrante 17",
            area: "backend",
            imagem: "assets/pessoa2.png"
        },

        {
            nome: "Integrante 18",
            area: "dados",
            imagem: "assets/pessoa3.png"
        },

        {
            nome: "Integrante 19",
            area: "frontend",
            imagem: "assets/pessoa1.png"
        },

        {
            nome: "Integrante 20",
            area: "backend",
            imagem: "assets/pessoa2.png"
        },

        {
            nome: "Integrante 21",
            area: "dados",
            imagem: "assets/pessoa3.png"
        },

        {
            nome: "Integrante 22",
            area: "frontend",
            imagem: "assets/pessoa1.png"
        }

    ];


    /* =====================================================
       ELEMENTOS DO HTML
       ===================================================== */

    const cardsEquipe =
        document.getElementById("cardsEquipe");

    const btnPrev =
        document.getElementById("btnPrev");

    const btnNext =
        document.getElementById("btnNext");

    const filtros =
        document.querySelectorAll(".filtro");


    /* =====================================================
       ESTADO DO CARROSSEL
       ===================================================== */

    let equipeAtual = [...equipe];

    let paginaAtual = 0;


    /* =====================================================
       QUANTIDADE DE CARDS POR VEZ
       ===================================================== */

    function obterCardsPorPagina() {

        if (window.innerWidth <= 600) {
            return 1;
        }

        if (window.innerWidth <= 900) {
            return 2;
        }

        return 3;
    }


    /* =====================================================
       FORMATAÇÃO DA ÁREA
       ===================================================== */

    function formatarArea(area) {

        const nomes = {

            frontend: "Front-end",

            backend: "Back-end",

            dados: "Dados"

        };

        return nomes[area] || area;
    }


    /* =====================================================
       CRIAÇÃO DOS CARDS
       ===================================================== */

    function renderizarEquipe() {

        cardsEquipe.innerHTML = "";


        equipeAtual.forEach((pessoa) => {

            const card =
                document.createElement("article");


            card.classList.add("card-pessoa");


            card.innerHTML = `

                <img
                    src="${pessoa.imagem}"
                    alt="${pessoa.nome}"
                >

                <div>

                    <strong>
                        ${pessoa.nome}
                    </strong>

                    <small>
                        ${formatarArea(pessoa.area)}
                    </small>

                </div>

            `;


            cardsEquipe.appendChild(card);

        });


        paginaAtual = 0;

        atualizarCarrossel();
    }


    /* =====================================================
       ATUALIZAÇÃO DO CARROSSEL
       ===================================================== */

    function atualizarCarrossel() {

        const cards =
            cardsEquipe.querySelectorAll(
                ".card-pessoa"
            );


        /* Nenhum card */

        if (cards.length === 0) {

            btnPrev.disabled = true;

            btnNext.disabled = true;

            return;
        }


        const cardsPorPagina =
            obterCardsPorPagina();


        const totalPaginas =
            Math.ceil(
                equipeAtual.length /
                cardsPorPagina
            );


        /* Garante que a página atual
           nunca ultrapasse o limite */

        if (paginaAtual >= totalPaginas) {

            paginaAtual =
                Math.max(0, totalPaginas - 1);
        }


        const larguraCard =
            cards[0].getBoundingClientRect().width;


        const estilo =
            getComputedStyle(cardsEquipe);


        const gap =
            parseFloat(estilo.gap) || 0;


        const deslocamento =
            paginaAtual *
            cardsPorPagina *
            (larguraCard + gap);


        cardsEquipe.style.transform =
            `translateX(-${deslocamento}px)`;


        /* =================================================
           BOTÃO ANTERIOR
           ================================================= */

        btnPrev.disabled =
            paginaAtual === 0;


        /* =================================================
           BOTÃO PRÓXIMO
           ================================================= */

        btnNext.disabled =
            paginaAtual >= totalPaginas - 1;

    }


    /* =====================================================
       PRÓXIMO
       ===================================================== */

    btnNext.addEventListener(
        "click",
        () => {

            const cardsPorPagina =
                obterCardsPorPagina();


            const totalPaginas =
                Math.ceil(
                    equipeAtual.length /
                    cardsPorPagina
                );


            if (
                paginaAtual <
                totalPaginas - 1
            ) {

                paginaAtual++;

                atualizarCarrossel();
            }

        }
    );


    /* =====================================================
       ANTERIOR
       ===================================================== */

    btnPrev.addEventListener(
        "click",
        () => {

            if (paginaAtual > 0) {

                paginaAtual--;

                atualizarCarrossel();
            }

        }
    );


    /* =====================================================
       FILTROS
       ===================================================== */

    filtros.forEach((filtro) => {

        filtro.addEventListener(
            "click",
            () => {


                /* Remove o estado ativo */

                filtros.forEach((item) => {

                    item.classList.remove(
                        "ativo"
                    );

                });


                /* Ativa o filtro selecionado */

                filtro.classList.add(
                    "ativo"
                );


                const categoria =
                    filtro.dataset.filter;


                /* =================================================
                   TODOS
                   ================================================= */

                if (categoria === "todos") {

                    equipeAtual =
                        [...equipe];

                }


                /* =================================================
                   FILTRO POR ÁREA
                   ================================================= */

                else {

                    equipeAtual =
                        equipe.filter(
                            (pessoa) =>
                                pessoa.area ===
                                categoria
                        );

                }


                /* Recria os cards */

                renderizarEquipe();

            }

        );

    });


    /* =====================================================
       REDIMENSIONAMENTO DA JANELA
       ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            paginaAtual = 0;

            atualizarCarrossel();

        }
    );


    /* =====================================================
       INICIALIZAÇÃO
       ===================================================== */

    renderizarEquipe();

});