let mainTable = document.querySelector('#field');
let buttonStartTicTacToe = document.querySelector('.start_game');
let inputPlayers = document.querySelectorAll('.start_form_input');
let startFormDiv = document.querySelector('.start_form');
let endFormDiv = document.querySelector('.end_form');
let endFormWinner = document.querySelector('.end_form_winner');
let player = document.querySelector('.next_player');
let scoreTableDiv = document.querySelector('.score_table');
let mainTicTacToeDiv = document.querySelector('.inner_game');
let startAgainButton = document.querySelector('.start_again');
let nextRoundButton = document.querySelector('.next_round');

let buttonScoreEnd = document.querySelector('.button_score_end');

let players1 = [];
let players2 = [];

let scoreTable = [];

let current;
let currentClass;

let playerWin;

const burger = document.getElementById('burger');
const ul = document.querySelector('nav ul');

burger.addEventListener('click', () => {
    burger.classList.toggle('show-x');
    ul.classList.toggle('show');
});

buttonStartTicTacToe.addEventListener('click', function() {
    let check = Array.from(inputPlayers).every(elem => elem.value);
    console.log(check);
    if (check) {
        players1.push(inputPlayers[1].value);
        players1.push(inputPlayers[0].value);

        players2.push(inputPlayers[0].value);
        players2.push(inputPlayers[1].value);



        startFormDiv.classList.remove('display_flex');
        startFormDiv.classList.add('display_none');
    } else {
        alert('enter your names');
    }
})



start();

function start() {


    for (let i = 0; i < 9; i++) {
        let newCell = document.createElement('div');
        newCell.classList.add('cell');
        mainTable.appendChild(newCell);
    }

    mainTable.classList.add('x');

    let cells = mainTable.querySelectorAll('.cell');

    let i = 0;
    for (let cell of cells) {
        cell.addEventListener('click', function step() {
            current = ['x', 'circle'][i % 2];
            if (current == 'x') {
                cell.classList.add('x');
            } else if (current == 'circle') {
                cell.classList.add('circle');
            }
            if (mainTable.classList.contains('x')) {
                mainTable.classList.remove('x');
                mainTable.classList.add('circle');
                currentClass = 'circle';
            } else if (mainTable.classList.contains('circle')) {
                mainTable.classList.remove('circle');
                mainTable.classList.add('x');
                currentClass = 'x';
            }
            player.innerHTML = 'Next step ' + players1[i % 2] + ' - ' + currentClass;
            playerWin = players2[i % 2];
            i++
            this.removeEventListener('click', step);

            if (isVictory(cells)) {
                scoreTable.push(playerWin);
                builScoreTable(scoreTable);
                endFormDiv.classList.remove("display_none");
                endFormDiv.classList.add("display_flex");


                endFormWinner.innerHTML = playerWin + ' won this round!';
            } else if (i == 9) {
                scoreTable.push('it is draw');
                builScoreTable(scoreTable);
                endFormDiv.classList.remove("display_none");
                endFormDiv.classList.add("display_flex");
                endFormWinner.innerHTML = 'It is draw';


            }
        })
    }
}

startAgainButton.addEventListener('click', function() {
    startFormDiv.classList.remove('display_none');
    startFormDiv.classList.add('display_flex');
    endFormDiv.classList.remove('display_flex');
    endFormDiv.classList.add('display_none');

    Array.from(inputPlayers).forEach(elem => elem.value = '');

    let scoreTableChilds = scoreTableDiv.querySelectorAll('tr');
    for (let elem of scoreTableChilds) {
        elem.remove();
    }

    playerWin = '';
    scoreTable = [];
    players1 = [];
    players2 = [];
    player.innerHTML = '';

    let mainTableChilds = mainTable.querySelectorAll('div');
    for (let elem of mainTableChilds) {
        elem.remove();
    }
    start();

});

nextRoundButton.addEventListener('click', function() {

    endFormDiv.classList.remove('display_flex');
    endFormDiv.classList.add('display_none');
    playerWin = '';
    player.innerHTML = '';

    let mainTableChilds = mainTable.querySelectorAll('div');
    for (let elem of mainTableChilds) {
        elem.remove();
    }
    start();

})


function isVictory(cells) {
    let combs = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let comb of combs) {
        if (
            cells[comb[0]].classList.contains(current) && cells[comb[1]].classList.contains(current) && cells[comb[2]].classList.contains(current)
        ) {
            return true;
        }
    }

    return false;
}


function builScoreTable(arr) {

    let scoresTableChilds = scoreTableDiv.querySelectorAll('tr');
    for (let elem of scoresTableChilds) {
        elem.remove();
    }



    let newTable = document.createElement('table');
    newTable.classList.add('score_table_inner');

    let thTr = document.createElement('tr');

    let thNumber = document.createElement('th');
    thNumber.innerHTML = 'Round';
    thTr.append(thNumber);

    let thName = document.createElement('th');
    thName.innerHTML = 'Winner';
    thTr.append(thName);

    newTable.append(thTr);


    for (let i = 0; i < arr.length; i++) {
        let newTr = document.createElement('tr');

        let newTdNumber = document.createElement('td');
        newTdNumber.innerHTML = i + 1;
        newTr.appendChild(newTdNumber);

        let newTdName = document.createElement('td');
        newTdName.innerHTML = arr[i];
        newTr.appendChild(newTdName);


        newTable.appendChild(newTr);
    }
    scoreTableDiv.appendChild(newTable);

}





buttonScoreEnd.addEventListener('click', function func() {
    let y = 0;
    let x = 0;
    let tds = document.querySelectorAll('td');
    for (let p = 0; p < tds.length; p++) {
        if (tds[p].innerHTML == players2[0]) {
            y += 1;
        } else if (tds[p].innerHTML == players2[1]) {
            x += 1;
        }
    }
    console.log(x, y);
    if (y > x) {
        alert(players2[0])
    } else if (x > y) {
        alert(players2[1])
    } else {
        alert('it is draw')
    }

    startFormDiv.classList.remove('display_none');
    startFormDiv.classList.add('display_flex');
    endFormDiv.classList.remove('display_flex');
    endFormDiv.classList.add('display_none');

    let scoreTableChilds = scoreTableDiv.querySelectorAll('tr');
    for (let elem of scoreTableChilds) {
        elem.remove();
    }

    playerWin = '';
    scoreTable = [];
    players1 = [];
    players2 = [];
    player.innerHTML = '';

    let mainTableChilds = mainTable.querySelectorAll('div');
    for (let elem of mainTableChilds) {
        elem.remove();
    }
    start();

});