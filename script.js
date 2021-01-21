class Calculator{
    constructor(prevOperandText, currentOperandText){
        this.prevOperandText=prevOperandText;
        this.currentOperandText=currentOperandText;
        this.clear();
    }

    clear(){
        this.prevOperand="";
        this.currentOperand="";
        this.operation=undefined;
    }

    erase(){
        this.currentOperand = this.currentOperand.slice(0,-1);
    }

    compute(){
        let computed;
        if(!this.prevOperand || !this.currentOperand)return
        switch (this.operation){
            case "+":
                computed = parseFloat(this.prevOperand) + parseFloat(this.currentOperand);
                break;
            case "-":
                computed = parseFloat(this.prevOperand) - parseFloat(this.currentOperand);
                break;
            case "*":
                computed = parseFloat(this.prevOperand) * parseFloat(this.currentOperand);
                break;
            case "/":
                computed = parseFloat(this.prevOperand) / parseFloat(this.currentOperand);
                break;
        }
        this.currentOperand=computed;
        this.prevOperand="";

    }

    appendNumber(number){
        if(number==="." && this.currentOperand.indexOf(".")!==-1) return;
        this.currentOperand =this.currentOperand.toString()+number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand === "") return;
        if(this.prevOperand !==""){
            this.compute();
        }
        this.operation=operation;
        this.prevOperand=this.currentOperand.toString() + ` ${operation}`;
        this.currentOperand= "";
    }
    
    display(){
        this.currentOperandText.innerText=this.currentOperand;
        this.prevOperandText.innerText = this.prevOperand;
    }
}


const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const eraseButton =  document.querySelector("[data-erase]");
const clearButton = document.querySelector("[data-clear]");
const prevOperandText = document.querySelector("[data-prev-operand]");
const currentOperandText = document.querySelector("[data-current-operand]");

const calculator = new Calculator(prevOperandText, currentOperandText);

numberButtons.forEach(button=>{
    button.addEventListener("click", ()=>{
        calculator.appendNumber(button.innerHTML);
        calculator.display();
    })
})

operationButtons.forEach(button=>{
    button.addEventListener("click", ()=>{
        calculator.chooseOperation(button.innerHTML);
        calculator.display();
    })
})

equalsButton.addEventListener("click", ()=>{
    calculator.compute();
    calculator.display();
    calculator.currentOperand="";
})

clearButton.addEventListener("click", ()=>{
    calculator.clear();
    calculator.display();
})

eraseButton.addEventListener("click", ()=>{
    calculator.erase();
    calculator.display();
})