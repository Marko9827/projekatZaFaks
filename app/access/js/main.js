window.Igralog = true;
const tabla = document.getElementById("tabla"),
    start_rs = document.querySelector("#tabla ul[data-ul='opcije'] li[data-opt='resume_start']"),
    vremeigre = document.getElementById("vremeigre"),
    djig_cube2 = document.querySelector(".div-cocka"),
    div_put = document.querySelector("div-put");
var dice_rand = {
    0: "fa-dice-one",
    1: "fa-dice-one",
    2: "fa-dice-two",
    3: "fa-dice-three",
    4: "fa-dice-four",
    5: "fa-dice-five",
    6: "fa-dice-six"
},
    vremenkusa,
    sekundara = 0,
    kocka = 0;

var igra = function () {


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
        kocka -= 1;
        if (kocka > 0) {
            this.msg(`Bacite ponovo kocku. Imate jedno ${kocka} dodatno bacanje`);
        } else {
            if (parseInt(djig_cube2.getAttribute("data-id")) == 1) {
                djig_cube2.setAttribute("data-id", 2);
            } else {
                djig_cube2.setAttribute("data-id", 1);
            }
            this.msg("Bacite kocku.");
        }

        this.event_clicker();
    };
    this.pijun = function (name) {
        djig_cube2.setAttribute("class", "div-cocka  fas fa-dice");
        document.querySelector(`div-baza1, div-baza2`).classList.remove("active");
        if (djig_cube2.getAttribute("data-id") == 1) {
            djig_cube2.setAttribute("data-id", 0);
        } else {
            djig_cube2.setAttribute("data-id", 1);
        }
        var h = name.getAttribute("data-fldh"),
            rplNUM = h.replace(/([A-Z])|[a-z]\w+/, ""),
            rplNumH = name.getAttribute("data-gr"),
            numb_class = "fas fa-horse-head";
            numb = 0,
            num = parseInt(djig_cube2.getAttribute("data-id"));
        if (num == 2) {
            numb = 22;
            numb_class =  "far fa-user";
        }

        data_fld = document.querySelector(`#tabla div-put i[data-fld='${numb}']`);
        data_fld.setAttribute("class", `i-home-put i-put ${numb_class}`);
        data_fld.setAttribute("data-fldh", h);
        data_fld.setAttribute("onclick", "igra.pomerime_na_Broj(this)");
        name.classList.add("disabled");
        djig_cube2.classList.remove("disabled");
        data_fld.setAttribute("style", "pointer-events:none;");
        div_put.setAttribute("active", rplNumH);
        if (kocka > 0) {

            this.msg(`Bacite ponovo kocku. Imate jedno ${kocka} dodatno bacanje`);

        } else {
            this.msg("Bacite kocku.");
        }
        this.event_clicker();
    };
    this.msg = function (msg) {
        document.querySelector("div-cocka span").innerHTML = msg;
    };
    this.fa_djig_cube = function (djig_cube) {


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
                        }, timeout_seconds);
                    }, timeout_seconds);

                }, timeout_seconds);
            }, timeout_seconds);
        }, timeout_seconds);
    };
    this.cube_loadet = function (djig_cube, vvv) {
        djig_cube.setAttribute("class", "div-cocka fas " + dice_rand[vvv]);
        new igra.zakljucaj(0);
        //       djig_cube.setAttribute("class", "div-cocka  fas fa-dice");
        document.querySelector(`div-baza1, div-baza2`).classList.remove("active");
        djig_cube.setAttribute("data-number", vvv);
        var cub = parseInt(djig_cube2.getAttribute("data-id"));

        if (vvv == 6) {
            kocka += 1;
            document.querySelector(`div-baza${cub}`).classList.add("active");
            djig_cube.classList.add("disabled");
            new igra.msg("Odaberite slobodnog pijuna ili igrajte sa 'izbačenim'!");
        }
        //  }
        document.querySelectorAll("div-put .fa-horse-head, div-put .fa-user").forEach(function (v) {
            v.removeAttribute("style");
        });
    };
};

var igra = new igra();
igra.testiraj();