const prompt = require("prompt-sync")()

const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNT ={
    "A": 1,
    "B": 3,
    "C": 5,
    "D": 8,
}
const SYMBOL_VALUES ={
    "A": 5,
    "B": 3,
    "C": 2,
    "D": 1,
}










const deposit = () =>{
    while(true){
        const depositAmt = prompt("enter the value you want to depo: ")
        let a = parseFloat(depositAmt);
        if(isNaN(a)|| a<=0 ){
        console.log("invalid input! Amount ")
        }else{
         return a;
        }
    }
}

const getNumOfLines = () =>{
    while(true){
        const numOfLinesToBet = prompt("enter the number of lines that you want to bet on (1-3): ")
        let a = parseFloat(numOfLinesToBet);
        if(isNaN(a)|| a<=0 || a>3 ){
            console.log("invalid Num of lines!! ")
        }else{
            return a;
        }
    }
}
const bet = (balance,lines) =>{
    while(true){
        const betMoney = prompt("enter the number of the bets per lines: ")
        let betAmt = parseFloat(betMoney);
        if(isNaN(betAmt) || betAmt > (balance/lines) || betAmt <= 0 ){
            console.log("invalid Num of bets! try again ")
        }else{
            return betAmt;
        }
    }
}

const spin =()=>{
    const symbols = [];
}

let balance = deposit();
const lines = getNumOfLines();
const getBet = bet(balance, lines);
console.log(`you have entered the amount of :${balance}$ on ${lines} lines in the wheel with the bet of ${getBet}`)