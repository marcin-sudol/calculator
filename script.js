var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var buttons = [{ type: "number", id: "zero", label: "0", gridArea: "5 / 1 / span 1 / span 2" }, { type: "number", id: "one", label: "1", gridArea: "4 / 1 / span 1 / span 1" }, { type: "number", id: "two", label: "2", gridArea: "4 / 2 / span 1 / span 1" }, { type: "number", id: "three", label: "3", gridArea: "4 / 3 / span 1 / span 1" }, { type: "number", id: "four", label: "4", gridArea: "3 / 1 / span 1 / span 1" }, { type: "number", id: "five", label: "5", gridArea: "3 / 2 / span 1 / span 1" }, { type: "number", id: "six", label: "6", gridArea: "3 / 3 / span 1 / span 1" }, { type: "number", id: "seven", label: "7", gridArea: "2 / 1 / span 1 / span 1" }, { type: "number", id: "eight", label: "8", gridArea: "2 / 2 / span 1 / span 1" }, { type: "number", id: "nine", label: "9", gridArea: "2 / 3 / span 1 / span 1" }, { type: "number", id: "decimal", label: ".", gridArea: "5 / 3 / span 1 / span 1" }, { type: "operator", id: "add", label: "+", gridArea: "3 / 4 / span 1 / span 1" }, { type: "operator", id: "subtract", label: "-", gridArea: "2 / 4 / span 1 / span 1" }, { type: "operator", id: "multiply", label: "*", gridArea: "1 / 4 / span 1 / span 1" }, { type: "operator", id: "divide", label: "/", gridArea: "1 / 3 / span 1 / span 1" }, { type: "operator", id: "equals", label: "=", gridArea: "4 / 4 / span 2 / span 1" }, { type: "interface", id: "clear", label: "AC", gridArea: "1 / 1 / span 1 / span 2" }];

// ----- DISPLAY COMPONENT -----
var Display = function Display(props) {
    return React.createElement(
        "p",
        { id: "display" },
        props.output
    );
};

// ----- BUTTON COMPONENT -----
var Button = function Button(props) {

    handleClick = function handleClick() {
        props.onClick(props.id);
    };

    return React.createElement(
        "button",
        {
            className: props.type,
            id: props.id,
            onClick: handleClick,
            style: { gridArea: props.gridArea }
        },
        props.label
    );
};

// ----- CALCULATOR - MAIN APP COMPONENT -----

