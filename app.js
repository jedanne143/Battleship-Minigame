
class Player {
    constructor (hull, firepower, accuracy){
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }
}

let fighter_ = new Player (20 ,5 , 0.7)

// Generate alien ships with random properties
let alienShip = [];
for (let i = 0; i < 6; i++) {
    let alienHull = 3 + Math.round(Math.random() * 3); // random integer between 3 and 6
    let alienFirepower = 2 + Math.round(Math.random() * 2); // random integer between 2 and 4
    let alienAccuracy = 0.6 + Math.round(Math.random() * 0.2); // random float between 0.6 and 0.8
    alienShip.push(new Player(alienHull, alienFirepower, alienAccuracy));
}

let fireBtn = document.getElementById('fireBtn')
let startGame = document.getElementById('startGame')
let displayDamage = document.getElementById('displayDamage')
let alien = document.querySelectorAll('.alien')
let alienContainer = document.getElementById('alienContainer')
let control = document.getElementById('control')
let battleStats = document.getElementById('battleStats')
let dancingAlien = document.getElementById('dancingAlien')

//audio files
const fighterSound = new Audio("audio/fighterF.mp3")
const alienSound = new Audio("audio/alienF.mp3")
const gameover = new Audio("audio/game-over-voice.mp3")
const won = new Audio("audio/won.mp3")

//Event listener to startgame
startGame.addEventListener('click' , function () {
    //remove start button
    startGame.style.display = "none"
    dancingAlien.style.display = "none"
    const title = document.getElementById("title")
    title.style.display = "none"
    // fire button and aliens appear
    battleStats.style.display ="flex"
    fireBtn.style.display = "flex";

    alien.forEach(alien => {
        alien.style.display = 'flex';
    });
    alert("Game Began\n Use fire button to defeat the aliens")
    //display stat info of fighter and selected alien
    let fighterStat = document.getElementById('fighterStat')
    let fighterHull = document.createElement('p')
    fighterHull.innerText = "Hull: " + fighter_.hull
    fighterHull.style.color = "red"
    fighterStat.appendChild(fighterHull)
    let fighterFirepower =document.createElement('p')
    fighterFirepower.innerText = "Firepower: 5" 
    fighterStat.appendChild(fighterFirepower)
    let fighterAccuracy = document.createElement('p')
    fighterAccuracy.innerText ="Accuracy: 0.7"
    fighterStat.appendChild(fighterAccuracy)
    //selected alien
    let alienStat = document.getElementById('alienStat')
    let alienHull = document.createElement('p')
    alienHull.innerText = "Hull: " + alienShip[0].hull
    alienStat.appendChild(alienHull)
    alienHull.style.color = "red"
    let alienFirepower =document.createElement('p')
    alienFirepower.innerText = "Firepower: " + alienShip[0].firepower
    alienStat.appendChild(alienFirepower)
    let alienAccuracy = document.createElement('p')
    alienAccuracy.innerText ="Accuracy: " + alienShip[0].accuracy
    alienStat.appendChild(alienAccuracy)
    //event listener to fire
    fireBtn.addEventListener("click" , function (event) {
        //fighter attacks first
        fighterSound.play()


        if (fighter_.hull > 0){
            if (Math.random() < 0.7) {
                alienShip[0].hull -= 5;
                alert('You hit the target! Alien1 hull: ' + alienShip[0].hull);

                if (alienShip[0].hull <= 0){
                    //removed destroyed alien in the array

                    alienShip.shift();
                    alert('Alien destroyed! Number of aliens left:' + alienShip.length)
                            //to determine if there's alien left
                            if (alienShip.length === 0) {
                                won.play();
                                alert('All aliens have been defeated. You won!');
                                fireBtn.style.display = 'none';
                                location.reload(); 
                            }
                    //update alienStat of new alien
                    alienHull.innerText = "Hull: " + alienShip[0].hull
                    alienStat.appendChild(alienHull)
                    alienFirepower.innerText = "Firepower: " + alienShip[0].firepower
                    alienStat.appendChild(alienFirepower)
                    alienAccuracy.innerText ="Accuracy: " + alienShip[0].accuracy
                    alienStat.appendChild(alienAccuracy)
                    //ask user to play more
                    fireBtn.style.display = "none"
                    let playMore = document.createElement('button')
                    playMore.innerText = "Play More"
                    // playMore.style.backgroundColor = "red"
                    playMore.style.border = "1px solid lime"
                    playMore.className = "choose"
                    control.appendChild(playMore)
                    let retreat = document.createElement('button')
                    control.appendChild(retreat)
                    retreat.innerText = "Retreat"
                    // retreat.style.backgroundColor = "red"
                    retreat.style.border= "1px solid lime"
                    retreat.className = "choose"
                    playMore.onclick = () => {
                        control.removeChild(retreat)
                        control.removeChild(playMore)
                        fireBtn.style.display = "flex"
                    }
                    retreat.onclick = () => {
                        alert("Game over!")
                        location.reload(); 
                    }
                    
                } else {
                //alien survived the fighters attack. It fires back
                alienAttack() 
                }

            } else {
                alert("You missed! Alien hull:" + alienShip[0].hull);
                //alien attacks
                alienSound.play();
                if (Math.random() < alienShip[0].accuracy){
                    fighter_.hull -= alienShip[0].firepower
                    fighterHull.innerText = "Hull: " + fighter_.hull
                    alert('Alien hit your ship: Fighter hull' + fighter_.hull )
                } else {
                    alert('Alien shoot bad')
                }
                
            }
    } else {
        gameover.play()
        alert("You lost! Aliens won")
        location.reload(); 
    }
})
})

function alienAttack () {
    alienSound.play();
    if (Math.random() < alienShip[0].accuracy){
        fighter_.hull -= alienShip[0].firepower
        fighterHull.innerText = "Hull: " + fighter_.hull
        alert('Alien hit your ship: Fighter hull' + fighter_.hull )
        if (fighter_.hull <= 0 ){
            gameover.play()
            alert("You lost! Aliens won")
            location.reload(); 
        }
    } else {
        alert('Alien shoot bad')
    }
}

