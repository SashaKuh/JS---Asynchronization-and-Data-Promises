// 1. ініціалізація кнопок
// 2. робимо що б боді змінбвався
// 3. привязвємо через setInterval і на stop (clearInterval)
// ніби все

const selectors = {
    startBtn: document.querySelector('#start'),
    stopBtn: document.querySelector('#stop')
}

let id;

selectors.startBtn.addEventListener('click', () => handleButtonClick(true));
selectors.stopBtn.addEventListener('click', () => handleButtonClick(false));

window.addEventListener('load', () => {
    disableButton(selectors.stopBtn);
});

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function handleButtonClick(startButtonClicked) {
    const startBtn = selectors.startBtn;
    const stopBtn = selectors.stopBtn;

    disableButton(startButtonClicked ? startBtn : stopBtn);
    disableButton(startButtonClicked ? stopBtn : startBtn, false);

    if (startButtonClicked) {
        id = setInterval(() => {
            const randomColor = getRandomHexColor();
            document.body.style.backgroundColor = randomColor;
        }, 1000);
    } else {
        clearInterval(id);
    }
}

function disableButton(button, disable = true) {
    button.disabled = disable;
}




