let recognizer;
let currentQuestion = 0;
let canListen = true;
let score = 0;


const allowedCommands = ["yes", "no", "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "right","left"]; //comandos permitidos para o reconhecimento de voz

const questions = [  //array de perguntas e respostas
  {
    text: "Is this a cat?",
    image: "/img/cat.jpeg",
    correctAnswer: "yes"
  },
  {
    text: "Is this a banana?",
    image: "/img/Maca.webp",
    correctAnswer: "no"
  },
  {
    text: "How many cats have?",
    image: "/img/gatos.png",
    correctAnswer: "two"
  },
  {
    text: "Is this a wolf?",
    image: "/img/cachorro.jpg",
    correctAnswer: "no"
  },
  {
    text: "How many books are on the table?",
    image: "/img/livros.jpeg",
    correctAnswer: "five"
  },
  {
    text: "Is this a pencil?",
    image: "/img/caneta.jpg",
    correctAnswer: "no"
  },
  {
    text: "How many dogs have?",
    image: "/img/cachorro.png",
    correctAnswer: "five"
  },
  {
    text: "Is the sun a star?",
    image: "/img/sol.jpg",
    correctAnswer: "yes"
  },
  {
    text: "How many bananas?",
    image: "/img/laranja.avif",
    correctAnswer: "zero"
  },
  {
    text: "How many apples?",
    image: "/img/maca.jpg",
    correctAnswer: "three"
  },
  {
    text: "Little Red Riding Hood left home to visit her sick grandmother, carrying a basket of food.\n\nDid Little Red Riding Hood go to her grandma's house?",
    image: "/img/chapeu_caminho.webp",
    correctAnswer: "yes"
  },
  
  {
    text: "Little Red Riding Hood met a wolf on the way, who asked her where she was going.\nWas she going to a party?",
    image: "/img/chapeu_lobo.webp",
    correctAnswer: "no"
  },
  {
    text: "Each pig built a house: one of straw, one of wood, and one of bricks. The wolf blew hard to knock them down.\nDid the wolf blow the straw house?",
    image: "/img/trespig.webp",
    correctAnswer: "yes"
  },
  {
    text: "Each pig built a house: one of straw, one of wood, and one of bricks. The wolf blew hard to knock them down\n.Was the brick house safe?",
    image: "/img/pig.jpg",
    correctAnswer: "yes"
  }
];

function updateQuestion() { //funcao para atualizar a pergunta atual
  const q = questions[currentQuestion];
  document.getElementById("question-text").textContent = q.text;
  document.getElementById("quiz-image").src = q.image;
  document.getElementById("feedback").textContent = "";
  document.getElementById("log").textContent = "";
}

async function loadRecognizer() { //funcao para carregar o reconhecedor de voz do TensorFlow.js
  if (!recognizer) {
    recognizer = speechCommands.create("BROWSER_FFT"); //cria o reconhecedor de voz
    await recognizer.ensureModelLoaded();
  }
}

async function listenForAnswer() {  //funcao para ouvir a resposta do usuario usando reconhecimento de voz do TensorFlow.js 
  await loadRecognizer();

  document.getElementById("feedback").textContent = "Ouvindo...";

  recognizer.listen(result => { //funcao para ouvir a resposta do usuario usando reconhecimento de voz do TensorFlow.js
    const scores = result.scores;
    const labels = recognizer.wordLabels();
    const highestIndex = scores.indexOf(Math.max(...scores));
    const command = labels[highestIndex];

    if (!allowedCommands.includes(command)) return; //verifica se o comando é permitido

    recognizer.stopListening();
    document.getElementById("log").innerHTML = `Comando detectado: <strong>${command}</strong>`; 
    handleCommand(command);  //chama a funcao handleCommand para lidar com o comando detectado
  }, {
    probabilityThreshold: 0.75, //limite de probabilidade para considerar um comando detectado
    overlapFactor: 0.3, //fator de sobreposição para evitar que o reconhecimento de voz pare muito rapidamente
  });
}

function start() { //funcao para iniciar o quiz/ reiniciar o quiz;
  currentQuestion = 0;
  score = 0;
  document.getElementById("results").innerHTML = "";
  document.getElementById("quiz-container").style.display = "block";
  updateQuestion();
}

function stopRecognition() { //para parar o reconhecimento de voz
  if (recognizer) {
    recognizer.stopListening();
    console.log("Reconhecimento parado");
  }
}

function endQuiz() { //para encerrar o quiz
  stopRecognition();
  showResults();
}

function showResults() { //funcao para mostrar os resultados do quiz
  const scorePercentage = ((score / questions.length) * 100).toFixed(1);
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("results").innerHTML = `
    <p>Você acertou ${score} de ${questions.length} perguntas.</p>
    <p>Porcentagem de acertos: <strong>${scorePercentage}%</strong></p>
  `;
}


function handleCommand(command) { //funcao para lidar com os comandos de voz 
  const correct = questions[currentQuestion].correctAnswer; // pega a resposta correta da pergunta atual
  const feedback = document.getElementById("feedback"); // pega o elemento de feedback

  if(command ==="right"){  //verifica se o comando é "right" e pula a pergunta atual
    currentQuestion++;
    if (currentQuestion < questions.length) {
      updateQuestion();
    } else {
      endQuiz();
    }
    return;
  }else if(command ==="left"){ //verifica se o comando é "left" e volta para a pergunta anterior
    currentQuestion--;
    if (currentQuestion >= 0) {
      updateQuestion();
    } else {
      currentQuestion = 0; 
    }
    return;
  }

  if (command === correct) { //verifica se o comando é igual a resposta correta
    feedback.innerHTML = "<span style='color: green;'>Correct!</span>";  // mostra feedback positivo
    score++;
  } else {
    feedback.innerHTML = "<span style='color: red;'>Incorrect.</span>";
  }

  setTimeout(() => { //espera 1 segundo para mostrar a proxima pergunta e verifica se ainda tem perguntas
    currentQuestion++;  
    if (currentQuestion < questions.length) {  
      updateQuestion();
    } else {
      endQuiz();
    }
  }, 1000);
}


