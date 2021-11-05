window.Igralog = true;
const tabla = document.getElementById("tabla"),
    start_rs = document.querySelector("#tabla ul[data-ul='opcije'] li[data-opt='resume_start']"),
    vremeigre = document.getElementById("vremeigre"),
    djig_cube2 = document.querySelector(".div-cocka"),
    div_put = document.querySelector("div-put");
var vremenkusa,
    sekundara = 0,
    podaci = {
        temp: {
            class: "",
        },
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
            A: 3,
            B: 3
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
            baza: true,
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
            kucica: false

        }, {
            pijun: "B3",

            grupa: "B",
            baza: true,
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


var igra = function () {

    this.contoller_novi = function () {
        document.querySelectorAll("#tabla div-put-coll div-i i").forEach(function (v) {
            // Prvo resetuje sve živo na tabli, Ne vidi se golim okom odobri log consolu igra.log(1); !
            if (v.classList.contains("i-f-ignore-me-3")) {
                v.setAttribute("class", "disabled i-f-ignore-me-3 i-f-home far fa-user");
            } else if (v.classList.contains("i-f-ignore-me-1")) {
                v.setAttribute("class", "disabled i-f-ignore-me-1 i-f-home fas fa-horse-head");
            } else if (v.classList.contains("i-f-ignore-me-2")) {
                v.setAttribute("class", "disabled i-f-ignore-me-2 far fa-circle");
            } else if (v.classList.contains("i-home-put")) {
                v.setAttribute("class", "i-home-put i-put far fa-dot-circle");
            } else {
                v.setAttribute("class", "i-put far fa-dot-circle");
            }
        });

        this.baze();
    };
    this.baze = function () {
        podaci.pijuni.forEach(function (v) {
            var grupa = 1;

            if (v.baza !== true) {
                igra.pomerime_na_Broj_novi(v.baza, v.grupa);
                document.querySelector(`#tabla .bazaAB i[data-fldh="${v.pijun}"]`).classList.add("disabled");
            } else {
                document.querySelector(`#tabla .bazaAB i[data-fldh="${v.pijun}"]`).classList.remove("disabled");
            }

        });

    };

    this.stoperica = function (tt) {
        checkTime = function (i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        };
        if (tt) {
            vremenkusa = setInterval(() => {
                sekundara++;
                vremeigre.innerHTML = checkTime(sekundara++) + "s";
            }, 1000);
        } else {
            clearInterval(vremenkusa);
            vremeigre.innerHTML = "0s";
        }
    };
    this.testiraj = function () {
        this.contoller();
        this.contoller_novi();
        this.msg("Bacite kocku.");
    };
    this.zakljucaj = function (w) {
        if (parseInt(w) == 1) {

        } else {

        }

    };
    this.vremeDatum = function () {
        var d = new Date();
        ff = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
        return ff;
    };
    this.logger = function (msg) {
        if (window.Igralog == true) {
            console.log(`${this.vremeDatum()}, ${msg}`);
        }
    };
    this.log = function (n) {
        var nm = parseInt(n);
        if (nm == 0) {
            window.Igralog = false;
        }
        if (nm == 1) {
            window.Igralog = false;
        }
    };
    this.random_boja = function () {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        return `#${randomColor}`;
    };
    this.start = function () {
        tabla.removeAttribute("data-opt");
        start_rs.innerHTML = "Stopiraj igru";
        start_rs.setAttribute("data-id", "1");
        start_rs.setAttribute("onclick", "igra.stop();");

        this.logger("Igra startovana " + parseInt(start_rs.getAttribute("data-id")));
        this.stoperica(true);

    };
    this.stop = function () {
        window.location.reload();
    };
    this.contoller = function () {
        document.addEventListener("contextmenu", function (e) {
            e.preventDefault();
            return false;
        });

    };
    this.event_clicker = function (br) {
        /*  document.querySelectorAll("div-put[active='1'] .fa-horse-head").forEach(function (br) {
           try{   br.removeEventListener("click");
          }catch(e){}
              br.addEventListener("click", function (v) {
                  v.preventDefault();
                  new igra.pomerime_na_Broj(v, br);
              });
          });*/
    };
    this.kucica = function (b, b2) {

    };

    this.menjanje_baze_broj = function (br, pijun) {
        var brGTA = djig_cube2.getAttribute("data-number"),
            number = parseInt(br) + parseInt(brGTA);

        podaci.pijuni.forEach(function (v) {
            if (v.pijun == pijun) {
                v.baza = number;
            }
        });
        this.contoller_novi();
    };
    this.pomerime_na_Broj_novi = function (br, grupa) {
        var polje = document.querySelector(`#tabla div-put i[data-fld='${br}']`),
            temp = polje.getAttribute("class");


        if (polje.getAttribute("data-fld") > 0) {
            var h = br - 1;
            if (h == 0 || h == 22) {
                document.querySelector(`#tabla div-put i[data-fld='${h}']`).setAttribute("class", "i-home-put i-put far fa-dot-circle");
            } else {
                document.querySelector(`#tabla div-put i[data-fld='${h}']`).setAttribute("class", " i-put far fa-dot-circle");
            }
        }
        if (br == 0 || br == 22) {
            if (grupa == "A") {
                polje.setAttribute("class", "i-home-put i-put fas fa-horse-head");
                polje.setAttribute("onclick", `igra.menjanje_baze_broj("${br}","${grupa}")`);
            } else {
                polje.setAttribute("class", "i-home-put i-put far fa-user");
                polje.setAttribute("onclick", `igra.menjanje_baze_broj("${br}","${grupa}")`);

            }
        } else {
            if (grupa == "A") {
                polje.setAttribute("class", "i-put fas fa-horse-head");
                polje.setAttribute("onclick", `igra.menjanje_baze_broj("${br}","${grupa}")`);

            } else {
                polje.setAttribute("class", "i-put far fa-user");
                polje.setAttribute("onclick", `igra.menjanje_baze_broj("${br}","${grupa}")`);
            }
        }
    };
    this.pomerime_na_Broj = function (br) {
        var brGTA = djig_cube2.getAttribute("data-number"),
            brGTA_this = br.getAttribute("data-fld"),
            number = parseInt(brGTA_this) + parseInt(brGTA),
            br2 = document.querySelector(`#tabla div-put i[data-fld="${number}"]`);
        //alert(number);
        try {
            var br2_str = br2.getAttribute("class");
        } catch (e) {

        }
        var br_str = br.getAttribute("class");

        try {
            br2.removeAttribute("onclick");
        } catch (e) { }
        try {
            br.removeAttribute("onclick");
        } catch (e) { }

        if (br2_str.includes("i-home-put")) {
            br.setAttribute("class", "i-home-put i-put far fa-dot-circle");
        } else {
            br.setAttribute("class", "i-put far fa-dot-circle");
        }
        if (br_str.includes("i-home-put")) {
            br2.setAttribute("class", "i-home-put i-put fas fa-horse-head");
            br2.setAttribute("onclick", `igra.pomerime_na_Broj(this)`);
            //   br2.setAttribute("data-fld", br.getAttribute("data-fld"));
        } else {
            br2.setAttribute("class", "i-put far fas fa-horse-head");
        }
        podaci.kocka -= 1;
        if (podaci.kocka > 0) {
            this.msg(`Bacite ponovo kocku. Imate jedno ${kocka} dodatno bacanje`);
        } else {
            if (parseInt(djig_cube2.getAttribute("data-id")) == 1) {
                djig_cube2.setAttribute("data-id", 2);
            } else {
                djig_cube2.setAttribute("data-id", 1);
            }
            this.msg("Bacite kocku.");
        }
        div_put.removeAttribute("active");
        this.event_clicker();
    };
    this.pijun_novi = function (name) {
        if (djig_cube2.getAttribute("data-id") == 1) {
            div_put.setAttribute("active", 1);
            document.querySelector(`#tabla div-baza1 i[data-fldh="${name}"]`).classList.add("disabled");
        } else {
            document.querySelector(`#tabla div-baza2 i[data-fldh="${name}"]`).classList.remove("disabled");
        }

        podaci.pijuni.forEach(function (v) {
            var grupa = 1;

            if (v.baza !== true) {
                v.grupa = "A";
            }
        });


    };
    this.pijun = function (name) {
        djig_cube2.setAttribute("class", "div-cocka  fas fa-dice");
        document.querySelector(`div-baza1, div-baza2`).classList.remove("active");
        if (djig_cube2.getAttribute("data-id") == 1) {
            div_put.setAttribute("active", 1);
        } else {
            div_put.setAttribute("active", 2);
        }
        var h = name.getAttribute("data-fldh"),
            rplNUM = h.replace(/([A-Z])|[a-z]\w+/, ""),
            rplNumH = name.getAttribute("data-gr"),
            numb_class = "fas fa-horse-head";
        numb = 0,
            num = parseInt(djig_cube2.getAttribute("data-id"));
        if (name.getAttribute("data-group") == "B") {
            numb = 22;
            numb_class = "far fa-user";
        }


        data_fld = document.querySelector(`#tabla div-put i[data-fld='${numb}']`);
        data_fld.setAttribute("class", `i-home-put i-put ${numb_class}`);
        data_fld.setAttribute("data-fldh", h);
        data_fld.setAttribute("data-group", name.getAttribute("data-group"));
        data_fld.setAttribute("onclick", "igra.contoller_novi()");//pomerime_na_Broj(this)");
        name.classList.add("disabled");
        djig_cube2.classList.remove("disabled");
        data_fld.setAttribute("style", "pointer-events:none !important;");
        div_put.setAttribute("active", rplNumH);
        if (podaci.kocka > 0) {

            this.msg(`Bacite ponovo kocku. Imate jedno ${data.kocka} dodatno bacanje`);

        } else {
            this.msg("Bacite kocku.");
        }
        this.event_clicker();
    };
    this.msg = function (msg) {
        document.querySelector("div-cocka span").innerHTML = msg;

    };
    this.fa_djig_cube = function (djig_cube) {

        var dice_rand = podaci.dice_rand;
        var timeout_seconds = 100;

        this.zakljucaj(1);
        var cub = parseInt(djig_cube.getAttribute("data-id"));
        var n1 = Math.round(Math.floor(Math.random() * 6) + 1);
        djig_cube.setAttribute("class", "div-cocka fas " + dice_rand[n1]);

        setTimeout(function () {
            var n1 = Math.round(Math.floor(Math.random() * 6) + 1);
            djig_cube.setAttribute("class", "div-cocka fas " + dice_rand[n1]);
            djig_cube.setAttribute("data-number", n1);
            setTimeout(function () {


                setTimeout(function () {
                    var n1 = Math.round(Math.floor(Math.random() * 6) + 1);
                    djig_cube.setAttribute("class", "div-cocka fas " + dice_rand[n1]);
                    djig_cube.setAttribute("data-number", n1);

                    setTimeout(function () {
                        var n1 = Math.round(Math.floor(Math.random() * 6) + 1);
                        djig_cube.setAttribute("class", "div-cocka fas " + dice_rand[n1]);
                        djig_cube.setAttribute("data-number", n1);
                        setTimeout(function () {
                            var vvv = Math.round(Math.floor(Math.random() * 6) + 1);


                            igra.cube_loadet(djig_cube, vvv);
                            // kockaTRi_Puta -= 1;

                        }, timeout_seconds);
                    }, timeout_seconds);

                }, timeout_seconds);
            }, timeout_seconds);
        }, timeout_seconds);

    };
    this.cube_loadet = function (djig_cube, vvv) {
        djig_cube.setAttribute("class", "div-cocka fas " + podaci.dice_rand[vvv]);
        new igra.zakljucaj(0);
        //       djig_cube.setAttribute("class", "div-cocka  fas fa-dice");
        document.querySelector(`div-baza1, div-baza2`).classList.remove("active");
        djig_cube.setAttribute("data-number", vvv);
        var cub = parseInt(djig_cube2.getAttribute("data-id"));

        //  - if (AkockaTRi_Puta > 0) {
        if (djig_cube2.getAttribute("data-id") == 1) {
            div_put.setAttribute("active", 1);
            if (podaci.dodatna_bacanja.A > 0) {
                podaci.dodatna_bacanja.A -= 1;
            }
        } else {
            div_put.setAttribute("active", 2);
            if (podaci.dodatna_bacanja.B > 0) {
                podaci.dodatna_bacanja.B -= 1;
            }
        }

        //}

        if (vvv == 6) {
            podaci.kocka += 1;
            document.querySelector(`div-baza${cub}`).classList.add("active");
            djig_cube.classList.add("disabled");
            new igra.msg("Odaberite slobodnog pijuna ili igrajte sa 'izbačenim'!");
            console.log(podaci.dodatna_bacanja);
            if (djig_cube2.getAttribute("data-id") == 1) {
                div_put.setAttribute("active", 1);
                if (podaci.dodatna_bacanja.A > 0) {
                    podaci.dodatna_bacanja.A += 1;
                }
            } else {
                div_put.setAttribute("active", 2);
                if (podaci.dodatna_bacanja.B > 0) {
                    podaci.dodatna_bacanja.B += 1;
                }
            }
        } else {
            if (podaci.kocka > 0) {
                podaci.kocka -= 1;
            }
            document.querySelector(`div-baza${cub}`).classList.add("active");
            djig_cube.classList.add("disabled");
            new igra.msg("Odaberite slobodnog pijuna ili igrajte sa 'izbačenim'!");
        }
        //  }
        document.querySelectorAll("div-put .fa-horse-head, div-put .fa-user").forEach(function (v) {
            v.removeAttribute("style");
        });
        console.log(podaci.dodatna_bacanja);
    };
};

var igra = new igra();
igra.testiraj();