const zombies = [];
var score = 0;

function startGame() {
  var button = document.getElementById("start-button");

  button.style.display = 'none';

  createZombie();
}

function gamePlay() {
    const div = document.querySelector('.bg');
    const divRect = div.getBoundingClientRect();
  
    zombies.forEach((zombie) => {
      zombie.addEventListener("click", function() {
        zombie.style.display = "none";
        score += 10;
        scoreUpdate(score);
      });
  
      const zombieRect = zombie.getBoundingClientRect();
      console.log(zombieRect.left);
      if (zombieRect.left > divRect.right) {
        zombie.style.display = 'none'; 
        console.log("KO");
      }
    });
  }
  

function scoreUpdate(score) {
    const scoreDiv = document.getElementById('score');
    scoreDiv.textContent = score;
  }

function createZombie() {
    const bg = document.querySelector('.bg');
    const zombie = document.createElement("div");
    zombie.className = "zombie";
    
    var zombieScale = 0.4+Math.random()/2;
    zombie.style.scale = zombieScale;

    // console.log(zombieScale);

    bg.appendChild(zombie);
    zombies.push(zombie);
    const delay = 3000;

    gamePlay();
    setTimeout(createZombie, delay);
}
