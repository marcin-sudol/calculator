const buttons = [
    { type: "number", id: "zero", label: "0", gridArea: "5 / 1 / span 1 / span 2" },
    { type: "number", id: "one", label: "1", gridArea: "4 / 1 / span 1 / span 1" },
    { type: "number", id: "two", label: "2", gridArea: "4 / 2 / span 1 / span 1" },
    { type: "number", id: "three", label: "3", gridArea: "4 / 3 / span 1 / span 1" },
    { type: "number", id: "four", label: "4", gridArea: "3 / 1 / span 1 / span 1" },
    { type: "number", id: "five", label: "5", gridArea: "3 / 2 / span 1 / span 1" },
    { type: "number", id: "six", label: "6", gridArea: "3 / 3 / span 1 / span 1" },
    { type: "number", id: "seven", label: "7", gridArea: "2 / 1 / span 1 / span 1" },
    { type: "number", id: "eight", label: "8", gridArea: "2 / 2 / span 1 / span 1" },
    { type: "number", id: "nine", label: "9", gridArea: "2 / 3 / span 1 / span 1" },
    { type: "number", id: "decimal", label: ".", gridArea: "5 / 3 / span 1 / span 1" },
    { type: "operator", id: "add", label: "+", gridArea: "3 / 4 / span 1 / span 1" },
    { type: "operator", id: "subtract", label: "-", gridArea: "2 / 4 / span 1 / span 1" },
    { type: "operator", id: "multiply", label: "*", gridArea: "1 / 4 / span 1 / span 1" },
    { type: "operator", id: "divide", label: "/", gridArea: "1 / 3 / span 1 / span 1" },
    { type: "operator", id: "equals", label: "=", gridArea: "4 / 4 / span 2 / span 1" },
    { type: "interface", id: "clear", label: "AC", gridArea: "1 / 1 / span 1 / span 2" }
];





// ----- DISPLAY COMPONENT -----
const Display = (props) => {
    return (
        <p id="display">
            {props.output}
        </p>
    );
};





// ----- BUTTON COMPONENT -----
const Button = (props) => {

    handleClick = () => {
        props.onClick(props.id);
    }

    return (
        <button
            className={props.type}
            id={props.id}
            onClick={handleClick}
            style={{ gridArea: props.gridArea }}
        >
            {props.label}
        </button>
    );
};





// ----- CALCULATOR - MAIN APP COMPONENT -----
class Calculator extends React.Component {
    constructor(props) {
        super(props);

        // ----- STATE FOR STATEFUL COMPONENT -----
        this.state = {
            currentNum: "0",
            currentSign: "",
            previousNum: "",
            previousSign: "",
            operator: ""


        };

        // ----- BINDING METHODS -----
        this.handleInput = this.handleInput.bind(this);
        this.handleInputNumber = this.handleInputNumber.bind(this);
        this.handleInputOperator = this.handleInputOperator.bind(this);
        this.formatNum = this.formatNum.bind(this);
    }

    // ----- PROP TYPES -----
    static propTypes = {
        buttons: PropTypes.array.isRequired
    }

    // HANDLE INPUT NUMBER
    handleInputNumber(button) {
        let curr = this.state.currentNum;
        let currS = this.state.currentSign;
        let prev = this.state.previousNum;
        let prevS = this.state.previousSign;
        let oper = this.state.operator;

        // only previous number and no operator (as result from last calculation) 
        if ((prev != '') && (curr === '') && (oper === '')) {
            if (button.id === 'decimal') {
                curr = '0.';
            } else {
                curr = button.label;
            }
            currS = '';
            prev = '';
            prevS = '';
            // only previous number and operator
        } else if ((prev != '') && (curr === '') && (oper != '')) {
            if (button.id === 'decimal') {
                curr = '0.';
            } else {
                curr = button.label;
            }
            // add decimal
        } else if (button.id === 'decimal') {
            if (!curr.includes(button.label)) {
                curr += button.label;
            }
            // add digit - max 9 digits
        } else if (curr === '0') {
            curr = button.label;
        } else {
            if ((curr.length < 9) || ((curr.length === 9) && (curr.includes('.'))))
                curr += button.label;
        }

        this.setState({
            currentNum: curr,
            currentSign: currS,
            previousNum: prev,
            previousSign: prevS,
            operator: oper
        });
    }

