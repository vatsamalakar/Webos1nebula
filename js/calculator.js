/* ===========================================================
   NebulaOS X
   calculator.js
=========================================================== */


let calcValue = "0";
let calcResetNext = false;


function getCalcDisplay(){
    return document.getElementById("calcDisplay");
}


function updateCalcDisplay(){

    let display = getCalcDisplay();

    if(!display)
    return;

    display.value = calcValue;

}


function clearCalculator(){

    calcValue = "0";
    calcResetNext = false;
    updateCalcDisplay();

}


function calculatorBackspace(){

    if(calcResetNext){
        clearCalculator();
        return;
    }

    calcValue = calcValue.slice(0, -1);

    if(!calcValue){
        calcValue = "0";
    }

    updateCalcDisplay();

}


function pressCalculator(token){

    const operators = ["+", "-", "*", "/", "%"];

    if(calcResetNext && !operators.includes(token)){
        calcValue = "0";
        calcResetNext = false;
    }

    if(token === "." && /\.\d*$/.test(calcValue.split(/[\+\-\*\/\%]/).pop())){
        return;
    }

    if(operators.includes(token)){

        if(operators.includes(calcValue.slice(-1))){
            calcValue = calcValue.slice(0, -1) + token;
        } else if(calcValue !== "0" || token === "-"){
            calcValue += token;
        }

        calcResetNext = false;
        updateCalcDisplay();
        return;

    }

    if(calcValue === "0" && token !== "."){
        calcValue = token;
    } else {
        calcValue += token;
    }

    updateCalcDisplay();

}


function calculateResult(){

    try {

        let expression = calcValue
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/−/g, "-");

        if(/[^0-9+\-*/%.() ]/.test(expression)){
            calcValue = "Error";
            calcResetNext = true;
            updateCalcDisplay();
            return;
        }

        // eslint-disable-next-line no-new-func
        let result = Function(`"use strict"; return (${expression})`)();

        if(!isFinite(result)){
            calcValue = "Error";
        } else {
            calcValue = String(
                Math.round(result * 1e10) / 1e10
            );
        }

    } catch (error){

        calcValue = "Error";

    }

    calcResetNext = true;
    updateCalcDisplay();

}


window.addEventListener("load", updateCalcDisplay);
