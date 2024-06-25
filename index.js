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
    for(const[symbol, count] of Object.entries(SYMBOL_COUNT)){ // adding all SYMBOL_COUNT (symbol and keys) to symbols array
        for(let i = 0; i < count; i++){
            symbols.push(symbol) // push method is used to insert an new element in an array
        }
    }
    const reel = []
    for (let i=0; i < COLS; i++){
        reel.push([])
        const reelSymbol = [...symbols]
        for(let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbol.length)
            const selectedSymbol = reelSymbol[randomIndex]
            reel[i].push(selectedSymbol)
            reelSymbol.splice(randomIndex, 1)
        }
    }
    return reel;
};
const transpose = (reels)=>{
    const rows = [];
    for (let i = 0; i < ROWS; i++){
        rows.push([]);
            for (let j = 0; j < COLS; j++){
                rows[i].push(reels[j][i])
            }
    }
    return rows
}

const getWinnings = (rows, bet, lines) =>{
    let winnings = 0;
    for(let row=0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;
        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false
                break
            }
        }
        if(allSame){
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
    }
    return winnings;
}

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i != row.length - 1) {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
};


const game  = () =>{
let balance = deposit();
    while(true){
        console.log(`you have the balance of ${balance} `)
        const lines = getNumOfLines();
        const getBet = bet(balance, lines);
        balance -= getBet * lines;
        const reels = spin();
        const rows= transpose(reels)
        // console.log(reels)
        // console.log(rows)
        printRows(rows);
        // console.log(`you have entered the amount of :${balance}$ on ${lines} lines in the wheel with the bet of ${getBet} each`)
        const winnings = getWinnings(rows, getBet, lines)
        balance += winnings
        console.log("you won, $" + winnings.toString())
            if (balance <= 0){
            console.log("you ran out of balance!!")
            return
        }
        const playAgain = prompt("do you want to play again? (y/n) ?")
        if  (playAgain != "y") break;
    }
}

game();