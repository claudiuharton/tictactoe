let game = {
    flag:false,
    noClicks: 0,
    matrix: [[null, null, null], [null, null, null], [null, null, null]],


    message: {
        winX: "Good job X!",
        win0: "Good job 0!",
        draw: "HAHAHA"
    },

    selectorRef: (i, j) => {
        return document.querySelector(`.b${i}${j}`);
    },

    addXor0: (option, i, j) => {
        game.selectorRef(i, j).innerHTML = option;
        game.matrix[i][j] = option;

    },
    areEqual: (...arguments) => {
        let len = arguments.length;
        for (let i = 1; i < len; i++) {
            if (arguments[i] === null || arguments[i] !== arguments[i - 1])
                return false;
        }
        return true;
    }
    ,
    whoIsTheWinner: () => {


        if (game.areEqual(game.matrix[0][0], game.matrix[1][1], game.matrix[2][2])) {
            game.selectorRef(0,0).style.color = 'red';
            game.selectorRef(1,1).style.color = 'red';
            game.selectorRef(2,2).style.color = 'red';
            return game.matrix[0][0];
        }
        if (game.areEqual(game.matrix[0][2], game.matrix[1][1], game.matrix[2][0])) {
            return game.matrix[0][2];
        }
        if (game.areEqual(game.matrix[0][0], game.matrix[0][1], game.matrix[0][2])) {
            return game.matrix[0][0];
        }

        if (game.areEqual(game.matrix[1][0], game.matrix[1][1], game.matrix[1][2])) {
            return game.matrix[1][0];
        }

        if (game.areEqual(game.matrix[2][0], game.matrix[2][1], game.matrix[2][2])) {
            return game.matrix[2][0];
        }
        if (game.areEqual(game.matrix[0][0], game.matrix[1][0], game.matrix[2][0])) {
            return game.matrix[0][0];
        }
        if (game.areEqual(game.matrix[0][1], game.matrix[1][1], game.matrix[2][1])) {
            return game.matrix[0][1];
        }
        if (game.areEqual(game.matrix[0][2], game.matrix[1][2], game.matrix[2][2])) {
            return game.matrix[0][2];
        }

        return null;
    },

    canContinue: () => {
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++) {
                if (game.matrix[i][j] === null)
                    return true;
            }
        return false;
    },


};


if (game.flag) {
    window.addEventListener('click', (event) => {
        if (event.target.className.indexOf(`box`) !== -1) {
            let box = event.target.className.split('');

            if (game.canContinue() && game.matrix[parseInt(box[1])][parseInt(box[2])] === null) {

                if (game.noClicks % 2 === 0) {


                    game.addXor0('X', parseInt(box[1]), parseInt(box[2]));
                    game.noClicks++;
                } else {

                    game.addXor0('0', parseInt(box[1]), parseInt(box[2]));
                    game.noClicks++;
                }

                let ele = document.getElementsByClassName('box');
                switch (game.whoIsTheWinner()) {
                    case 'X':
                        document.querySelector('.message').innerHTML = game.message.winX;

                        for (let i = 0; i < ele.length; i++) {
                            ele[i].style.backgroundColor = 'grey';
                        }
                        game.flag=false;
                        break;
                    case '0':
                        document.querySelector('.message').innerHTML = game.message.win0;

                        for (let i = 0; i < ele.length; i++) {
                            ele[i].style.backgroundColor = 'grey';
                        }
                        game.flag=false;
                        break;
                    case null:
                        if (!game.canContinue()) {
                            document.querySelector('.message').innerHTML = game.message.draw;
                            for (let i = 0; i < ele.length; i++) {
                                ele[i].style.backgroundColor = 'grey';
                            }
                            game.flag=false;
                        }


                }


            } else {
                if (game.whoIsTheWinner() === null && !game.canContinue()) {
                    document.querySelector('.message').innerHTML = game.message.draw;
                    let ele = document.getElementsByClassName('box')
                    for (let i = 0; i < ele.length; i++) {
                        ele[i].style.backgroundColor = 'grey';
                    }
                    game.flag=false;
                }
            }
        }
    });

}

window.addEventListener('click', (event) => {
    if (event.target.className === 'button') {
        let ele = document.getElementsByClassName('box');
        if (document.querySelector('.button').innerHTML === 'RESET') {

game.flag=true;
            for (let i = 0; i < ele.length; i++) {
                ele[i].style.backgroundColor = 'aliceblue';
                ele[i].style.color='black';
            }

            game.noClicks=0;
            game.matrix = [[null, null, null], [null, null, null], [null, null, null]];

            for (let i=0;i<3;i++)
                for(let j =0;j<3;j++){
                    game.addXor0('',i,j);
                }
            document.querySelector('.message').innerHTML = `Tic Tac Toe`;


        } else if (document.querySelector('.button').innerHTML === 'START') {

game.flag=true;
            for (let i = 0; i < ele.length; i++) {
                ele[i].style.backgroundColor = 'aliceblue';
            }




                document.querySelector('button').innerHTML = 'RESET';


        }


    }
});
