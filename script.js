const zombies = [];
let isGameOver = false;
let firstGame = true;
var score = 0;
var lifesCounter = 3;

function startGame() {
  var button = document.getElementById("start-button");
    
  button.style.display = 'none';
  isGameOver = false;
  lifesCounter = 3;
  
  hideOverlay();
  if(firstGame)gamePlay();
  createZombie();
  scoreUpdate(30, true);
  updateLifes();

  firstGame = false;
}

function updateLifes(){
  var lifes0 = document.getElementById("heart0");
  var lifes1 = document.getElementById("heart1");
  var lifes2 = document.getElementById("heart2");

  if(lifesCounter === 3){
    lifes0.src = "img/full_heart.png";
    lifes1.src = "img/full_heart.png";
    lifes2.src = "img/full_heart.png";
  }
  else if(lifesCounter === 2){
    lifes2.src = "img/empty_heart.png";
  }
  else if(lifesCounter === 1){
    lifes1.src = "img/empty_heart.png";
  }
  else if(lifesCounter === 0){
    lifes0.src = "img/empty_heart.png";
    gameOver();
  }
}


function gamePlay() {
  const backGround = document.querySelector('.bg');

  for (let i = 0; i < 3; i++) {
    const img = document.createElement("img");

    img.src = "img/full_heart.png";
    img.style.width = "40px";
    img.style.height = "auto";
    img.id = "heart"+i;
    img.className = "heart";

    lifes.appendChild(img);
  }

  backGround.addEventListener("click", function(){
    console.log("G",isGameOver);
    if (event.target === backGround && score >= 0 && isGameOver === false){
      console.log("--")
      scoreUpdate(-3);
    }
  });
}

function gameOver(){
  var button = document.getElementById("start-button");
  button.style.display = 'block';

  isGameOver = true;

  zombies.forEach((zombie) => {
    clearInterval(zombie.animationId);
    zombie.display = 'none';
    zombie.remove();
  });

  zombies.length = 0;
  showOverlay();
  button.textContent ='Play again!';
}

function scoreUpdate(addPoints, set = false) {
  const scoreDiv = document.getElementById('score');
  let scoreContent = "";

  score += addPoints;

  if(set){
    score = addPoints;
  }

  const stringScore = Math.abs(score).toString();

  if (score < 0) {
    scoreContent = "-";
  }

  for (let i = 0; i < 5 - stringScore.length; ++i) {
    scoreContent += '0';
  }

  scoreContent += stringScore;
  scoreDiv.textContent = scoreContent;
}


function createZombie() {
  if(isGameOver){
    return;
  }

  const bg = document.querySelector('.bg');
  const zombie = document.createElement("div");
  
  var zombieScale = 0.4 + Math.random() / 3;
  const randomY = Math.floor(Math.random() * 300);
  const maxWidth = window.innerWidth * 0.8 - 200;
  const speed = 1.4+ 2*Math.random();
  const delay = 100 + Math.random() * 800;

  zombie.className = "zombie";
  zombie.style.transform = `scale(${zombieScale})`;
  zombie.style.top = randomY + 'px';
  zombie.style.left = maxWidth + 'px';
  zombie.display = 'block';

  zombie.addEventListener("click", function() {
    if(score >= 0){
      clearInterval(zombie.animationId);
      zombie.display = 'none';
      zombie.remove();
      scoreUpdate(10);
    }
  });

  bg.appendChild(zombie);
  zombies.push(zombie);

  myMove(zombie, maxWidth, speed);
  setTimeout(createZombie, delay);
}

function myMove(zombie, maxWidth, speed) {
  var pos = maxWidth;
  var id = setInterval(frame, 10);

  zombie.style.left = maxWidth + 'px';

  function frame() {
    if (pos < -40) {
      clearInterval(id);
      zombie.remove();
      const index = zombies.indexOf(zombie);
      if (index !== -1) {
        zombies.splice(index, 1);
      }
      if(zombie.display === 'block'){
        lifesCounter -= 1;
        console.log(lifesCounter);
        updateLifes();
      }
    } else {
      pos -= speed;
      zombie.style.left = pos + 'px';
    }
  }
}

function showOverlay() {
  const overlay = document.getElementById('overlay');
  const menuText = document.getElementById('menuText');

  menuText.textContent = "Game over, Your result: "+ score;

  overlay.style.display = 'flex'; 
}

function hideOverlay() {
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'none'; 
}

