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
    { type: "operator", id: "multiply", label: "X", gridArea: "1 / 4 / span 1 / span 1" },
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
            previousNum: "",
            operator: "",
            negative: ""
        };

        // ----- BINDING METHODS -----
        this.handleInput = this.handleInput.bind(this);
    }

    // ----- PROP TYPES -----
    static propTypes = {
        buttons: PropTypes.array.isRequired
    }

    // ----- HANDLE INPUT -----
    handleInput(id) {

        let curr = this.state.currentNum;
        let prev = this.state.previousNum;
        let oper = this.state.operator;
        let neg = this.state.negative;

        let button = this.props.buttons.find(button => (button.id === id));

        // INPUT CLEAR
        if (button.id === 'clear') {
            curr = '0';
            prev = '';
            oper = '';
            // INPUT NUMBER
        } else if (button.type === 'number') {
            // DECIMAL
            if (button.id === 'decimal') {
                if (!curr.includes(button.label)) {
                    curr += button.label;
                }
                // REPLACE LEADING ZERO
            } else if (curr === '0') {
                curr = button.label;
            } else {
                curr += button.label;
            }
            //INPUT OPERATOR
        } else if (button.type === 'operator') {
            if ((prev != '') && (curr != '')) { // there are two numbers
                let num1 = parseFloat(prev);
                let num2 = parseFloat(curr);
                console.log(num1, oper, num2);
                let num3 = 0;
                switch (oper) {
                    case '+': num3 = num1 + num2; break;
                    case '-': num3 = num1 - num2; break;
                    case 'X': num3 = num1 * num2; break;
                    case '/': num3 = num1 / num2; break;
                }
                console.log(num3);
                if (button.id === 'equals') { // only perform calculation
                    curr = num3.toString();
                    prev = '';
                    oper = '';
                } else { // perform calculation and add operator
                    curr = '';
                    prev = num3.toString();
                    oper = button.label;
                }

            } else if ((prev === '') && (curr != '')) {// there is only current number
                prev = curr;
                curr = '';
                if (button.id != 'equals') // if other than equal update operator
                    oper = button.label;
            } else if ((prev != '') && (curr === '')) {// there is only previous number
                if (button.id != 'equals') // if other than equal update operator
                    oper = button.label;
            }
        }

        this.setState({
            currentNum: curr,
            previousNum: prev,
            operator: oper,
            negative: neg
        })

        // ----- SET STATE -----
        // this.setState({ output: input.id });
    }

    // ----- RENDER -----
    render() {
        const output = this.state.previousNum + this.state.operator + this.state.negative + this.state.currentNum;

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

