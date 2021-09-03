let runningResult = 0;
let screenVal = "0";
let equationVal = "0";
let resultVal = "0";
let previousOperator = null;

const screen = document.querySelector(".current-val");
const equation = document.querySelector(".equation");
const result = document.querySelector(".result");

function buttonClick(value) {
  if (isNaN(value)) {
    forSymbol(value); //this is not a number
  } else {
    forNumber(value); //this is a number
  }
  screen.innerText = screenVal;
}

function forNumber(numString) {
  if (screenVal === "0") {
    screenVal = numString;
  } else {
    screenVal += numString;
  }
}

function forSymbol(symbol) {
  if (symbol === "C") {
    screenVal = "0";
    runningResult = 0;
    equation.innerText = "0";
    result.innerText = "0";
    equationVal = "0";
    resultVal = "0";
  } else if (symbol === "=") {
      equationVal += screenVal;
      equation.innerText = equationVal;
    Calculation(parseInt(screenVal));
    previousOperator = null;
    screenVal = runningResult;
    runningResult = 0;
    resultVal = runningResult;
    result.innerText = resultVal;
  }else if( symbol === "←"){
       if(screenVal.length === 1){
           screenVal = "0";
       } else {
           screenVal = screenVal.substring(0, screenVal.length -1);
       }
  }
  else {
      handleMath(symbol);
  }
}

function handleMath(symbol){
  if (screenVal === "0") {
    return; //do nothing
  }
  const screenValInt = parseInt(screenVal);
  if (runningResult === 0) {
    runningResult = screenValInt;
  } else {
    Calculation(screenValInt);
  }
  previousOperator = symbol;
  handleEquation(screenVal,symbol);
  screenVal = "0";
}

function handleEquation(screenVal,symbol){
  if(equationVal === "0"){
    equationVal = screenVal + symbol;
  } else{equationVal += screenVal + symbol;}
  equation.innerText = equationVal;
}

function Calculation(value){
    switch(previousOperator)
    {   case "+" :   
        runningResult += value;
        break;
        case "-" : 
        runningResult -= value;
        break;
        case "×" : 
        runningResult *= value;
        break;
        case "÷" : 
        runningResult /= value;
        break;
    }
    resultVal = runningResult;
    result.innerText = resultVal;
}



function init() {
  document.querySelector(".calc-buttons").addEventListener("click", (e) => {
    buttonClick(e.target.innerText);
  });
}

init();
