// Mouse trail effect
window.addEventListener("mousemove", function (e) {
  const trail = document.createElement("div");
  trail.className = "trail";
  trail.style.left = `${e.pageX}px`;
  trail.style.top = `${e.pageY}px`;
  document.body.appendChild(trail);
  setTimeout(() => document.body.removeChild(trail), 1000);
});


window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("audio");
  const playPauseBtn = document.getElementById("playPause");
  const seekBar = document.getElementById("seekBar");
  const currentTimeEl = document.getElementById("currentTime");
  const durationEl = document.getElementById("duration");

  playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playPauseBtn.textContent = "⏸";
    } else {
      audio.pause();
      playPauseBtn.textContent = "▶";
    }
  });

audio.addEventListener("loadedmetadata", () => {
  const duration = formatTime(audio.duration);
  durationEl.textContent = `/ ${duration}`;
});


audio.addEventListener("timeupdate", () => {
  currentTimeEl.textContent = formatTime(audio.currentTime);
  seekBar.value = (audio.currentTime / audio.duration) * 100;
});


  seekBar.addEventListener("input", () => {
    audio.currentTime = (seekBar.value / 100) * audio.duration;
  });

  function formatTime(time) {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }
});



window.addEventListener("DOMContentLoaded", () => {
  // 🎯 Memory Game
  const emojis = ["💜", "💜", "💛", "💛", "🎂", "🎂", "🎶", "🎶"];
  const shuffled = [...emojis].sort(() => 0.5 - Math.random());
  const board = document.getElementById("game-board");
  const movesText = document.getElementById("moves");

  let first = null, second = null, lock = false, moves = 0;

  function reset() {
    [first, second, lock] = [null, null, false];
  }

  function updateMoves() {
    moves++;
    movesText.textContent = `Moves: ${moves}`;
  }

  shuffled.forEach((emoji, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.emoji = emoji;
    card.innerText = "❓";

    card.addEventListener("click", () => {
      if (lock || card.classList.contains("matched") || card === first) return;

      card.innerText = card.dataset.emoji;

      if (!first) {
        first = card;
      } else {
        second = card;
        lock = true;
        updateMoves();

        if (first.dataset.emoji === second.dataset.emoji) {
          first.classList.add("matched");
          second.classList.add("matched");
          reset();
        } else {
          setTimeout(() => {
            first.innerText = "❓";
            second.innerText = "❓";
            reset();
          }, 800);
        }
      }
    });

    board.appendChild(card);
  });

  // 🧠 Q&A Quiz
  const quiz = [
    {
      question: "When ka gipanganak?",
      answer: "June 15, 2004",
      clue: "Answer in complete sentence nissa, e.g 'January 6, 2004' kuha?"
    },
    {
      question: "Finish the lyric: 'I had the time of my life...'",
      answer: "fighting dragons with you",
      clue: "wow, i'm disappointed."
    },
    {
      question: "What is your favorite color?",
      answer: "Purple",
      clue: "Bahala ka oy"
    },
    {
      question: "Des-",
      answer: "Destiny",
      clue: "HAY NAKO!"
    },
    {
      question: "Syrempre kay bday nimo, unsa akong favorite song sa Folklore? HAHAHAHA",
      answer: "Speak Now",
      clue: "Joke, imoha diay fav song sa Speak Now"
    }
  ];

  let current = 0;

  const questionEl = document.getElementById("quiz-question");
  const clueEl = document.getElementById("quiz-clue");
  const inputEl = document.getElementById("quiz-input");
  const feedbackEl = document.getElementById("quiz-feedback");
  const submitBtn = document.getElementById("quiz-submit");

  function loadQuestion() {
    questionEl.textContent = `Q${current + 1}: ${quiz[current].question}`;
    clueEl.textContent = "Answer all 5 questions correctly!";
    inputEl.value = "";
    feedbackEl.textContent = "";
  }

  submitBtn.addEventListener("click", () => {
    const userAnswer = inputEl.value.trim().toLowerCase();
    const correctAnswer = quiz[current].answer.toLowerCase();

    if (userAnswer === correctAnswer) {
      feedbackEl.textContent = "Brayta oy!!";
      current++;
      if (current < quiz.length) {
        setTimeout(loadQuestion, 800);
      } else {
        questionEl.textContent = "YUDII, CONGRATS NISSA SAM";
        clueEl.textContent = "HAPPY BIRTHDAY USAB NYAYAYAYA";
        inputEl.style.display = "none";
        submitBtn.style.display = "none";
        feedbackEl.textContent = "";
      }
    } else {
      feedbackEl.textContent = `ENGKKKK! MALI! Clue: ${quiz[current].clue}`;
    }
  });

  loadQuestion();
});
