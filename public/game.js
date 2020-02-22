let playerScoreText = $(".center-score-player"); 
let compScoreText = $(".center-score-comp");
let gameStatus = $(".center-score-status");
let rockImg = $("#rock");
let paperImg = $("#paper");
let scissorImg = $("#scissor");



//User Choice
rockImg.click(()=>{user(rock);});
paperImg.click(()=>{user(paper);});
scissorImg.click(()=>{user(scissor);});
let userCho;
let ucount=0;
let ccount=0;
//Computer Choice   
let compCho;  
function comp(){
    var math = Math.random();
    var randomNumber = Math.floor(math*3) + 1;         
    if(randomNumber===1){
        compCho="rock";
    } else if(randomNumber===2){
      compCho="paper";
    } else if(randomNumber===3){
      compCho="scissor";
    }
}



function user(userChoice){
    //User Choice
    if(userChoice===rock){
        userCho="rock";
    } else if(userChoice===paper){
        userCho="paper";
    } else if(userChoice===scissor){
        userCho="scissor";
    }

    //Comp
    comp();

    //Game

    if(userCho==="rock"){
        if(compCho==="rock"){
            gameStatus.text("Tie");
        } else if(compCho==="paper"){
            gameStatus.text("You Lose");
            ccount++;
            compScoreText.text(ccount);
        } else{
            gameStatus.text("You Won");
            ucount++;
            playerScoreText.text(ucount);
        }
    }

    if(userCho==="paper"){
        if(compCho==="paper"){
            gameStatus.text("Tie");
        } else if(compCho==="scissor"){
            gameStatus.text("You Lose");
            ccount++;
            compScoreText.text(ccount);
        } else{
            gameStatus.text("You Won");
            ucount++;
            playerScoreText.text(ucount);
        }
    }

    if(userCho==="scissor"){
        if(compCho==="scissor"){
            gameStatus.text("Tie");
        } else if(compCho==="rock"){
            gameStatus.text("You Lose");
            ccount++;
            compScoreText.text(ccount);
        } else{
            gameStatus.text("You Won");
            ucount++;
            playerScoreText.text(ucount);
        }
    }
    

}

