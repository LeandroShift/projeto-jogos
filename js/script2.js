const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");
contentBox = document.querySelector(".container .content");
startArea = document.querySelector(".startArea");
scoreArea = document.querySelector(".score");
modalContent = document.querySelector(".modal-content");

// Obter o modal
var modal = document.getElementById("myModal");
// Obtenha o botão que abre o modal
var btn = document.getElementById("myBtn");
// Obtenha o elemento <span> que fecha o modal
var span = document.getElementsByClassName("close")[0];
// Obter o texto do modal
var modalText = document.getElementById("modalText");

let correctWord, timer;
let score = 0; 



const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        modal.style.display = "block";
        modalContent.classList.add("modal-wrong");
        modalText.innerHTML = `<br>O Tempo Acabou! <b>${correctWord.toUpperCase()}</b> era a palavra correta`;
        endGame();
    }, 1000);
}

const start = () => {
    contentBox.style.display = "block";
    startArea.style.display = "none";
initGame(); 
}


const endGame = () => {
    clearInterval(timer);
    contentBox.style.display = "none";
    startArea.style.display = "block";
    modal.style.display = "block";
    modalContent.classList.remove("modal-correct");
    modalContent.classList.add("modal-wrong");
    modalText.innerHTML = `
    <center><br>O Tempo acabou! <b>${correctWord.toUpperCase()}</b> era a palavra correta.
    <br>Você perdeu ! :(</center><br>
    </center>
    `;

}

const winGame = () => {
    clearInterval(timer);
    contentBox.style.display = "none";
    startArea.style.display = "block";
    modal.style.display = "block";
    modalContent.classList.add("modal-correct");
    modalText.innerHTML = `<br><center>Parabéns! 🎉, Você venceu!!!!`;
    
}

const initGame = () => {
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();;
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
    scoreArea.innerHTML = score;

    if(score > 9)
    {
        winGame();
    }

}



const checkWord = () => {
    let userWord = inputField.value.toLowerCase();

    if(!userWord) { 
        modal.style.display = "block";
        modalContent.classList.remove("modal-wrong");
        modalContent.classList.remove("modal-correct");
        return modalText.innerHTML = `<br>Por favor digite a palavra para verificar!`;
    }

    if(userWord !== correctWord) { 
        if(score >= 1) {
            score = score - 1; 
            scoreArea.innerHTML = score;
        }
        modal.style.display = "block";
        modalContent.classList.add("modal-wrong");
        return modalText.innerHTML = `<br>Oops! <b>${userWord}</b> não é a palavra correta`;
    }
    else
    {
    modal.style.display = "block";
    modalContent.classList.remove("modal-wrong");
    modalContent.classList.add("modal-correct");
    modalText.innerHTML = `<br>Parabéns ! <b>${correctWord.toUpperCase()}</b> é a palavra correta`;
    score++;
    }
  
    initGame();
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);


// Quando o usuário clicar em <span> (x), feche o modal
span.onclick = function() {
    modal.style.display = "none";
  }
  
  // Quando o usuário clicar em qualquer lugar fora do modal, feche-o
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

