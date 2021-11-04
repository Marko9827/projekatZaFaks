var igra = function () {
    window.Igralog = true;
    const tabla = document.getElementById("tabla"),
        start_rs = document.querySelector("#tabla ul[data-ul='opcije'] li[data-opt='resume_start']"),
        vremeigre = document.getElementById("vremeigre"),
        djig_cube2 = document.querySelector(".div-cocka"),
        div_put = document.querySelector("div-put");

    var vremenkusa,
        sekundara = 0,
        kocka = 0;

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
        tabla.setAttribute("data-opt", "loadet");
        start_rs.innerHTML = "Nova igra";
        start_rs.setAttribute("data-id", "0");
        start_rs.setAttribute("onclick", "igra.start();");

        this.logger(`Igra stopirana ${parseInt(start_rs.getAttribute("data-id"))} \n Vreme igre: ${sekundara}`);
        this.stoperica(false);
    };
    this.contoller = function () {
        document.addEventListener("contextmenu", function (e) {
            e.preventDefault();
            return false;
        });

    };
    this.pomerime_na_Broj = function(br,brGTA){
        if(br.getAttribute("class").contains("i-home-put")){
            br.setAttribute("class","i-home-put i-put far fa-dot-circle");
        }else{
            br.setAttribute("class", "i-put far fa-dot-circle");

        }
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
            rplNumH = name.getAttribute("data-gr");
            data_fld = document.querySelector(`#tabla div-put i[data-fld='0']`);
        data_fld.classList.remove("i-home-put i-put fas fa-horse-head");
        data_fld.setAttribute("data-fldh", h);
        djig_cube2.classList.remove("disabled");

        div_put.setAttribute("active", rplNumH);
        if (kocka > 0) {
      
            this.msg(`Bacite ponovo kocku. Imate jedno ${kocka} dodatno bacanje`);
            kocka -= 1;
        } else {
            this.msg("Bacite kocku.");
        }
    };
    this.msg = function (msg) {
        document.querySelector("div-cocka span").innerHTML = msg;
    };
    this.fa_djig_cube = function (djig_cube) {
        var dice_rand = {
            0: "fa-dice-one",
            1: "fa-dice-one",
            2: "fa-dice-two",
            3: "fa-dice-three",
            4: "fa-dice-four",
            5: "fa-dice-five",
            6: "fa-dice-six"
        };

        var timeout_seconds = 100;

        this.zakljucaj(1);
        var cub = parseInt(djig_cube.getAttribute("data-id"));
        djig_cube.setAttribute("class", "div-cocka fas " + dice_rand[Math.round(Math.floor(Math.random() * 6) + 1)]);

        setTimeout(function () {
            djig_cube.setAttribute("class", "div-cocka fas " + dice_rand[Math.round(Math.floor(Math.random() * 6) + 1)]);

            setTimeout(function () {


                setTimeout(function () {
                    djig_cube.setAttribute("class", "div-cocka fas " + dice_rand[Math.round(Math.floor(Math.random() * 6) + 1)]);

                    setTimeout(function () {
                        djig_cube.setAttribute("class", "div-cocka fas " + dice_rand[Math.round(Math.floor(Math.random() * 6) + 1)]);

                        setTimeout(function () {
                            var vvv = Math.round(Math.floor(Math.random() * 6) + 1);
                            djig_cube.setAttribute("class", "div-cocka fas " + dice_rand[vvv]);
                            new igra.zakljucaj(0);
                            //       djig_cube.setAttribute("class", "div-cocka  fas fa-dice");
                            document.querySelector(`div-baza1, div-baza2`).classList.remove("active");

                            if (cub == 1) {
                                if (vvv == 6) {
                                    kocka += 1;
                                    document.querySelector(`div-baza${cub}`).classList.add("active");
                                    djig_cube2.classList.add("disabled");
                                    new igra.msg("Odaberite slobodnog pijuna ili igrajte sa 'izbačenim'!");
                                }
                            }
                        }, timeout_seconds);
                    }, timeout_seconds);

                }, timeout_seconds);
            }, timeout_seconds);
        }, timeout_seconds);
    };
};

var igra = new igra();
igra.testiraj();