    // HANDLE INPUT OPERATOR
    handleInputOperator(button) {

        let curr = this.state.currentNum;
        let currS = this.state.currentSign;
        let prev = this.state.previousNum;
        let prevS = this.state.previousSign;
        let oper = this.state.operator;

        // application is cleared
        if ((prev === '') && (curr === '0')) {
            if (button.id === 'subtract') {
                curr = '';
                currS = '-';
            } else if (button.id === 'equals') {
                // do nothing
            } else
                currS = '';
            // only sign for current number
        } else if ((prev === '') && (curr === '') && (currS === '-')) {
            if (button.id != 'subtract') {
                curr = '0';
                currS = '';
            }
            // only current number and no operator
        } else if ((prev === '') && (curr != '') && (oper === '')) {
            if (button.id != 'equals') {
                prev = curr;
                prevS = currS;
                curr = '';
                currS = '';
                oper = button.label;
            }
            // only previous number and no operator (as result from last calculation) 
        } else if ((prev != '') && (curr === '') && (oper === '')) {
            if (button.id != 'equals') {
                oper = button.label;
            }
            // previous number and operator
        } else if ((prev != '') && (curr === '') && (oper != '')) {
            if (button.id === 'subtract') { // subtract
                if (oper != '-')
                    currS = '-';
            } else if (button.id === 'equals') { // equals
                // do nothing
            } else { // other
                oper = button.label;
                currS = '';
            }
            // two numbers
        } else if ((prev != '') && (curr != '') && (oper != '')) {
            let num1 = parseFloat(prevS + prev);
            let num2 = parseFloat(currS + curr);
            let num3 = 0;
            switch (oper) {
                case '+': num3 = num1 + num2; break;
                case '-': num3 = num1 - num2; break;
                case '*': num3 = num1 * num2; break;
                case '/': num3 = num1 / num2; break;
            }
            console.log(num1 + oper + num2 + '=' + num3);
            prev = Math.abs(num3).toString();
            if (num3 < 0)
                prevS = '-';
            else
                prevS = '';
            curr = '';
            currS = '';
            if (button.id === 'equals')
                oper = '';
            else
                oper = button.label;
        }

        this.setState({
            currentNum: curr,
            currentSign: currS,
            previousNum: prev,
            previousSign: prevS,
            operator: oper
        });
    }

    // ----- HANDLE INPUT -----
    handleInput(id) {

        let button = this.props.buttons.find(button => (button.id === id));

        if (button.id === 'clear')
            this.setState({
                currentNum: "0",
                currentSign: "",
                previousNum: "",
                previousSign: "",
                operator: ""

            });
        else if (button.type === 'number')
            this.handleInputNumber(button);
        else if (button.type === 'operator')
            this.handleInputOperator(button);
    }

    // FORMAT NUMBER
    formatNum(str) {
        if (str === '')
            return str;
        else {
            let newStr = parseFloat(str).toPrecision(9);
            if (newStr.includes('.'))
                newStr = newStr.replace(/\.?0+$/, '');
            return newStr;
        }
    }

    // ----- RENDER -----
    render() {
        const output = this.state.previousSign
            + this.formatNum(this.state.previousNum)
            + this.state.operator
            + this.state.currentSign
            + this.state.currentNum;

        return (
            <div id="calculator">
                <header id="header">Calculator</header>
                <Display output={output} />
                <div id="keyboard">
                    {this.props.buttons.map(button => (
                        <Button
                            key={button.id}
                            {...button}
                            onClick={this.handleInput}
                        />
                    ))}
                </div>
            </div>
        );
    }
};





// ----- RENDER MAIN APP -----
ReactDOM.render(
    <Calculator buttons={buttons} />,
    document.getElementById('main-app')
);

