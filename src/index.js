// ----
// SASS
// ----
import './styles.scss';



// ---------
// HexGuessr
// ---------
import HexGuessr from './hexguessr';
let hexGuessr = new HexGuessr();
const hexToGuess = document.querySelector('#hexToGuess');
const hexChoice = document.querySelector('#hexChoice');
const domResult = document.querySelector('#hexResult');

/**
 * Render the HexGuessr game in the DOM
 */
const renderHexGuessr = function() {
    hexToGuess.innerText = hexGuessr.hexToGuess;
    if (hexToGuess.classList.contains('hidden')) {
        hexToGuess.classList.remove('hidden');
        hexChoice.classList.remove('hidden');
    }
    renderColorsList(hexGuessr.hexValues);
}

/**
 * Apply randomly generated colors to the list
 * @param {Array} colors
 */
const renderColorsList = function(colors) {
    const hexColors = [...document.querySelector('#hexChoice').children];
    for (let i = 0; i < hexColors.length; i++) {
        if (hexColors[i].classList.contains('hidden')) {
            hexColors[i].classList.remove('hidden');
        }
        hexColors[i].style.backgroundColor = colors[i];
        hexColors[i].style.color = colors[i];
        hexColors[i].addEventListener('click', displayResult);
        hexColors[i].addEventListener('animationend', () => {
            hexColors[i].classList.remove('hexguessr-wrong-answer');
        });
    }
}

/**
 * Display the result
 * @param {PointerEvent} event
 */
const displayResult = function(event) {
    const colorSelected = HexGuessr.rgbToHex(event.target.style.backgroundColor);
    if (colorSelected === hexGuessr.hexToGuess) {
        event.target.classList.add('hexguessr-good-answer');
        domResult.classList.add('hidden');
        const colorsList = [].slice.call(event.target.parentNode.children);
        colorsList.forEach(element => {
            element.removeEventListener('click', displayResult);
            if (element !== event.target) {
                element.classList.add('hidden');
            }
        });
        setTimeout(() => {
            displayButton();
            domResult.innerHTML = 'Well played !';
            domResult.classList.remove('hidden');
        }, 300);
    } else {
        event.target.classList.add('hexguessr-wrong-answer');
        if (!domResult.contains(document.querySelector('.hexguessr-color-selected'))) {
            domResult.classList.add('hidden');
            setTimeout(() => {
                const spanHexSelected = document.createElement('span');
                spanHexSelected.appendChild(document.createTextNode(colorSelected));
                spanHexSelected.classList.add('hexguessr-color-selected');
                spanHexSelected.style.color = colorSelected;
                domResult.innerHTML = 'Try again. That color was ' + spanHexSelected.outerHTML;
                domResult.classList.remove('hidden');
            }, 300);
        } else {
            const spanColorSelected = document.querySelector('.hexguessr-color-selected');
            if (spanColorSelected.innerText === colorSelected) {
                return;
            }
            spanColorSelected.classList.add('hidden');
            setTimeout(() => {
                spanColorSelected.innerHTML = colorSelected;
                spanColorSelected.style.color = colorSelected;
                spanColorSelected.classList.remove('hidden');
            }, 300);
        }
    }
}


/**
 * Display button for new game
 */
const displayButton = function() {
    const buttonNewGame = document.createElement('button');
    buttonNewGame.classList.add('hexguessr-newgame');
    buttonNewGame.classList.add('hidden');
    buttonNewGame.addEventListener('click', () => { newGame() });
    buttonNewGame.innerText = 'New Game';
    document.querySelector('.hexguessr-container').append(buttonNewGame);
    buttonNewGame.classList.remove('hidden');
}

/**
 * Description
 */
const newGame = function() {
    domResult.classList.add('hidden');
    const prevGoodColor = document.querySelector('.hexguessr-good-answer');
    prevGoodColor.classList.remove('hexguessr-good-answer');
    hexGuessr = new HexGuessr();
    const list = document.querySelector('.hexguessr-list');
    list.classList.add('hidden');
    hexToGuess.classList.add('hidden');
    const buttonNewGame = document.querySelector('.hexguessr-newgame');
    buttonNewGame.classList.add('hidden');
    setTimeout(() => {
        buttonNewGame.remove();
        renderHexGuessr();
        domResult.innerText = 'Choose a Color';
        domResult.classList.remove('hidden');
    }, 400);
}

document.addEventListener('DOMContentLoaded', function(){
    renderHexGuessr()
});