var igra = function () {

    this.testiraj = function () {

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

    };
    this.contoller = function(){
        
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

