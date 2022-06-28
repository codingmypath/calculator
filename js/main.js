
class Calculator  {
    constructor(previousOperand, currentOperandTextElement) {
        this.currentOperandTextElement = currentOperandTextElement
        this.previousOperand = previousOperand
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previous = ''
        this.operation = undefined
    }
    
    //appendNumber section is done!
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) {
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    pickOperation(operation) {
        this.operation = operation
        // if(this.operation === '+' && this.currentOperand.includes('+')) {
        //     return;
        // } else if(this.operation === '-' && this.currentOperand.includes('-')) {
        //     return;
        // }
        if(this.currentOperand == '') {
            return;
        }

        if (this.previousOperand != '') {
            this.compute()
        }
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let total;
        const previous = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(previous) || isNaN(current)) {
            return;
        }
        console.log(previous)
        console.log(this.operation)
        console.log(current)
        switch (this.operation) {
            case '+': 
                total = previous + current;
                break
            case '−':
                total = previous - current;
                break
            case '×': 
                total = previous * current;
                break
            case '÷':
                total = previous / current;
                break
            default: 
                return;
        }
        this.currentOperand = total
        this.operation = undefined
        this.previousOperand = ''
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        console.log(this.operation)
        if (this.operation) {
            this.currentOperandTextElement.innerText = `${this.previousOperand} ${this.operation} ${this.currentOperand}`
            console.log(this.currentOperandTextElement.innerText)
        } else {
            return;
        }
    }
}

const numbers = document.querySelectorAll('[data-number]')
const operations = document.querySelectorAll('[data-operation]')
const equals = document.querySelector('[data-equals]')
const allClear = document.querySelector('[data-all-clear]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const previousOperand = ''
                                                

const calculator = new Calculator(previousOperand, currentOperandTextElement)

numbers.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operations.forEach(button => {
    button.addEventListener('click', () => {
        calculator.pickOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equals.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

allClear.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})