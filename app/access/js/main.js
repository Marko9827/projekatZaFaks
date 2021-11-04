var igra = function () {
  
    this.testiraj = function(){

    };
    this.zakljucaj = function (w) {
        if (parseInt(w) == 1) {

        } else {

        }

    };
    this.fa_djig_cube = function (igrac, djig_cube) {
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

        djig_cube.setAttribute("class", "password inc-no fas " + dice_rand[Math.round(Math.floor(Math.random() * 6) + 1)]);
        cube_random_name();
        setTimeout(function () {
            djig_cube.setAttribute("class", "password inc-no fas " + dice_rand[Math.round(Math.floor(Math.random() * 6) + 1)]);
            cube_random_name();
            setTimeout(function () {
                djig_cube.setAttribute("class", "password inc-no fas " + dice_rand[Math.round(Math.floor(Math.random() * 6) + 1)]);
                cube_random_name();
                setTimeout(function () {
                    djig_cube.setAttribute("class", "password inc-no fas " + dice_rand[Math.round(Math.floor(Math.random() * 6) + 1)]);
                    cube_random_name();
                    setTimeout(function () {
                        djig_cube.setAttribute("class", "password inc-no fas " + dice_rand[Math.round(Math.floor(Math.random() * 6) + 1)]);
                        cube_random_name();
                        setTimeout(function () {
                            cube_random_name();
                            djig_cube.setAttribute("class", "password fas fa-dice");
                        }, timeout_seconds);
                    }, timeout_seconds);

                }, timeout_seconds);
            }, timeout_seconds);
        }, timeout_seconds);
    };
};

var igra = new igra();

