window.Igralog = true;
var tabla = document.getElementById("tabla"),
    start_rs = document.querySelector("#tabla ul[data-ul='opcije'] li[data-opt='resume_start']"),
    start_st = document.querySelector("#tabla ul[data-ul='opcije'] li[data-opt='resume_stop']"),
    vremeigre = document.getElementById("vremeigre"),
    djig_cube2 = document.querySelector(".div-cocka"),
    djig_cube = document.querySelector(".div-cocka"),
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

        new igra.baze();
    };
    this.baze = function () {
        podaci.pijuni.forEach(function (v) {
            var grupa = 1;

            if (v.baza !== true) {
                new igra.pomerime_na_Broj_novi(v.baza, v.grupa, v.pijun);
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
    this.testiraj_kucice = function (vreme) {

        var i_K = 5,
            int2 = setInterval(() => {

                try {
                    i_K--;
                    var hv = document.querySelector(`#tabla div-put i[data-home='${i_K}']`);

                    document.querySelectorAll(`#tabla div-put i`).forEach(function (v2) {
                        v2.classList.remove("green_test");
                    });

                    if (hv.classList.contains("i-f-ignore-me-1")) {
                        hv.classList.add("green_test");
                    }


                    if (i_K == 0) {
                        clearInterval(int2);
                        document.querySelector("div-zam i").classList.add("green_test");

                        setTimeout(() => {
                            document.querySelector("div-zam i").classList.remove("green_test");
                            document.querySelector("li[data-opt='resume_start']").setAttribute("onclick", "igra.start();");
                            document.querySelector("li[data-opt='resume_start']").innerHTML = "Nova igra";

                            document.querySelector("li[data-opt='resume_stop']").removeAttribute("style");
                            document.querySelector("li[data-opt='resume_stop']").setAttribute("onclick", "igra.cancel();");
                            document.querySelector("li[data-opt='resume_stop']").innerHTML = "Zatvori igru";

                            new igra.stop_hardcore();
                        }, 1500);
                    }
                } catch (e) {
                    clearInterval(int2);
                    new igra.stop_hardcore();

                }
            }, vreme);
    };
    this.stop_hardcore = function () {
        podaci.pijuni.forEach(function (v) {
            v.baza = true;
            v.kucica = false;

        });
        document.querySelector("#tabla .bazaAB").classList.remove("active");
        new igra.stoperica(false);
        new igra.contoller_novi();
        document.querySelector("div-cocka").innerHTML = `<i class="div-cocka fas fa-dice"
            data-Dbacanje="0" 
        data-id="1" onclick="igra.fa_djig_cube(this);"></i>
            <span data-num-id="1">Bacite kocku.</span>`;
        podaci.dodatna_bacanja.A = 0;
        podaci.dodatna_bacanja.B = 0;
        document.querySelector("li[data-opt='resume_start']").setAttribute("onclick", "igra.start();");
        document.querySelector("li[data-opt='resume_start']").innerHTML = "Nova igra";


        document.querySelector("li[data-opt='resume_stop']").removeAttribute("style");
        document.querySelector("li[data-opt='resume_stop']").setAttribute("onclick", "igra.cancel();");
        document.querySelector("li[data-opt='resume_stop']").innerHTML = "Zatvori igru";

    };
    this.testiraj = function () {
        new igra.contoller();
        new igra.contoller_novi();
        new igra.msg("Bacite kocku.");

        var i = 0,
            i_K = 4,
            intervalFX = true,
            int = setInterval(() => {
                try {
                    i++;
                    document.querySelectorAll("#tabla div-put i").forEach(function (v) {
                        v.classList.remove("green_test");
                        v.classList.remove("purle_test");
                        v.classList.remove("naradzasta_test");
                        v.classList.remove("roza_test");

                    });
                    if (i == 7 || i == 4) {
                        document.querySelector(`#tabla div-put i[data-fld="${i}"]`).classList.add("purle_test");
                    } else if (i == 0 || i == 22) {
                        document.querySelector(`#tabla div-put i[data-fld="${i}"]`).classList.add("naradzasta_test");
                    } else if (i == 30) {
                        document.querySelector(`#tabla div-put i[data-fld="${i}"]`).classList.add("roza_test");
                    } else {
                        document.querySelector(`#tabla div-put i[data-fld="${i}"]`).classList.add("green_test");
                    }
                    if (i == 43) {

                        document.querySelectorAll("#tabla div-put i").forEach(function (v) {

                            v.classList.remove("green_test");
                            v.classList.remove("purle_test");
                            v.classList.remove("naradzasta_test");
                            v.classList.remove("roza_test");

                        });

                        igra.testiraj_kucice(150);
                        clearInterval(int);
                    }


                } catch (e) { }
            }, 150);


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
            console.log(`${igra.vremeDatum()}, ${msg}`);
        }
        return false;
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

        if (window.confirm("Sigurni ste za stopiranje igre?\n Vaš rezlutat će biti izgubljen!")) {

            igra.stop_hardcore();
        }
    };
    this.cancel = function () {
        if (window.confirm("Sigurni ste za zatvaranje igre?\n Vaš rezlutat će biti izgubljen! (ZATVARA KARTICU)")) {
            window.close();
        }
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
                  v.preventDefault();broj_kocke
                  new igra.pomerime_na_Broj(v, br);
              });
          });*/
    };
    this.broj_kocke = function () {
        var num = parseInt(document.querySelector("#tabla div-cocka i").getAttribute("data-number"));
        console.log(num);
        return num;
    };
    this.kucica = function (b, b2) {

    };

    this.menjanje_baze_broj = function (br, t, pijun) {
        var brGTA = this.broj_kocke();
        number = parseInt(br) + parseInt(brGTA);

        podaci.pijuni.forEach(function (v) {
            if (v.pijun == pijun) {
                v.baza = number;
                new igra.msg(v.pijun, v.baza);
                igra.pomerime_na_Broj_novi(number, v.grupa, v.pijun);
            }
        });
        console.clear();
        igra.logger(JSON.stringify(podaci.pijuni), JSON.stringify(podaci.dodatna_bacanja));

    };
    this.pomerime_na_Broj_novi = function (br, grupa, pijun) {
        var polje = document.querySelector(` div-put i[data-fld='${br}']`);
        temp = polje.getAttribute("class");
        igra.logger(br, grupa, pijun);

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
                polje.setAttribute("class", "i-home-put pijun_A i-put fas fa-horse-head");
                polje.setAttribute("onclick", `igra.menjanje_baze_broj("${br}","A","${pijun}"); igra.pijun_empty(this);`);
            } else {
                polje.setAttribute("class", "i-home-put pijun_B i-put far fa-user");
                polje.setAttribute("onclick", `igra.menjanje_baze_broj("${br}","B","${pijun}"); igra.pijun_empty(this);`);

            }
        } else {
            if (grupa == "A") {
                polje.setAttribute("class", "i-put pijun_A fas fa-horse-head");
                polje.setAttribute("onclick", `igra.menjanje_baze_broj("${br}","A","${pijun}"); igra.pijun_empty(this);`);

            } else {
                polje.setAttribute("class", "i-put pijun_B far fa-user");
                polje.setAttribute("onclick", `igra.menjanje_baze_broj("${br}","B","${pijun}"); igra.pijun_empty(this);`);
            }
        }
    };
    this.pomerime_na_Broj_novi_click = function (tt, br, grupa, pijun) {
        var polje = document.querySelector(` div-put i[data-fld='${br}']`);
        temp = polje.getAttribute("class");
        console.log(br, grupa, pijun);





        document.querySelectorAll("#tabla div-put-coll div-i i").forEach(function (H) {
            if (H.classList.contains("i-f-ignore-me-3") || H.classList.contains("i-f-ignore-me-2") || H.classList.contains("i-f-ignore-me-1")) { } else {
                if (H.classList.contains("i-home-put")) {
                    H.setAttribute("class", "i-home-put far fa-dot-circle");
                } else {
                    H.setAttribute("class", "i-put far fa-dot-circle");
                }
                H.removeAttribute("onclick");
                H.removeAttribute("data-id");
            }
        });


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
                polje.setAttribute("class", "i-home-put pijun_A i-put fas fa-horse-head");
                polje.setAttribute("onclick", `igra.menjanje_baze_broj("${br}","A","${pijun}"); igra.pijun_empty(this);`);
            } else {
                polje.setAttribute("class", "i-home-put pijun_B i-put far fa-user");
                polje.setAttribute("onclick", `igra.menjanje_baze_broj("${br}","B","${pijun}"); igra.pijun_empty(this);`);

            }
        } else {
            if (grupa == "A") {
                polje.setAttribute("class", "i-put pijun_A fas fa-horse-head");
                polje.setAttribute("onclick", `igra.menjanje_baze_broj("${br}","A","${pijun}"); igra.pijun_empty(this);`);

            } else {
                polje.setAttribute("class", "i-put pijun_B far fa-user");
                polje.setAttribute("onclick", `igra.menjanje_baze_broj("${br}","B","${pijun}"); igra.pijun_empty(this);`);
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
            if (parseInt($("#tabla div-cocka i").attr("data-dbacanje")) == 0) {
                if (parseInt(djig_cube2.getAttribute("data-id")) == 1) {
                    djig_cube2.setAttribute("data-id", 2);
                } else {
                    djig_cube2.setAttribute("data-id", 1);
                }
            }
            this.msg("Bacite kocku.");
        }
        if (parseInt($("#tabla div-cocka i").attr("data-dbacanje")) == 0) {
            div_put.removeAttribute("active");
        }
        this.event_clicker();
    };
    this.pijun_novi = function (name) {
        if (parseInt(djig_cube2.getAttribute("data-id")) == 1) {
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
    this.pijun_empty = function (v) {
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
        v.removeAttribute("onclick");
        v.removeAttribute("data-home");
        v.removeAttribute("data-fldh");
        v.removeAttribute("data-group");

        var djig_cube2 = document.querySelector("#tabla div-cocka i");
        if (parseInt(djig_cube2.getAttribute("data-id")) == 1) {
            if (podaci.dodatna_bacanja.A > 0) {
                podaci.dodatna_bacanja.A -= 1;
                djig_cube2.setAttribute("data-Dbacanje", podaci.dodatna_bacanja.A);
                igra.logger(`Oduzeto bacanje -1 ukupno: ${djig_cube2.getAttribute("data-Dbacanje")}`);
            }
        }
        if (parseInt(djig_cube2.getAttribute("data-id")) == 2) {
            if (podaci.dodatna_bacanja.B > 0) {
                podaci.dodatna_bacanja.B -= 1;
                djig_cube2.setAttribute("data-Dbacanje", podaci.dodatna_bacanja.B);
                igra.logger(`Oduzeto bacanje -1 ukupno: ${djig_cube2.getAttribute("data-Dbacanje")}`);


            }

        }
        if (parseInt(djig_cube2.getAttribute("data-id")) == 1 ||
            parseInt(djig_cube2.getAttribute("data-dbacanje")) == 0) {
            // if (parseInt(djig_cube2.getAttribute("data-id")) == 1) {

            djig_cube2.classList.remove("disabled");
            if (parseInt(djig_cube2.getAttribute("data-dbacanje")) == 0) {
                djig_cube2.setAttribute("data-id", 2);
            }
            if (document.querySelectorAll(".pijun_A").length == 0) {
                div_put.removeAttribute("active");
            }
            //}
        }
        //  if (parseInt(djig_cube2.getAttribute("data-id")) == 2) {
        if (parseInt(djig_cube2.getAttribute("data-id")) == 2 ||
            parseInt(djig_cube2.getAttribute("data-dbacanje")) == 0) {
            djig_cube2.classList.remove("disabled");
            if (document.querySelectorAll(".pijun_B").length == 0) {
                div_put.removeAttribute("active");
            }
            if (parseInt(djig_cube2.getAttribute("data-dbacanje")) == 0) {
                djig_cube2.setAttribute("data-id", 1);
            }

            //djig_cube2.setAttribute("data-id", 1);

            //            }
        }

    };
    this.pijun = function (name) {
        djig_cube2.setAttribute("class", "div-cocka  fas fa-dice");
        document.querySelector(`div-baza1, div-baza2`).classList.remove("active");
        if (parseInt(djig_cube2.getAttribute("data-dbacanje")) == 0) {


            if (parseInt(djig_cube2.getAttribute("data-id")) == 1) {
                div_put.setAttribute("active", 1);
            } else {
                div_put.setAttribute("active", 2);
            }
        }


        var h = name.getAttribute("data-fldh"),
            rplNUM = h.replace(/([A-Z])|[a-z]\w+/, ""),
            rplNumH = name.getAttribute("data-gr"),
            numb_class = "pijun_A fas fa-horse-head";
        numb = 0,
            num = parseInt(djig_cube2.getAttribute("data-id"));
        if (name.getAttribute("data-group") == "B") {
            numb = 22;
            numb_class = "pijun_B far fa-user";
        }
        if (rplNumH == 1) {
            new igra.pomerime_na_Broj_novi(0, "A", h);
        } else {
            new igra.pomerime_na_Broj_novi(22, "B", h);

        }
        data_fld = document.querySelector(`#tabla div-put i[data-fld='${numb}']`);
        data_fld.setAttribute("class", `i-home-put i-put ${numb_class}`);
        data_fld.setAttribute("data-fldh", h);
        data_fld.setAttribute("data-group", name.getAttribute("data-group"));
        if (rplNumH == 1) {
            data_fld.setAttribute("onclick", `igra.menjanje_baze_broj(0,"A","${h}"); igra.pijun_empty(this);`); //pomerime_na_Broj(this)");
        } else {
            data_fld.setAttribute("onclick", `igra.menjanje_baze_broj(22,"B","${h}"); igra.pijun_empty(this);`); //pomerime_na_Broj(this)");
        }
        name.classList.add("disabled");
        djig_cube2.classList.remove("disabled");
        data_fld.setAttribute("style", "pointer-events:none !important;");
        div_put.setAttribute("active", rplNumH);
        if (podaci.kocka > 0) {
            document.querySelector("#tabla div-cocka i").classList.remove("disabled");
            this.msg(`Bacite ponovo kocku. Imate jedno ${podaci.kocka} dodatno bacanje`);

        } else {

            document.querySelector("div-baza2").classList.remove("active");
            document.querySelector("div-baza1").classList.remove("active");
            /*
            if (parseInt(djig_cube2.getAttribute("data-id")) == 1) {
                podaci.dodatna_bacanja.A = 1;
                $("#tabla div-cocka i").attr("data-Dbacanje",1)
                if (parseInt(djig_cube2.getAttribute("data-dbacanje")) == 0) {
                    djig_cube2.setAttribute("data-id", 2);
                }
                    document.querySelector("div-baza2").classList.add("active");
                    document.querySelector("div-cocka").innerHTML = `<i class="div-cocka fas fa-dice" data-id="1" onclick="igra.fa_djig_cube(this);"></i>
            <span data-num-id="1">Bacite kocku.</span>`;

                    djig_cube2.setAttribute("data-id", 2);
                }
            }
            if (parseInt(djig_cube2.getAttribute("data-id")) == 2) {
                podaci.dodatna_bacanja.B = 1;
                if (podaci.dodatna_bacanja.B == 0) {
                    document.querySelector("div-baza1").classList.add("active");
                    document.querySelector("div-cocka").innerHTML = `<i class="div-cocka fas fa-dice" data-id="1" onclick="igra.fa_djig_cube(this);"></i>
            <span data-num-id="1">Bacite kocku.</span>`;

                    djig_cube2.setAttribute("data-id", 1);
                }
            }*/
            this.msg("Bacite kocku.");
        }
        this.event_clicker();
        djig_cube2.setAttribute("data-number", 0);
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

        /*/  - if (AkockaTRi_Puta > 0) {
        if (parseInt(djig_cube2.getAttribute("data-id")) == 1) {

            if (podaci.dodatna_bacanja.A > 0) {
                podaci.dodatna_bacanja.A -= 1;
            }
            if (podaci.dodatna_bacanja.A == 0) {
                //    div_put.setAttribute("active", 1);
            }
        } else {
            if (podaci.dodatna_bacanja.B > 0) {
                podaci.dodatna_bacanja.B -= 1;
            }
            if (podaci.dodatna_bacanja.B > 0) {
                //  div_put.setAttribute("active", 2);

            }
        }*/

        document.querySelector(`div-baza1`).classList.remove("active");
        document.querySelector(`div-baza2`).classList.remove("active");
        //}

        if (vvv == 6) {



            podaci.kocka = 0;
            podaci.kocka += 1;
            document.querySelector(`div-baza${cub}`).classList.add("active");
            djig_cube.classList.add("disabled");
            new igra.msg("Odaberite slobodnog pijuna ili igrajte sa 'izbačenim'!");
            igra.logger(JSON.stringify(podaci.dodatna_bacanja) + "\n" + cub);


            div_put.setAttribute("active", cub);

            // if (podaci.dodatna_bacanja.A == 0) {
            if (cub == 1) {
                podaci.dodatna_bacanja.A += 1;
                $("#tabla div-cocka i").attr("data-Dbacanje", podaci.dodatna_bacanja.A);
            }
            if (cub == 2) {
                podaci.dodatna_bacanja.B += 1;
                $("#tabla div-cocka i").attr("data-Dbacanje", podaci.dodatna_bacanja.B);
            }
            igra.logger(`Dodatno bacanje +1 ukupno: ${djig_cube2.getAttribute("data-Dbacanje")}`);



            document.querySelector(`div-baza${cub}`).classList.add("active");
            // djig_cube.classList.add("disabled");
            igra.logger(podaci.dodatna_bacanja + "\n" + cub);


        } else {

            /*
                        if (podaci.kocka > 0) {
                            podaci.kocka -= 1;
                        }
                        if (parseInt(djig_cube2.getAttribute("data-id")) == 1) {
                            if (podaci.dodatna_bacanja.A > 0) {
                                podaci.dodatna_bacanja.A -= 1;
                                djig_cube2.setAttribute("data-Dbacanje", podaci.dodatna_bacanja.A);
                                igra.logger(`Oduzeto bacanje -1 ukupno: ${djig_cube2.getAttribute("data-Dbacanje")}`);
                            }
                        }
                        if (parseInt(djig_cube2.getAttribute("data-id")) == 2) {
                            if (podaci.dodatna_bacanja.B > 0) {
                                podaci.dodatna_bacanja.B -= 1;
                                djig_cube2.setAttribute("data-Dbacanje", podaci.dodatna_bacanja.B);
                                igra.logger(`Oduzeto bacanje -1 ukupno: ${djig_cube2.getAttribute("data-Dbacanje")}`);
            
            
                            }
            
                        }*/
            /*/document.querySelector(`div-baza${cub}`).classList.add("active");
            if (parseInt(djig_cube2.getAttribute("data-id")) == 2) {
                if (document.querySelectorAll(".pijun_A").length > 0) {
                    djig_cube.classList.add("disabled");
                    div_put.setAttribute("active",2);
                    new igra.msg("Odaberi pijuna sa kojim ćeš da načiniš potez!");
                    new igra.logger("Kocka - 2");
                }else{
                    div_put.setAttribute("active", 1);
                    new igra.msg("Odaberi pijuna sa kojim ćeš da prvi načiniš potez!");
                    new igra.logger("Kocka - 1");
                }
            }
            if (parseInt(djig_cube2.getAttribute("data-id")) == 1) {
                if (document.querySelectorAll(".pijun_B").length > 0) {
                    djig_cube.classList.add("disabled");
                    div_put.setAttribute("active", 1);
                    new igra.msg("Odaberi pijuna sa kojim ćeš da načiniš potez!");
                    new igra.logger("Kocka - 1");
                }else{
                    div_put.setAttribute("active", 2);
                    new igra.msg("Odaberi pijuna sa kojim ćeš da prvi načiniš potez!");
                    new igra.logger("Kocka - 2");
                }
                
            }*/
            //igra.kosledecibacaKocku("");
            djig_cube2.classList.add("disabled");
            igra.kosledecibacaKocku(djig_cube2.getAttribute("data-id"));
        }
        //  }
        document.querySelectorAll("div-put .fa-horse-head, div-put .fa-user").forEach(function (v) {
            v.removeAttribute("style");
        });
        igra.logger(JSON.stringify(podaci.dodatna_bacanja), djig_cube.getAttribute("data-number"));
        if (vvv !== 6) {

        }

        if (parseInt($("#tabla div-cocka i").attr("data-Dbacanje")) == 0) {
            if (parseInt($("#tabla div-cocka i").attr("data-id")) == 1) {
                $("#tabla div-cocka i").attr("data-id", 2);
            } else {
                $("#tabla div-cocka i").attr("data-id", 1);

            }
        }
    };
    this.kocka = function (sta) {
        if (sta == "A") {
            $("#tabla div-cocka i").attr("data-id", 1);
        } else if (sta == "B") {
            $("#tabla div-cocka i").attr("data-id", 2);
        } else {
            $("#tabla div-cocka i").attr("data-id", sta);
        }
        $("#tabla div-cocka i").attr("data-dbacanje", 0)
    };
    this.kosledecibacaKocku = function (h) {
        document.querySelector("div-baza1").classList.remove("active");
        document.querySelector("div-baza2").classList.remove("active");

        var data_id = djig_cube2.getAttribute("data-id");
        if (parseInt(djig_cube2.getAttribute("data-id")) == 2) {

            if (document.querySelectorAll(".pijun_A").length > 0) {
                if (parseInt(djig_cube2.getAttribute("data-dbacanje")) == 0) {
                    djig_cube.classList.add("disabled");
                    div_put.setAttribute("active", 1);
                    new igra.msg("Odaberi pijuna sa kojim ćeš da načiniš potez!");
                    new igra.logger("Kocka - 2");
                }
            } else {
                div_put.setAttribute("active", 2);
                new igra.msg("Odaberi pijuna sa kojim ćeš da prvi načiniš potez!");
                new igra.logger("Kocka - 1");
            }
        }
    }
    if (parseInt(djig_cube2.getAttribute("data-id")) == 1) {
        if (parseInt(djig_cube2.getAttribute("data-dbacanje")) == 0) {
            if (document.querySelectorAll(".pijun_B").length > 0) {
                if (parseInt(djig_cube2.getAttribute("data-dbacanje")) == 0) {
                    djig_cube.classList.add("disabled");
                    div_put.setAttribute("active", 2);
                    new igra.msg("Odaberi pijuna sa kojim ćeš da načiniš potez!");
                    new igra.logger("Kocka - 1");
                }
            } else {
                div_put.setAttribute("active", 1);
                new igra.msg("Odaberi pijuna sa kojim ćeš da prvi načiniš potez!");
                new igra.logger("Kocka - 2");
            }
        }
    }
    /* if (podaci.dodatna_bacanja.A >= 0) {
          
         document.querySelector("div-cocka").innerHTML = `<i class="div-cocka fas fa-dice" data-id="${data_id}"
          data-number="${djig_cube2.getAttribute("data-number")}" 
         onclick="igra.fa_djig_cube(this);"></i>
         <span data-num-id="1">Bacite kocku.</span>`;
         if (parseInt(h) == 2) {
             document.querySelector("div-baza1").classList.add("active");
         }
  }
     if (podaci.dodatna_bacanja.B >= 0) {
         document.querySelector("div-cocka").innerHTML = `<i class="div-cocka fas fa-dice" data-id="${data_id}"
          data-number="${djig_cube2.getAttribute("data-number")}" 
           onclick="igra.fa_djig_cube(this);"></i>
         <span data-num-id="1">Bacite kocku.</span>`;
         if (parseInt(h) == 1) {
             document.querySelector("div-baza2").classList.add("active");
         }
     }*/
};
};

var igra = new igra();
igra.testiraj();