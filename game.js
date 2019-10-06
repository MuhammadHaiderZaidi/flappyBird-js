const play = document.querySelector(".playButton button");
const playBtn = document.querySelector(".playButton");
const maingame = document.querySelector(".main");


var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");


var startGame = false;

var bg = new Image();
var bird = new Image();
var upPipe= new Image();
var downPipe= new Image();


var anm= ["assets/bird1.png","assets/bird.png","assets/bird2.png"];

var i=0,j=0;

bg.src = "assets/bg.png";
bird.src = `${anm[i]}`;

upPipe.src ="assets/pipeNorth.png";
downPipe.src = "assets/pipeSouth.png";

var pipe =[{ x: cvs.width,y:0},
    { x: cvs.width+125,y:0},
    { x: cvs.width+250,y:0}];
pipe
var gap;


var bX = 10;
var bY = 150;
var flap = false,flapCount = 0,x=8 ;

function birdFly(){
    if(j==15){
        i++;
        if(i==3) i=0;
        bird.src = `${anm[i]}`;
        j=0;
    };
    j++;
}

function playGame(){

    ctx.drawImage(bg,0,0);

    gap = upPipe.height+134;
    
    for(var i=0;i<3;i++){
        ctx.drawImage(upPipe,pipe[i].x,pipe[i].y); 
        ctx.drawImage(downPipe,pipe[i].x,pipe[i].y+gap);
        pipe[i].x--;

        if( pipe[i].x+upPipe.width == 0 ){
            pipe[i]={
                x : cvs.width+100-upPipe.width,
                y : Math.floor(Math.random()*upPipe.height)-upPipe.height
            };
        }
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + upPipe.width && (bY <= pipe[i].y + upPipe.height || bY+bird.height >= pipe[i].y+gap) || bY + bird.height >=  cvs.height){
            location.reload(); // reload the page
        } 
    }

    if(!flap)   bY+=3;
    else    bY-=x,x-=0.5,flapCount++;
    if(flapCount>=20 ) flap=false,flapCount=0,x=8;
    
    birdFly();

    ctx.drawImage(bird,bX,bY);
    requestAnimationFrame(playGame);

}

document.addEventListener("keypress", function(event) {
    if (event.keyCode == 32){
        flap= true;
    }
 });

 play.addEventListener("click",function(){
    playBtn.classList.add("inactive");
    maingame.classList.add("active");
});

playGame();