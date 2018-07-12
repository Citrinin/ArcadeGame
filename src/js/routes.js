import GameState from './gameObjects/gameState';
import FireStore from './utils/firebase';

let content = document.querySelector('.content');
let game = new GameState(content);

const routes = [
    {
        match: '',
        onEnter: () => {
            window.location.hash = 'game';
        }
    },
    {
        match: 'about',
        onEnter: () => {
            changeActivePage('about');
            content.innerHTML = '<h1 class="about"><span>Super arcade game</span></h1><div class="w-100"/><div><h3>Author <a href="https://github.com/citrinin">Kate Kuzkina</a></h3></div>';
        }
    },
    {
        match: 'game',
        onEnter: () => {
            changeActivePage('game');
            game.setUpGame();
        },
        onLeave: () => {
            game.endGame();
        }
    },
    {
        match: 'scores',
        onEnter: () => {
            changeActivePage('scores');

            FireStore.getScores().then(result => {
                content.innerHTML = '<h1 class="about"><span>Scores</span></h1>';
                let ol = document.createElement('ol');
                result.forEach(item => {
                    let li = document.createElement('li');
                    li.innerHTML = `${item.name} - ${item.score}`;
                    ol.appendChild(li);
                });

                let divForDivision = document.createElement('div');
                divForDivision.classList.add('w-100');
                content.appendChild(divForDivision);
                let div = document.createElement('div');
                div.appendChild(ol);
                content.appendChild(div);
            });
        }
    },
    {
        match: 'replay',
        onEnter: () => {
            if ((game.replayData || []).length === 0) {
                window.location.hash = 'game';
                return;
            }
            game.replayGame();
        }

    },
    {
        match: 'watchreplay',
        onEnter: () => {
            window.location.hash = 'replay';
        }

    }, {
        match: 'newgame',
        onEnter: () => {
            window.location.hash = 'game';
        }

    }
];

function changeActivePage(newPage) {
    document.querySelector('.active').className = '';
    document.querySelector(`[href="#${newPage}"]`).parentElement.className = 'active';
}


export default routes;
