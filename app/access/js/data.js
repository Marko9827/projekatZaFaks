
window.Igralog = true;
var tabla = document.getElementById("tabla"),
    start_rs = document.querySelector("#tabla ul[data-ul='opcije'] li[data-opt='resume_start']"),
    start_st = document.querySelector("#tabla ul[data-ul='opcije'] li[data-opt='resume_stop']"),
    vremeigre = document.getElementById("vremeigre"),
    djig_cube2 = document.querySelector(".div-cocka"),
    djig_cube = document.querySelector(".div-cocka"),
    div_put = document.querySelector("div-put");
interval_150 = 150;
var vremenkusa,
    sekundara = 0,
    podaci = {
        temp: {
            class: "",
        },
        lang: {
            RS: [],
            EN: []
        },
        Igralog: "",
        REZLUTAT_A: 0,
        REZLUTAT_B: 0,
        poljeViseKomada: [
            /* Po resetovanju ide ovo {
                polje: false,
                pijuni: [
                    "A1"
                ]
            } */
        ],
        dice_rand: {
            0: "fa-dice-one",
            1: "fa-dice-one",
            2: "fa-dice-two",
            3: "fa-dice-three",
            4: "fa-dice-four",
            5: "fa-dice-five",
            6: "fa-dice-six"
        },
        kocka: 0,
        dodatna_bacanja: {
            A: 0,
            B: 0
        },
        kucice: {
            A: false,
            B: false
        },
        pijuni: [{
            pijun: "A1",
            grupa: "A",
            baza: 7,
            kucica: false
        },
        {
            pijun: "A2",
            grupa: "A",
            baza: 4,
            kucica: false

        },
        {
            pijun: "A3",
            grupa: "A",
            baza: true,
            kucica: false
        },
        {
            pijun: "A4",
            grupa: "A",
            baza: true,
            kucica: false

        },
        {
            pijun: "B1",
            grupa: "B",
            baza: true,
            kucica: false

        }, {
            pijun: "B2",

            grupa: "B",
            baza: true,
            kucica: true

        }, {
            pijun: "B3",

            grupa: "B",
            baza: 30,
            kucica: false

        },
        {
            pijun: "B4",

            grupa: "B",
            baza: true,
            kucica: false

        }
        ]
    };