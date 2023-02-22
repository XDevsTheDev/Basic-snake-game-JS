var blocksize = 25
var rows = 20
var cols = 20

var canvas = document.getElementById("canvas")
var context = canvas.getContext("2d")
var scoretext = document.getElementById("score-text")
var text = document.getElementById("status")
var btn = document.getElementById("btn1")

var def_tailesize = 10
var nX = 1
var nY = 0

var tailsize = 1
var snakeTrail = []

var snakeX = 0
var snakeY = 0

var foodX = randomNum()
var foodY = randomNum()

var score = 0
var loop
window.onload = function(){

    Startgame()


}

btn.addEventListener("click",Startgame)

function Startgame(){
    def_tailesize = 10
    nX = 1
    nY = 0

    tailsize = 1
    snakeTrail = []

    snakeX = 0
    snakeY = 0

    foodX = randomNum()
    foodY = randomNum()

    score = 0


    canvas = document.getElementById("canvas")
    scoretext = document.getElementById("score-text")
    text = document.getElementById("status")
    
    canvas.height = rows * blocksize
    canvas.width = cols * blocksize

    context = canvas.getContext("2d")

    document.addEventListener("keydown", keyDownE)
    let renderRate = 9

    text.innerHTML = ''

    if(btn.classList[0] == "playagain-btn"){
        btn.classList.  remove('playagain-btn')
        btn.classList.add('hide')
    }


    loop = setInterval(updategame, 1000 / renderRate)
}


function updategame(){
    scoretext.innerHTML = "score : " + score + " currentX : " + snakeX + " currentY : " + snakeY 
    // console.log(snakeTrail);
    snakeX += nX
    snakeY += nY
    console.log(nX,nY);

    
    context.fillStyle="black"
    context.fillRect(0,0,canvas.width,canvas.height)
    context.strokeStyle = "#FF0000"


    context.fillStyle = "green"
    for(let i = 0; i<snakeTrail.length; i++){
        context.fillRect(
             snakeTrail[i].x * blocksize,
             snakeTrail[i].y * blocksize,
             blocksize,blocksize
             
        )
        
            if(snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY){
                gameOver()
            }
    }

    context.fillStyle = "red"
    context.fillRect(foodX * blocksize,foodY* blocksize,blocksize,blocksize)

    if(snakeX == foodX && snakeY == foodY){
        randomFood()

        tailsize += 1
        score += 1
    } else if(snakeX >= 20 | snakeX < 0 | snakeY >= 20 | snakeY < 0){
        gameOver()
    } 

    if(snakeTrail.length > tailsize){
        snakeTrail.shift()
    }

    snakeTrail.push({x:snakeX,y:snakeY})
    
}
function keyDownE(e){
    if(e.code == "ArrowUp"){
        nX = 0
        nY = -1
    }
    else if(e.code == "ArrowDown"){
        nX = 0
        nY = 1
    }
    else if(e.code == "ArrowLeft"){
        nX = -1
        nY = 0
    }
    else if(e.code == "ArrowRight"){
        nX = 1
        nY = 0
    }
}

function randomFood(){
    foodX = Math.floor(Math.random() * rows)
    foodY = Math.floor(Math.random() * cols)
}

function gameOver(){
    text.innerHTML = "!!GAMEOVER!!"
    text.classList.add("over")
    clearInterval(loop)

    btn = document.getElementById("btn1")
    btn.classList.remove('hide')
    btn.classList.add('playagain-btn' )
}

function randomNum(){
    return Math.floor(Math.random() * 20)
}