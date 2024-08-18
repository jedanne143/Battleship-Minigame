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
let alienContainer = document.getElementById('alienContainer')
let control = document.getElementById('control')
let battleStats = document.getElementById('battleStats')
let dancingAlien = document.getElementById('dancingAlien')
let fighter = document.getElementById('fighter')
//audio files
const fighterSound = new Audio("audio/fighterF.mp3")
const alienSound = new Audio("audio/alienF.mp3")
const gameover = new Audio("audio/game-over-voice.mp3")
const won = new Audio("audio/won.mp3")

//Event listener to startgame
startGame.addEventListener('click' , function () {
    let winnerImage = document.getElementById("winnerImage");
    //remove start button
    startGame.style.display = "none"
    dancingAlien.style.display = "none"
    const title = document.getElementById("title")
    title.style.display = "none"
    // fire button and aliens appear
    battleStats.style.display ="flex"
    fireBtn.style.display = "flex";
    displayDamage.textContent = "Game has begun. Use the fire button to defeat the aliens"
    //display stat info of fighter and selected alien
    let fighterStat = document.getElementById('fighterStat')
    let fighterHull = document.createElement('p')
    fighterHull.textContent = "Hull: " + fighter_.hull
    fighterStat.appendChild(fighterHull)
    let fighterFirepower =document.createElement('p')
    fighterFirepower.textContent = "Firepower: 5" 
    fighterStat.appendChild(fighterFirepower)
    let fighterAccuracy = document.createElement('p')
    fighterAccuracy.textContent ="Accuracy: 0.7"
    fighterStat.appendChild(fighterAccuracy)
    //selected alien
    let alienStat = document.getElementById('alienStat')
    let alienHull = document.createElement('p')
    alienHull.textContent = "Hull: " + alienShip[0].hull
    alienStat.appendChild(alienHull)
    let alienFirepower =document.createElement('p')
    alienFirepower.textContent = "Firepower: " + alienShip[0].firepower
    alienStat.appendChild(alienFirepower)
    let alienAccuracy = document.createElement('p')
    alienAccuracy.textContent ="Accuracy: " + alienShip[0].accuracy
    alienStat.appendChild(alienAccuracy)
    //event listener to fire 
    fireBtn.addEventListener("click" , function (event) {
        //fighter attacks first
            if (Math.random() < 0.7) {
                fighter.style.transform = "scale(1.4)"
                fighterSound.play()
                alienShip[0].hull -= 5;
                displayDamage.style.color = "beige"
                displayDamage.textContent = 'You hit the target! Alien hull: ' + alienShip[0].hull
                fighter.style.transform = "scale(1)"

                if (alienShip[0].hull <= 0){
                    //removed destroyed alien in the array & display
                    let alienDefeated = document.querySelector(".alien")
                    alienContainer.removeChild(alienDefeated)
                    alienShip.shift();
                    displayDamage.style.color = "beige"
                    displayDamage.textContent = 'Alien destroyed! Number of aliens left:' + alienShip.length
                    fighter.style.transform = "scale(1.0)"
                            //to determine if there's alien left
                            if (alienShip.length === 0) {
                                won.play();
                                winnerImage.style.display = "flex"
                                fireBtn.style.display = 'none';
                                setTimeout(() => {
                                    location.reload();
                                }, 2000);
                            }
                    //update alienStat of new alien
                    alienHull.textContent = "Hull: " + alienShip[0].hull
                    alienStat.appendChild(alienHull)
                    alienFirepower.textContent = "Firepower: " + alienShip[0].firepower
                    alienStat.appendChild(alienFirepower)
                    alienAccuracy.textContent ="Accuracy: " + alienShip[0].accuracy
                    alienStat.appendChild(alienAccuracy)
                    //ask user to play more
                    fireBtn.style.display = "none"
                    let playMore = document.createElement('button')
                    playMore.textContent = "Play More"
                    playMore.style.border = "1px solid lime"
                    playMore.className = "choose"
                    control.appendChild(playMore)
                    let retreat = document.createElement('button')
                    control.appendChild(retreat)
                    retreat.textContent = "Retreat"
                    retreat.style.border= "1px solid lime"
                    retreat.className = "choose"
                    playMore.onclick = () => {
                        control.removeChild(retreat)
                        control.removeChild(playMore)
                        fireBtn.style.display = "flex"
                    }
                    retreat.onclick = () => {
                        gameover.play()
                        alert("Game over!")
                        setTimeout(() => {
                            location.reload();
                        }, 2000);
                    }
                } else {
                //alien survived the fighters attack. It fires back
                //update alienStat of new alien
                alienHull.textContent = "Hull: " + alienShip[0].hull
                alienStat.appendChild(alienHull)
                alienFirepower.textContent = "Firepower: " + alienShip[0].firepower
                alienStat.appendChild(alienFirepower)
                alienAccuracy.textContent ="Accuracy: " + alienShip[0].accuracy
                alienStat.appendChild(alienAccuracy)
                fighter.style.transform = "scale(1)";
                setTimeout(() => { alienAttack } , 2000)
                }

            } else {
                fighter.style.transform = "scale(1.4)"
                fighterSound.play()
                displayDamage.style.color = "red"
                displayDamage.textContent = "You missed!";
                //alien attacks
                setTimeout(() => {
                    fighter.style.transform = "scale(1)"
                    if (Math.random() < alienShip[0].accuracy){
                        alienSound.play();
                        fighter_.hull -= alienShip[0].firepower
                        fighterHull.textContent = "Hull: " + fighter_.hull
                        fighterHull.style.color = "red"
                        displayDamage.style.color = "red"
                        displayDamage.textContent= 'The alien hit your ship!'
                    } else {
                        alienSound.play();
                        displayDamage.style.color = "beige"
                        displayDamage.textContent = 'The alien counter fired, but missed its shot'
                    } 
                } , 2000)
            }
})
})
//------------------------------------------------------------------------------//

function alienAttack () {
    fighter.style.transform = "scale(1)"
    if (Math.random() < alienShip[0].accuracy){
        alienSound.play();
        fighter_.hull -= alienShip[0].firepower
        fighterHull.textContent = "Hull: " + fighter_.hull
        fighterHull.style.color = "red"
        displayDamage.style.color = "red"
        displayDamage.textContent = 'The alien hit your ship!'
        if (fighter_.hull <= 0 ){
            gameover.play()
            alert("You lost! Aliens won")
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
    } else {
        alienSound.play()
        displayDamage.style.color = "beige"
        displayDamage.textContent = 'The alien counter fired, but missed its shot'
    }
}

