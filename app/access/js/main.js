


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
    this.ucitaj_lang = function (what) {
        if (what == "RS") {

        } else if (what == "EN") {

        } else {

        }
    };
    this.lang = function (what) {
        fetch(`../lang/${what}.json`)
            .then(response => response.json())
            .then(data => {
                if (what == "EN") {
                    podaci.lang.EN = data;
                }
                if (what == "RS") {
                    podaci.lang.RS = data;
                }
            });
    };
    this.baze = function () {
        podaci.pijuni.forEach(function (v) {
            var grupa = 1;

            if (v.baza !== true) {
                if (v.grupa == "A") {
                    if (v.kucica !== false) {

                        new igra.pomerime_na_Broj_novi(v.baza, v.grupa, v.pijun);
                        document.querySelector(`#tabla .bazaAB i[data-fldh="${v.pijun}"]`).classList.add("disabled");

                    } else {
                        new igra.pomerime_na_Broj_novi(v.baza, v.grupa, v.pijun);
                        document.querySelector(`#tabla .bazaAB i[data-fldh="${v.pijun}"]`).classList.add("disabled");
                    }
                }
                if (v.grupa == "B") {
                    if (v.kucica !== false) {

                        new igra.pomerime_na_Broj_novi(v.baza, v.grupa, v.pijun);
                        document.querySelector(`#tabla .bazaAB i[data-fldb="${v.pijun}"]`).classList.add("disabled");

                    } else {
                        new igra.pomerime_na_Broj_novi(v.baza, v.grupa, v.pijun);
                        document.querySelector(`#tabla .bazaAB i[data-fldh="${v.pijun}"]`).classList.add("disabled");
                    }
                }
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
            int2 = setInterval(function () {

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
                            $("#rezlutat .fa-horse-head").addClass("koSledeciIgra");

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
    this.Hpobe = function (bh) {
        if (bh == "A") {
            document.querySelectorAll("#tabla div-put .i-f-ignore-me-1", function (h) {
                h.classList.remove("disabled ");
            });

            document.querySelectorAll("#tabla div-baza1 i", function (h) {
                h.classList.add("disabled ");
            });
        }
        if (bh == "B") {
            document.querySelectorAll("#tabla div-put .i-f-ignore-me-3", function (h) {
                h.classList.remove("disabled ");
            });

            document.querySelectorAll("#tabla div-baza2 i", function (h) {
                h.classList.add("disabled ");
            });
        }
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

        $("#rezlutat .fa-horse-head").addClass("koSledeciIgra");
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
                    if (i == 47) {

                        document.querySelectorAll("#tabla div-put i").forEach(function (v) {

                            v.classList.remove("green_test");
                            v.classList.remove("purle_test");
                            v.classList.remove("naradzasta_test");
                            v.classList.remove("roza_test");

                        });

                        //  igra.testiraj_kucice(150);
                        igra.testirajB(interval_150);
                        clearInterval(int);
                    }


                } catch (e) { }
            }, interval_150);


    };
    this.testirajB = function (int) {
        var i = 0,
            intB = setInterval(() => {
                try {
                    i++;
                    document.querySelectorAll("#tabla div-put i").forEach(function (v) {
                        v.classList.remove("green_test");
                        v.classList.remove("purle_test");
                        v.classList.remove("naradzasta_test");
                        v.classList.remove("roza_test");

                    });
                    if (i == 7 || i == 4) {
                        document.querySelector(`#tabla div-put i[data-fldB="${i}"]`).classList.add("purle_test");
                    } else if (i == 0 || i == 22) {
                        document.querySelector(`#tabla div-put i[data-fldB="${i}"]`).classList.add("naradzasta_test");
                    } else if (i == 30) {
                        document.querySelector(`#tabla div-put i[data-fldB="${i}"]`).classList.add("roza_test");
                    } else {
                        document.querySelector(`#tabla div-put i[data-fldB="${i}"]`).classList.add("green_test");
                    }
                    if (i == 47) {

                        document.querySelectorAll("#tabla div-put i").forEach(function (v) {

                            v.classList.remove("green_test");
                            v.classList.remove("purle_test");
                            v.classList.remove("naradzasta_test");
                            v.classList.remove("roza_test");

                        });

                        //  igra.testiraj_kucice(150);
                        setTimeout(() => {
                            document.querySelector("div-zam i").classList.remove("green_test");
                            document.querySelector("li[data-opt='resume_start']").setAttribute("onclick", "igra.start();");
                            document.querySelector("li[data-opt='resume_start']").innerHTML = "Nova igra";
                            $("#rezlutat .fa-horse-head").addClass("koSledeciIgra");
                            document.querySelector("li[data-opt='resume_stop']").removeAttribute("style");
                            document.querySelector("li[data-opt='resume_stop']").setAttribute("onclick", "igra.cancel();");
                            document.querySelector("li[data-opt='resume_stop']").innerHTML = "Zatvori igru";

                            new igra.stop_hardcore();
                        }, intB);
                        clearInterval(intB);
                    }


                } catch (e) { }
            }, int);
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
            podaci.Igralog += msg + " \n ";
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
        if (nm == 3) {
            var log_d = new Blob([podaci.Igralog], { type: "octet/stream" }),
                a = document.createElement("a");
            a.href = URL.createObjectURL(log_d);
            a.download = `Sačuvan rezlutat igre i log. Vreme: ${igra.vremeDatum()}.txt`;
            a.click();
            // podaci.Igralog = "";
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
        igra.logger(num);
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
        let polje;
        if (grupa == "A") {
            polje = document.querySelector(` div-put i[data-fld='${br}']`);
        }
        if (grupa == "B") {
            polje = document.querySelector(` div-put i[data-fldb='${br}']`);
        }
        temp = polje.getAttribute("class");
        igra.logger(br, grupa, pijun);
        if (grupa == "A") {
            if (polje.getAttribute("data-fld") > 0) {
                var h = br - 1;
                if (h == 0 || h == 22) {
                    document.querySelector(`#tabla div-put i[data-fld='${h}']`).setAttribute("class", "i-home-put i-put far fa-dot-circle");
                } else {
                    document.querySelector(`#tabla div-put i[data-fld='${h}']`).setAttribute("class", " i-put far fa-dot-circle");
                }
            }
        }
        if (grupa == "B") {
            if (polje.getAttribute("data-fldb") > 0) {
                var h = br - 1;
                if (h == 0 || h == 22) {
                    document.querySelector(`#tabla div-put i[data-fldb='${h}']`).setAttribute("class", "i-home-put i-put far fa-dot-circle");
                } else {
                    document.querySelector(`#tabla div-put i[data-fldb='${h}']`).setAttribute("class", " i-put far fa-dot-circle");
                }
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
        igra.logger(br, grupa, pijun);





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
                //  djig_cube2.setAttribute("data-id", 2);
                igra.kocka("B");
            }
            if (document.querySelectorAll(".pijun_A").length == 0) {
                div_put.removeAttribute("active");
            }
            //}
        }
        //  if (parseInt(djig_cube2.getAttribute("data-id")) == 2) {
        if (parseInt(djig_cube2.getAttribute("data-id")) == 2) {
            djig_cube2.classList.remove("disabled");
            if (document.querySelectorAll(".pijun_B").length == 0) {
                div_put.removeAttribute("active");
            }
            if (parseInt(djig_cube2.getAttribute("data-dbacanje")) == 0) {
                //    djig_cube2.setAttribute("data-id", 1);
                igra.kocka("A");
            }

            //djig_cube2.setAttribute("data-id", 1);

            //            }
        }

        if (parseInt(djig_cube2.getAttribute("data-dbacanje")) == 1) {
            if (parseInt($("#tabla div-cocka i").attr("data-number")) !== 6) {
                if (parseInt(djig_cube2.getAttribute("data-id")) == 2) {
                    igra.kocka("A");
                }
                if (parseInt(djig_cube2.getAttribute("data-id")) == 1) {
                    igra.kocka("B");
                }
                podaci.dodatna_bacanja.A = 0;
                podaci.dodatna_bacanja.B = 0;
            }
        }
        if (parseInt(djig_cube2.getAttribute("data-dbacanje")) == 0) {
            div_put.removeAttribute("ative");
        }
        document.querySelector("div-baza1").classList.remove("active");
        document.querySelector("div-baza2").classList.remove("active");
        igra.koje_pobedio();
    };
    this.koje_pobedio = function () {

        if ($(`div-baza1 .disabled`).length < 4) {
            document.querySelectorAll("i-f-ignore-me-1").forEach(function (v) {
                if (v.classList.contains("pijun_A")) {
                    podaci.REZLUTAT_A++;
                }
            });
        };
        if ($(`div-baza2 .disabled`).length < 4) {
            document.querySelectorAll("i-f-ignore-me-3").forEach(function (v) {
                if (v.classList.contains("pijun_B")) {
                    podaci.REZLUTAT_B++;
                }
            });
        };
        document.querySelector("#rezlutat").innerHTML = `
        <i class="fas fa-horse-head"></i> ${podaci.REZLUTAT_A}:${podaci.REZLUTAT_B} <i class="far fa-user koSledeciIgra"></i>`;
        if (podaci.REZLUTAT_A == 4) {
            alert("Pobedio je igrač A! \n Kada potvrdiš pohvalu igra će početi izpočetka!");
            igra.stop();
        }
        if (podaci.REZLUTAT_B == 4) {
            alert("Pobedio je igrač B! \n Kada potvrdiš pohvalu igra će početi izpočetka!");
            igra.stop();
        }
    }
    this.pijunB = function (name) {
        djig_cube2.setAttribute("class", "div-cocka  fas fa-dice");
        document.querySelector(`div-baza1, div-baza2`).classList.remove("active");
        if (parseInt(djig_cube2.getAttribute("data-dbacanje")) == 0) {


            div_put.setAttribute("active", 2);

        }


        var h = name.getAttribute("data-fldh"),
            rplNUM = h.replace(/([A-Z])|[a-z]\w+/, ""),
            rplNumH = name.getAttribute("data-gr"),
            numb_class = "pijun_A fas fa-horse-head";
        numb = 0,
            num = parseInt(djig_cube2.getAttribute("data-id"));
        if (name.getAttribute("data-group") == "B") {
            numb = 0;
            numb_class = "pijun_B far fa-user";
        }

        new igra.pomerime_na_Broj_novi(0, "B", 2);

        data_fld = document.querySelector(`#tabla div-put i[data-fldb='${numb}']`);
        data_fld.setAttribute("class", `i-home-put i-put ${numb_class}`);
        data_fld.setAttribute("data-fldh", h);
        data_fld.setAttribute("data-group", name.getAttribute("data-group"));

        data_fld.setAttribute("onclick", `igra.menjanje_baze_broj(0,"B","${h}"); igra.pijun_empty(this);`); //pomerime_na_Broj(this)");

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

            this.msg("Bacite kocku.");
        }
        this.event_clicker();
        djig_cube2.setAttribute("data-number", 0);
    };
    this.pijun = function (name) {
        djig_cube2.setAttribute("class", "div-cocka  fas fa-dice");
        $("#tabla div-cocka i").removeClass("disabled");
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

            this.msg("Bacite kocku.");
        }
        this.event_clicker();
        djig_cube2.setAttribute("data-number", 0);
    };
    this.msg = function (msg) {
        document.querySelector("div-cocka span").innerHTML = msg;
        document.querySelector("div-cocka i").setAttribute("title", msg);
    };
    this.fa_djig_cube = function (djig_cube) {


        var dice_rand = podaci.dice_rand;
        var timeout_seconds = 50;

        this.zakljucaj(1);
        var cub = parseInt(djig_cube.getAttribute("data-id"));
        var n1 = Math.round(Math.floor(Math.random() * 6) + 1);
        djig_cube.setAttribute("class", "div-cocka disabled fas " + dice_rand[n1]);

        setTimeout(function () {
            var n1 = Math.round(Math.floor(Math.random() * 6) + 1);
            djig_cube.setAttribute("class", "div-cocka disabled fas " + dice_rand[n1]);
            djig_cube.setAttribute("data-number", n1);
            setTimeout(function () {


                setTimeout(function () {
                    var n1 = Math.round(Math.floor(Math.random() * 6) + 1);
                    djig_cube.setAttribute("class", "div-cocka disabled fas " + dice_rand[n1]);
                    djig_cube.setAttribute("data-number", n1);
                    setTimeout(function () {
                        var n1 = Math.round(Math.floor(Math.random() * 6) + 1);
                        djig_cube.setAttribute("class", "div-cocka disabled fas " + dice_rand[n1]);
                        djig_cube.setAttribute("data-number", n1);
                        setTimeout(function () {
                            var n1 = Math.round(Math.floor(Math.random() * 6) + 1);
                            djig_cube.setAttribute("class", "div-cocka disabled fas " + dice_rand[n1]);
                            djig_cube.setAttribute("data-number", n1);

                            setTimeout(function () {
                                var n1 = Math.round(Math.floor(Math.random() * 6) + 1);
                                djig_cube.setAttribute("class", "div-cocka disabled fas " + dice_rand[n1]);
                                djig_cube.setAttribute("data-number", n1);
                                setTimeout(function () {
                                    var vvv = Math.round(Math.floor(Math.random() * 6) + 1);


                                    igra.cube_loadet(djig_cube, vvv);
                                    // kockaTRi_Puta -= 1;
                                    $("#tabla div-cocka i").removeClass("disabled");
                                }, timeout_seconds);
                            }, timeout_seconds);

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
        var cub = parseInt($("#tabla div-cocka i").attr("data-id"));

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
            $("#tabla div-cocka i").addClass("disabled");
            $(`div-baza1, div-baza2`).removeClass("active");
            podaci.kocka = 0;
            podaci.kocka += 1;
            if ($(`div-baza${cub} .disabled`).length < 4) {
                $(`div-baza${cub}`).addClass("active");
            }
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



            if ($(`div-baza${cub} .disabled`).length < 4) {
                $("#rezlutat .fa-horse-head").removeClass("koSledeciIgra");
                $("#rezlutat .fa-user").removeClass("koSledeciIgra");
                if (cub == 1) {
                    $("#rezlutat .fa-horse-head").addClass("koSledeciIgra");
                    $("div-baza1").addClass("active");

                } else {
                    $("#rezlutat .fa-user").addClass("koSledeciIgra");
                    $("div-baza2").addClass("active");

                }
                //    document.querySelector(`div-baza${cub}`).classList.add("active");
                $(`div-baza${cub}`).addClass("active");

            }
            // djig_cube.classList.add("disabled");
            igra.logger(podaci.dodatna_bacanja + "\n" + cub);



        } else {
            var aer = parseInt(djig_cube2.getAttribute("data-Dbacanje"));
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
            //igra.kosledecHibacaKocku("");
            if (aer > 0) {
                aer--;
                djig_cube2.setAttribute("data-Dbacanje", aer);
            }
            djig_cube2.classList.add("disabled");


            //  }---
            document.querySelectorAll("div-put .fa-horse-head, div-put .fa-user").forEach(function (v) {
                v.removeAttribute("style");
            });
            igra.logger(JSON.stringify(podaci.dodatna_bacanja), djig_cube.getAttribute("data-number"));
            if (vvv == 6) {
                djig_cube2.classList.add("disabled");
                igra.kosledecibacaKocku(vvv);
            }

            if (parseInt($("#tabla div-cocka i").attr("data-Dbacanje")) == 0) {
                if (parseInt($("#tabla div-cocka i").attr("data-id")) == 1) {
                    //$("#tabla div-cocka i").attr("data-id", 2);
                    igra.kocka("B");
                } else {
                    //$("#tabla div-cocka i").attr("data-id", 1);
                    igra.kocka("A");
                }
            }

        }
    };
    this.kocka = function (sta) {
        $("#rezlutat i").removeClass("koSledeciIgra");

        if (sta == "A") {
            $("#tabla div-cocka i").attr("data-id", 1);
            $("#rezlutat .fa-horse-head").addClass("koSledeciIgra");
            div_put.setAttribute("active", 1);
            if (document.querySelectorAll(".pijun_A").length > 0) {
                if (parseInt(djig_cube2.getAttribute("data-dbacanje")) == 0) {
                    djig_cube.classList.add("disabled");
                    div_put.setAttribute("active", 1);
                    $("div-baza1").removeClass("active");
                    if ($("#tabla div-cocka i").attr("data-number") == 6) {
                        $("div-baza1").addClass("active");
                    }
                }
            }
        } else if (sta == "B") {
            $("#tabla div-cocka i").attr("data-id", 2);
            $("#rezlutat .fa-user").addClass("koSledeciIgra");
            div_put.setAttribute("active", 2);
            $("div-baza2").addClass("active");

            if (document.querySelectorAll(".pijun_B").length > 0) {
                if (parseInt(djig_cube2.getAttribute("data-dbacanje")) == 0) {
                    djig_cube.classList.add("disabled");
                    div_put.setAttribute("active", 2);
                    $("div-baza2").removeClass("active");
                    if ($("#tabla div-cocka i").attr("data-number") == 6) {
                        $("div-baza2").addClass("active");
                    }
                }
            }
        } else {
            $("#tabla div-cocka i").attr("data-id", parseInt(sta));
            if (parseInt(sta) == 1) {
                $("#rezlutat .fa-horse-head").addClass("koSledeciIgra");
                $("div-baza1").addClass("active");

            }
            if (parseInt(sta) == 2) {
                $("#rezlutat .fa-user").addClass("koSledeciIgra");
                $("div-baza2").addClass("active");

            }
        }
        $("#tabla div-cocka i").attr("data-dbacanje", 0)
    };
    this.kosledecibacaKocku = function (h) {
        document.querySelector("div-baza1").classList.remove("active");
        document.querySelector("div-baza2").classList.remove("active");
        var numbersion = parseInt(djig_cube2.getAttribute("data-dbacanje"));
        if (numbersion > 0) {
            numbersion--;
            djig_cube2.setAttribute("data-dbacanje", numbersion);
        }
        var data_id = djig_cube2.getAttribute("data-id");
        if (parseInt(djig_cube2.getAttribute("data-id")) == 1) {

            if (document.querySelectorAll(".pijun_A").length > 0) {
                if (parseInt(djig_cube2.getAttribute("data-dbacanje")) == 0) {
                    djig_cube.classList.add("disabled");
                    div_put.setAttribute("active", 1);
                    igra.kocka("A");
                    new igra.msg("Odaberi pijuna sa kojim ćeš da načiniš potez!");
                    new igra.logger("Kocka - 2");
                    djig_cube2.classList.add("disabled");

                }
            } else {
                if (parseInt(djig_cube2.getAttribute("data-dbacanje")) == 0) {
                    $("div-put").attr("active", 2);
                    igra.kocka("B");
                    djig_cube2.classList.add("disabled");

                }
                div_put.setAttribute("active", 2);
                //  igra.kocka("B");
                new igra.msg("Odaberi pijuna sa kojim ćeš da prvi načiniš potez!");
                new igra.logger("Kocka - 1");
            }

        }
        if (parseInt(djig_cube2.getAttribute("data-id")) == 2) {
            if (parseInt(djig_cube2.getAttribute("data-dbacanje")) == 0) {
                if (document.querySelectorAll(".pijun_B").length > 0) {
                    if (parseInt(djig_cube2.getAttribute("data-dbacanje")) == 0) {
                        djig_cube.classList.add("disabled");
                        div_put.setAttribute("active", 2);
                        new igra.msg("Odaberi pijuna sa kojim ćeš da načiniš potez!");
                        new igra.logger("Kocka - 1");
                        igra.kocka("B");
                    }
                } else {
                    if (parseInt(djig_cube2.getAttribute("data-dbacanje")) == 0) {
                        $("div-put").attr("active", 1);
                        igra.kocka("A");
                    }
                    div_put.setAttribute("active", 1);

                    //     igra.kocka("A");
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
    this.github = function () {
        window.open("https://github.com/Marko9827/projekatZaFaks");
    };
    this.tema = function () {
        var htmlV = document.querySelector("html");
        if (htmlV.classList.contains("dark_theme")) {
            htmlV.classList.remove("dark_theme");
        } else {
            htmlV.classList.add("dark_theme");

        }
    };
    this.prijeload = function () {
        var localhost = window.location.origin;
        if (!localhost.includes("localhost")) {
            window.location.href = "https://github.com/Marko9827/projekatZaFaks";
        }
      
        
        igra.testiraj();
        var i = 0,
            c1 = document.querySelector("prijeload-kockice i[data-ui='1']"),
            prijeload_T = setInterval(function () {
                i++;
                c1.setAttribute("class", "fas " + podaci.dice_rand[i]);
                if (i == 6) {
                    $("prijeload-kockice i[data-ui='H']").addClass("prijeload_complete");
                    setTimeout(() => {
                        $("prijeload-kockice i").attr("style", "font-size: 0px !important;");
                        setTimeout(() => {
                            $("prijeload-kockice i").hide();
                        }, 100);
                        setTimeout(() => {
                            $("div-prijeload").css({
                                "opacity": "0"
                            });
                            $("#tabla").css({
                                "transform": "unset"
                            });
                            setTimeout(() => {
                                $("div-prijeload").remove();

                            }, 1000);
                        }, 1000);

                    }, 1500);
                    clearInterval(prijeload_T);
                }
            }, 500)

    };

};

var igra = new igra();


//igra.testiraj();

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {

        //  navigator.serviceWorker.register('/sw.js').catch(function (err) { return false; });
    });
}