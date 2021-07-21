import Ship from '../Images/Ship2.png'
import ShipThrust from '../Images/ShipThrust2.png'
import Bullet from '../Images/Bullet.png'
import LargeAsteroid from '../Images/Asteroid-Large 114x114.png'
import Mars from '../Images/Mars.png'

import '../Styles/Asteroids.css';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import AppContext from '../Context/AppContext'

import ThrustSFX from '../Sounds/Thrust2.wav'
import ShipStopSFX from '../Sounds/Stop.wav'
import LaserSFX from '../Sounds/Laser.wav'
import HitSFX from '../Sounds/Hit.wav'
import DeathSFX from '../Sounds/Death.wav'
import Soundtrack from '../Sounds/The Oh Of Pleasure - Ray Lyrnch.mp3'

let score = 0
let lives = 5
let shipX = 0
let shipY = 0
let dX = 0
let dY = 0
let rateX = 0
let rateY = 0
let shipDegrees = 0
let shipAngle = 0
let mouseX = 0
let mouseY = 0
let thrust = 1
let mouseClicked = false
let windowWidth = 0
let windowHeight = 0
let shipGraphics = Ship
let thrustSFX = new Audio(ThrustSFX)
let stopSFX = new Audio(ShipStopSFX)
let laserSFX = new Audio(LaserSFX)
let hitSFX = new Audio(HitSFX)
let deathSFX = new Audio(DeathSFX)
let soundtrack = new Audio(Soundtrack)
let shipElement = null
//[x, y, rotation, element, dx, dy, readyToShoot ]
let bullets = [
    [-1000, -100, 0, null, 0, 0, true],
    [-1000, -100, 0, null, 0, 0, true],
    [-1000, -100, 0, null, 0, 0, true],
    [-1000, -100, 0, null, 0, 0, true],
    [-1000, -100, 0, null, 0, 0, true]]
//[x, y, rotation, element, dx, dy, active, rotationRate ]
let asteroids = [
    [450, 180, 0, null, 1, 0, true, 1],
    [200, 800, 0, null, 2, 0, true, 1],
    [1600, 800, 0, null, 3, 0, true, 1],
    [1500, 120, 0, null, 4, 0, true, 1],
    [1750, 500, 0, null, 5, 0, true, 1]]
let bulletIndex = 0
let bulletSpeed = 30

