let canvas = document.getElementById("snake"); //criar elemento que irá rodar o jogo
let context = canvas.getContext("2d"); //....

var my_gradient = context.createLinearGradient(50, 50, 500, 500);
my_gradient.addColorStop(0, "black");
my_gradient.addColorStop(0.5, "red");
my_gradient.addColorStop(1, "white");
let pontos = 0;
let rango = 1
let box = 16;
let max_x = 31;
let max_y =31;
let snake = []; //criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
snake[0] ={
    x: 4 * box,
    y: 4 * box
}
let direction = "right";
let food ={
    x: Math.floor(Math.random() * max_x + 1) * box,
    y: Math.floor(Math.random() * max_y + 1) * box
}

function criarBG(){
    context.fillStyle = "grey";
    context.fillRect(0, 0, (max_x +1)*box, (max_y +1)*box); //desenha o retângulo usando x e y e a largura e altura setadas
}

function criarCobrinha (){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = my_gradient;
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood (){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

function placar(){
    document.getElementById("placar").innerHTML = pontos.toFixed(0) + " Pontos" ;

}

//quando um evento acontece, detecta e chama uma função
document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo(){    

    if(snake[0].x > (max_x*box) && direction == "right") { 
        snake[0].x = 0; pontos /= 2; snake.pop(); }
    if(snake[0].x < 0 && direction == 'left') snake[0].x = max_x * box;
    if(snake[0].y > (max_y*box) && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = max_y * box;
    

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over!  Voce fez' + pontos + ' pontos.');
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();
    placar();


    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    console.log(snakeX , snakeY , pontos.toFixed(1) + "Pontos" ,  rango , snake.length);

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //pop tira o último elemento da lista
        pontos += (snake.length - rango);
        rango += .1;

    }else{
        context.fillStyle = "purple";
        context.fillRect(food.x, food.y, box, box);
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
        context.fillStyle = "green";
        context.fillRect(food.x, food.y, box, box);
        rango = 1;
    }
    if(pontos <= 0) pontos = 0;
    
    let newHead ={
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //método unshift adiciona como primeiro quadradinho da cobrinha
}

let jogo = setInterval(iniciarJogo, 200);