var Calculator = function (_React$Component) {
    _inherits(Calculator, _React$Component);

    function Calculator(props) {
        _classCallCheck(this, Calculator);

        // ----- STATE FOR STATEFUL COMPONENT -----
        var _this = _possibleConstructorReturn(this, (Calculator.__proto__ || Object.getPrototypeOf(Calculator)).call(this, props));

        _this.state = {
            currentNum: "0",
            currentSign: "",
            previousNum: "",
            previousSign: "",
            operator: ""

        };

        // ----- BINDING METHODS -----
        _this.handleInput = _this.handleInput.bind(_this);
        _this.handleInputNumber = _this.handleInputNumber.bind(_this);
        _this.handleInputOperator = _this.handleInputOperator.bind(_this);
        _this.formatNum = _this.formatNum.bind(_this);
        return _this;
    }

    // ----- PROP TYPES -----


    _createClass(Calculator, [{
        key: "handleInputNumber",


        // HANDLE INPUT NUMBER
        value: function handleInputNumber(button) {
            var curr = this.state.currentNum;
            var currS = this.state.currentSign;
            var prev = this.state.previousNum;
            var prevS = this.state.previousSign;
            var oper = this.state.operator;

            // only previous number and no operator (as result from last calculation) 
            if (prev != '' && curr === '' && oper === '') {
                if (button.id === 'decimal') {
                    curr = '0.';
                } else {
                    curr = button.label;
                }
                currS = '';
                prev = '';
                prevS = '';
                // only previous number and operator
            } else if (prev != '' && curr === '' && oper != '') {
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
                if (curr.length < 9 || curr.length === 9 && curr.includes('.')) curr += button.label;
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

    }, {
        key: "handleInputOperator",
        value: function handleInputOperator(button) {

            var curr = this.state.currentNum;
            var currS = this.state.currentSign;
            var prev = this.state.previousNum;
            var prevS = this.state.previousSign;
            var oper = this.state.operator;

            // application is cleared
            if (prev === '' && curr === '0') {
                if (button.id === 'subtract') {
                    curr = '';
                    currS = '-';
                } else if (button.id === 'equals') {
                    // do nothing
                } else currS = '';
                // only sign for current number
            } else if (prev === '' && curr === '' && currS === '-') {
                if (button.id != 'subtract') {
                    curr = '0';
                    currS = '';
                }
                // only current number and no operator
            } else if (prev === '' && curr != '' && oper === '') {
                if (button.id != 'equals') {
                    prev = curr;
                    prevS = currS;
                    curr = '';
                    currS = '';
                    oper = button.label;
                }
                // only previous number and no operator (as result from last calculation) 
            } else if (prev != '' && curr === '' && oper === '') {
                if (button.id != 'equals') {
                    oper = button.label;
                }
                // previous number and operator
            } else if (prev != '' && curr === '' && oper != '') {
                if (button.id === 'subtract') {
                    // subtract
                    if (oper != '-') currS = '-';
                } else if (button.id === 'equals') {// equals
                    // do nothing
                } else {
                    // other
                    oper = button.label;
                    currS = '';
                }
                // two numbers
            } else if (prev != '' && curr != '' && oper != '') {
                var num1 = parseFloat(prevS + prev);
                var num2 = parseFloat(currS + curr);
                var num3 = 0;
                switch (oper) {
                    case '+':
                        num3 = num1 + num2;break;
                    case '-':
                        num3 = num1 - num2;break;
                    case '*':
                        num3 = num1 * num2;break;
                    case '/':
                        num3 = num1 / num2;break;
                }
                console.log(num1 + oper + num2 + '=' + num3);
                prev = Math.abs(num3).toString();
                if (num3 < 0) prevS = '-';else prevS = '';
                curr = '';
                currS = '';
                if (button.id === 'equals') oper = '';else oper = button.label;
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

    }, {
        key: "handleInput",
        value: function handleInput(id) {

            var button = this.props.buttons.find(function (button) {
                return button.id === id;
            });

            if (button.id === 'clear') this.setState({
                currentNum: "0",
                currentSign: "",
                previousNum: "",
                previousSign: "",
                operator: ""

            });else if (button.type === 'number') this.handleInputNumber(button);else if (button.type === 'operator') this.handleInputOperator(button);
        }

        // FORMAT NUMBER

    }, {
        key: "formatNum",
        value: function formatNum(str) {
            if (str === '') return str;else {
                newStr = parseFloat(str).toPrecision(9);
                if (newStr.includes('.')) newStr = newStr.replace(/\.?0+$/, '');
                return newStr;
            }
        }

        // ----- RENDER -----

    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var output = this.state.previousSign + this.formatNum(this.state.previousNum) + this.state.operator + this.state.currentSign + this.state.currentNum;

            return React.createElement(
                "div",
                { id: "calculator" },
                React.createElement(
                    "header",
                    { id: "header" },
                    "Calculator"
                ),
                React.createElement(Display, { output: output }),
                React.createElement(
                    "div",
                    { id: "keyboard" },
                    this.props.buttons.map(function (button) {
                        return React.createElement(Button, Object.assign({
                            key: button.id
                        }, button, {
                            onClick: _this2.handleInput
                        }));
                    })
                )
            );
        }
    }]);

    return Calculator;
}(React.Component);

Calculator.propTypes = {
    buttons: PropTypes.array.isRequired };
;

// ----- RENDER MAIN APP -----
ReactDOM.render(React.createElement(Calculator, { buttons: buttons }), document.getElementById('main-app'));