function Asteroids() {
    const [shipCoords, setShipCoords] = useState([100, 100])
    const [mouseUpdate, setMouseUpdate] = useState(0)
    const { userVerified } = useContext(AppContext)
    const { userName } = useContext(AppContext)
    const { setPreviousScore } = useContext(AppContext)
    const { userHiScore, setUserHiScore } = useContext(AppContext)
    const { fetchURL } = useContext(AppContext)
    const history = useHistory()


    useEffect(() => {

        var id = window.setTimeout(function () { }, 0);

        // clears all previously started timeouts
        while (id--) {
            window.clearTimeout(id); // will do nothing if no timeout with id is present
        }

        if (userVerified === false) {
            history.push('/')
        }

        thrustSFX.volume = .2
        stopSFX.volume = .2
        laserSFX.volume = .2
        hitSFX.volume = .2
        soundtrack.volume = .3

        soundtrack.loop = true

        windowWidth = window.visualViewport.width
        windowHeight = window.visualViewport.height
        shipElement = document.getElementById('ship')

        bullets[0][3] = document.getElementById('bullet0')
        bullets[1][3] = document.getElementById('bullet1')
        bullets[2][3] = document.getElementById('bullet2')
        bullets[3][3] = document.getElementById('bullet3')
        bullets[4][3] = document.getElementById('bullet4')

        asteroids[0][3] = document.getElementById('asteroid0')
        asteroids[1][3] = document.getElementById('asteroid1')
        asteroids[2][3] = document.getElementById('asteroid2')
        asteroids[3][3] = document.getElementById('asteroid3')
        asteroids[4][3] = document.getElementById('asteroid4')

        randomizeAsteroids()

        score = 0
        lives = 5
        shipX = windowWidth / 2 - 45
        shipY = windowHeight / 2 - 45
        rateX = 0
        rateY = 0

        soundtrack.play()

        let timerID = setTimeout(function tick() {
            setShipCoords([shipCoords[0] + 1, 100])
            updateShipLocation()
            updateShipRotation()
            updateBullets()
            updateAsteroids()

            if (mouseClicked) {
                thrustSFX.play()
                shipThrust()
            } else {
                thrustSFX.pause()
                thrustSFX.currentTime = 0
            }

            timerID = setTimeout(tick, 25)
        }, 25)
    }, [])

    const randomizeAsteroids = () => {
        asteroids.forEach((a, index) => {
            // Set random dX [-2,2]
            asteroids[index][4] = (Math.random() * 2) - (Math.random() * 4)
            // Set random dY [-2,2]
            asteroids[index][5] = (Math.random() * 2) - (Math.random() * 4)
            // Set random rotationRate [-2,2]
            asteroids[index][7] = (Math.random() * 2) - (Math.random() * 4)
        })
    }

    function updateShipLocation() {
        shipX += rateX
        shipY += rateY

        if (shipX > windowWidth + 80) {
            shipX = - 80
        }

        if (shipX < -80) {
            shipX = windowWidth + 80
        }

        if (shipY > windowHeight + 45) {
            shipY = -90
        }

        if (shipY < -90) {
            shipY = windowHeight + 45
        }

        shipElement.style.left = `${shipX}px`
        shipElement.style.top = `${shipY}px`
    }

    const updateShipRotation = () => {
        let shipXoffset = parseInt(shipElement.style.left) + 60
        let shipYoffset = parseInt(shipElement.style.top) + 60

        dX = mouseX - shipXoffset

        dY = mouseY - shipYoffset

        shipAngle = Math.atan2(dY, dX)
        shipDegrees = shipAngle * 180 / Math.PI

        if (shipDegrees < 0) {
            shipDegrees += 360
        }
        shipElement.style.transform = `rotate(${shipDegrees}deg)`
    }

    const shipThrust = () => {
        let thrustX = Math.cos(shipAngle) * thrust
        let thrustY = Math.sin(shipAngle) * thrust
        rateX += thrustX
        rateY += thrustY

        if (rateX > 100) {
            rateX = 100
        }

        if (rateX < -100) {
            rateX = -100
        }

        if (rateY > 100) {
            rateY = 100
        }

        if (rateY < -100) {
            rateY = -100
        }


    }

    const updateBullets = () => {
        bullets.forEach((bullet, index) => {
            bullets[index][0] += bullets[index][4]
            bullets[index][1] += bullets[index][5]
            bullets[index][3].style.left = `${bullets[index][0]}px`
            bullets[index][3].style.top = `${bullets[index][1]}px`
            bullets[index][3].style.transform = `rotate(${bullets[index][2] + 135}deg)`

            if (bullets[index][0] > windowWidth + 100 || bullets[index][0] < -100) {
                bullets[index][6] = true
                bulletIndex = index
            }

            if (bullets[index][1] > windowHeight + 100 || bullets[index][1] < -100) {
                bullets[index][6] = true
                bulletIndex = index
            }
        })
    }

    const updateAsteroids = () => {
        //[x, y, rotation, element, dx, dy, active ]
        asteroids.forEach((asteroid, index) => {
            // update X position
            asteroids[index][0] += asteroids[index][4]
            // update Y position
            asteroids[index][1] += asteroids[index][5]
            // update rotation
            asteroids[index][2] += asteroids[index][7]

            // HANDLE WRAP AROUND ------------------------------------------------------------
            if (asteroids[index][0] > windowWidth) {
                asteroids[index][0] = -100
            }
            if (asteroids[index][0] < -100) {
                asteroids[index][0] = windowWidth
            }
            if (asteroids[index][1] > windowHeight) {
                asteroids[index][1] = -100
            }
            if (asteroids[index][1] < -100) {
                asteroids[index][1] = windowHeight
            }
            // END HANDLE WRAP AROUND ------------------------------------------------------------

            // UPDATE CSS LOCATIONS / ROTATIONS ---------------------------------------------------
            asteroids[index][3].style.left = `${asteroids[index][0]}px`
            asteroids[index][3].style.top = `${asteroids[index][1]}px`
            asteroids[index][3].style.transform = `rotate(${asteroids[index][2]}deg)`
            // END UPDATE CSS LOCATIONS / ROTATIONS ---------------------------------------------------

            // HANDLE SHIP COLLISION WITH ASTEROIDS --------------------------------------------------
            if (shipX < asteroids[index][0] + 80 &&
                shipX + 90 > asteroids[index][0] + 20 &&
                shipY < asteroids[index][1] + 80 &&
                shipY + 90 > asteroids[index][1] + 20) {
                asteroids[index][4] = 0
                asteroids[index][5] = 0
                handleDeath()
            }
            // END SHIP COLLISION WITH ASTEROIDS --------------------------------------------------

            // HANDLE BULLET COLLISIONS WITH ASTEROIDS ---------------------------------------------
            bullets.forEach((bullet, index2) => {
                if (bullets[index2][0] < asteroids[index][0] + 114 &&
                    bullets[index2][0] + 10 > asteroids[index][0] &&
                    bullets[index2][1] < asteroids[index][1] + 114 &&
                    bullets[index2][1] + 10 > asteroids[index][1]) {
                    // bullet hit asteroid
                    asteroids[index][4] += bullets[index2][4] / 5
                    asteroids[index][5] += bullets[index2][5] / 5

                    resetBullet(index2)
                    hitSFX.currentTime = 0
                    hitSFX.play()
                    score += 10
                }
            })
            // END HANDLE BULLET COLLISIONS WITH ASTEROIDS ---------------------------------------------
        })
    }

    const handleDeath = () => {
        // alert(`asteroid hit player`)
        lives--

        if (lives === 0) {
            handleGameOver()
        }

        shipX = windowWidth / 2 - 45
        shipY = windowHeight / 2 - 45
        rateX = 0
        rateY = 0
        deathSFX.currentTime = 0
        deathSFX.play()
        checkAsteroidsAtOrigin()
    }

    const handleGameOver = () => {
        soundtrack.pause()
        soundtrack.currentTime = 0

        if (score > userHiScore) {
            setUserHiScore(score)

            let bodyObject = { 'username': userName, 'score': score }

            fetch(`${fetchURL}/updateHiScore`, {
                credentials: 'include',
                method: 'patch',
                headers: {
                    'Content-Type': 'application/json',
                    'charset': 'UTF-8'
                },
                body: JSON.stringify(bodyObject)
            })
                .then(response => response.json())
                .then(result => { console.log(result) })
        }

        setPreviousScore(score)

        history.push('/UserPage')
    }


    const checkAsteroidsAtOrigin = () => {
        asteroids.forEach((asteroid, index) => {

            if (shipX < asteroids[index][0] + 80 &&
                shipX + 90 > asteroids[index][0] + 20 &&
                shipY < asteroids[index][1] + 80 &&
                shipY + 90 > asteroids[index][1] + 20) {
                asteroids[index][0] = 200
                asteroids[index][1] = 200
            }
        })
    }

    const handleClick = (e) => {
        e.preventDefault()
    }

    const handleClickDown = (e) => {
        // console.log(e.button)

        if (e.button === 0) {
            mouseClicked = true;
            shipGraphics = ShipThrust
        }
        if (e.button === 2) {
            if (bullets[bulletIndex][6] === true) {
                laserSFX.currentTime = 0
                laserSFX.play()
                // [ x, y, dx, dy, rotation]
                bullets[bulletIndex][0] = shipX + 55
                bullets[bulletIndex][1] = shipY + 47
                bullets[bulletIndex][2] = shipDegrees
                bullets[bulletIndex][4] = Math.cos(shipAngle) * bulletSpeed
                bullets[bulletIndex][5] = Math.sin(shipAngle) * bulletSpeed
                bullets[bulletIndex][6] = false

                // apply momentum to ship
                rateX -= Math.cos(shipAngle) * bulletSpeed / 10
                rateY -= Math.sin(shipAngle) * bulletSpeed / 10
            }
            bulletIndex++
            bulletIndex = bulletIndex % 5

        }

        if (e.button === 3) {
            soundtrack.pause()
            soundtrack.currentTime = 0
        }
    }

    const handleClickUp = (e) => {
        if (e.button === 0) {
            mouseClicked = false;
            shipGraphics = Ship
        }
    }

    const handleMouseMove = (e) => {
        setMouseUpdate(e.pageX)

        mouseX = e.pageX
        mouseY = e.pageY
    }

    const handleKeyDown = (e) => {

        if (e.key === ' ') {
            resetBullets()
            stopSFX.currentTime = 0
            stopSFX.play()
            rateX = 0
            rateY = 0
        }
    }

    const resetBullet = (index) => {
        bullets[index][0] = -1000
        bullets[index][1] = -1000
        bullets[index][4] = 0
        bullets[index][5] = 0
        bullets[index][6] = true
    }

    const resetBullets = () => {
        bullets.forEach((bullet, index) => {
            bullets[index][0] = -1000
            bullets[index][1] = -1000
            bullets[index][4] = 0
            bullets[index][5] = 0
            bullets[index][6] = true
        })
    }

    return (
        <div className="App"  >
            <header className="App-header"

                onMouseDown={handleClickDown}
                onMouseUp={handleClickUp}
                onClick={handleClick}
                onMouseMove={handleMouseMove}
                onKeyDown={handleKeyDown}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                tabIndex='0'>

                <div className="score"> SCORE: {score} LIVES: {lives} </div>


                <div className='bullet0' id='bullet0'>
                    <img src={Bullet} alt='bullet'></img>
                </div>

                <div className='bullet1' id='bullet1'>
                    <img src={Bullet} alt='bullet'></img>
                </div>

                <div className='bullet2' id='bullet2'>
                    <img src={Bullet} alt='bullet'></img>
                </div>

                <div className='bullet3' id='bullet3'>
                    <img src={Bullet} alt='bullet'></img>
                </div>

                <div className='bullet4' id='bullet4'>
                    <img src={Bullet} alt='bullet'></img>
                </div>

                <div className='asteroid0' id='asteroid0'>
                    <img src={LargeAsteroid} alt='LAsteroid'></img>
                </div>

                <div className='asteroid1' id='asteroid1'>
                    <img src={LargeAsteroid} alt='LAsteroid'></img>
                </div>

                <div className='asteroid2' id='asteroid2'>
                    <img src={LargeAsteroid} alt='LAsteroid'></img>
                </div>

                <div className='asteroid3' id='asteroid3'>
                    <img src={LargeAsteroid} alt='LAsteroid'></img>
                </div>

                <div className='asteroid4' id='asteroid4'>
                    <img src={Mars} alt='LAsteroid'></img>
                </div>

                <div className='ship' id='ship'>
                    <img src={shipGraphics} alt='ship'></img>
                </div>
            </header>
        </div>
    );
}

export default Asteroids;
