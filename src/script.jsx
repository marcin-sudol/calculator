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
            output: ""
        };

        // ----- BINDING METHODS -----
        this.handleInput = this.handleInput.bind(this);
    }

    // ----- PROP TYPES -----
    static propTypes = {
        buttons: PropTypes.array.isRequired
    }

    // ----- METHODS -----
    handleInput(id) {
        // ----- SET STATE -----
        this.setState({ output: id });
    }

    // ----- RENDER -----
    render() {
        return (
            <div id="calculator">
                <header id="header">Calculator</header>
                <Display output={this.state.output} />
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

