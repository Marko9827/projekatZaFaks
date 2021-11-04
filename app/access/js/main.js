var igra = function () {
    window.Igralog = true;
    const tabla = document.getElementById("tabla"),
        start_rs = document.querySelector("#tabla ul[data-ul='opcije'] li[data-opt='resume_start']"),
        vremeigre = document.getElementById("vremeigre");

    var vremenkusa,
        sekundara = 0;

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
        }
    };
    this.testiraj = function () {
        this.contoller();
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
    this.pijun = function (name) {
        djig_cube.setAttribute("class", "div-cocka  fas fa-dice");
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
                                    document.querySelector(`div-baza${cub}`).classList.add("active");
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