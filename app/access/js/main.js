var igra = function () {
    window.Igralog = true;
    const tabla = document.getElementById("tabla"),
        start_rs = document.querySelector("#tabla ul[data-ul='opcije'] li[data-opt='resume_start']");

    this.testiraj = function () {
        this.contoller();
    };
    this.zakljucaj = function (w) {
        if (parseInt(w) == 1) {

        } else {

        }

    };
    this.random_boja = function () {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        return `#${randomColor}`;
    };
    this.start = function () {
        tabla.removeAttribute("data-opt");

    };
    this.stop = function(){
      //  tabla.setAttribute("data-opt","loadet");

    };
    this.contoller = function () {
        document.addEventListener("contextmenu", function (e) {
            e.preventDefault();
            return false;
        });
        start_rs.addEventListener("click", function () {

            if (parseInt(start_rs.getAttribute("data-id")) == 1) {
                start_rs.setAttribute("data-id", "0");
                new igra.start();
                start_rs.innerHtml = "Stopiraj igru";
            } else {
                start_rs.setAttribute("data-id", "1");
                new igra.stop();
                start_rs.innerHtml = "Nova igra";
            }
        });
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

        djig_cube.setAttribute("class", "div-cocka fas " + dice_rand[Math.round(Math.floor(Math.random() * 6) + 1)]);

        setTimeout(function () {
            djig_cube.setAttribute("class", "div-cocka fas " + dice_rand[Math.round(Math.floor(Math.random() * 6) + 1)]);

            setTimeout(function () {
                djig_cube.setAttribute("class", "div-cocka fas " + dice_rand[Math.round(Math.floor(Math.random() * 6) + 1)]);

                setTimeout(function () {
                    djig_cube.setAttribute("class", "div-cocka fas " + dice_rand[Math.round(Math.floor(Math.random() * 6) + 1)]);

                    setTimeout(function () {
                        djig_cube.setAttribute("class", "div-cocka fas " + dice_rand[Math.round(Math.floor(Math.random() * 6) + 1)]);

                        setTimeout(function () {

                            new igra.zakljucaj(0);
                            djig_cube.setAttribute("class", "div-cocka  fas fa-dice");
                        }, timeout_seconds);
                    }, timeout_seconds);

                }, timeout_seconds);
            }, timeout_seconds);
        }, timeout_seconds);
    };
};

var igra = new igra();
igra.testiraj();
