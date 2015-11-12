function possibleCombinationSum(arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize)
    for (var i = 1; i < combinationsCount ; i++ ) {
        var combinationSum = 0;
        for (var j=0 ; j < listSize ; j++) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
        }
        if (n === combinationSum) { return true; }
    }
    return false;
};

const StarsFrame = React.createClass({
    render: function() {
        const stars = new Array(this.props.numberOfStars + 1).join('_').split('').map(el =>
            <span className="glyphicon glyphicon-star"></span>
        );
        
        return (
            <div id="stars-frame">
                <div className="well">
                    {stars}
                </div>
            </div>
        );
    }
});

const ButtonFrame = React.createClass({
    render: function() {
        let button;       
        switch(this.props.correct) {
            case true:
                button = (
                    <button className="btn btn-success btn-lg" onClick={this.props.acceptAnswer}>
                        <span className="glyphicon glyphicon-ok"></span>
                    </button>
                );
                break;
            case false:
                button = (
                    <button className="btn btn-danger btn-lg">
                        <span className="glyphicon glyphicon-remove"></span>
                    </button>
                );
                break;
            default:
                const disabled = (!this.props.selectedNumbers.length);
                button = (
                    <button className="btn btn-primary btn-lg" disabled={disabled}
                            onClick={this.props.checkAnswer}>
                        =
                    </button>
                );
                break;
            }
            
            return (
                <div id="button-frame">
                    {button}
                    <br /><br />
                    <button className="btn btn-warning btn-xs" onClick={this.props.redraw} disabled={this.props.redraws === 0}>
                        <span className="glyphicon glyphicon-refresh">&nbsp;{this.props.redraws}</span>
                    </button>
                </div>
            );
    }
});

const AnswerFrame = React.createClass({
    render: function() {
        const selectedNumbers = this.props.selectedNumbers.map(el => 
            <span onClick={() => this.props.unselectNumber(el)}>
                {el}
            </span>
        );
        
        return (
            <div id="answer-frame">
                <div className="well">
                    {selectedNumbers}
                </div>
            </div>
        );
    }
});

const NumbersFrame = React.createClass({
    render: function() {
        const numbers = [],
              selectedNumbers = this.props.selectedNumbers,
              selectNumber = this.props.selectNumber,
              usedNumbers = this.props.usedNumbers;
        let className;
        
        for(let i = 1; i < 10; i++) {
            className = `number selected-${!!~selectedNumbers.indexOf(i)} used-${!!~usedNumbers.indexOf(i)}`;
            numbers.push(
                <div className={className} onClick={() => {selectNumber(i)}}>{i}</div>
            );
        }
    
        return (
            <div id="numbers-frame">
                <div className="well">
                    {numbers}
                </div>
            </div>
        );
    }
});

const DoneFrame = React.createClass({
    render: function() {
        return (
            <div className="well text-center">
                <h2>{this.props.doneStatus}</h2>
            </div>
        );
    }
});

const Game = React.createClass({
    getInitialState: function() { 
    return {
            selectedNumbers: [],
            usedNumbers: [],
            numberOfStars: this.getRandom1to9(),
            redraws: 5,
            correct: null,
            doneStatus: null
        };
    },
    getRandom1to9: () => Math.floor(Math.random() * 9) + 1,
    selectNumber: function(clickedNumber) {
        if(~this.state.selectedNumbers.concat(this.state.usedNumbers).indexOf(clickedNumber)) return;
    
        this.setState(
            {
                selectedNumbers: this.state.selectedNumbers.concat(clickedNumber),
                correct: null
            }
        )
    },
    unselectNumber: function(clickedNumber) {
        const selectedNumbers = this.state.selectedNumbers,
              clickedNumberIndex = selectedNumbers.indexOf(clickedNumber);
              
        selectedNumbers.splice(clickedNumberIndex, 1);
        
        this.setState(
            {
                selectedNumbers: selectedNumbers,
                correct: null
            });
    },
    checkAnswer: function() {
        const correct = this.state.numberOfStars === this.state.selectedNumbers.reduce((aggr, el) => aggr + el, 0);
        
        this.setState({correct: correct});
    },
    acceptAnswer: function() {
        const usedNumbers = this.state.selectedNumbers.concat(this.state.usedNumbers);
        this.setState({
            selectedNumbers: [],
            usedNumbers: usedNumbers,
            correct: null,
            numberOfStars: this.getRandom1to9()
        }, function() {
            this.updateDoneStatus();
        });
    },
    redraw: function() {
        if(!this.state.redraws) return;
        this.setState({
            numberOfStars: this.getRandom1to9(),
            correct: null,
            selectedNumbers: [],
            redraws: this.state.redraws - 1
        }, function() {
            this.updateDoneStatus();
        });
    },
    possibleSolution: function() {
        const numberOfStars = this.state.numberOfStars,
              possibleNumbers = [],
              usedNumbers = this.state.usedNumbers;
              
        for (let i = 1; i <= 9; i++) {
            if (usedNumbers.indexOf(i) < 0) {
                possibleNumbers.push(i);
            }
        }
        
        return possibleCombinationSum(possibleNumbers, numberOfStars);
    },
    updateDoneStatus: function() {
        if(this.state.usedNumbers.length === 9) {
            this.setState({ doneStatus: 'Done. Nice!' });
            return
        }
        if (this.state.redraws === 0 && !this.possibleSolution()) {
            this.setState({doneStatus: 'Game Over!'});
        }
    },
    render: function() {
        const bottomFrame = this.state.doneStatus
            ? <DoneFrame doneStatus={this.state.doneStatus} />
            : <NumbersFrame selectedNumbers={this.state.selectedNumbers}
                              usedNumbers={this.state.usedNumbers}
                              selectNumber={this.selectNumber}/>
        return (
            <div id="game">
                <h2>Play Nine</h2>
                <hr />
                <div className="clearfix">
                    <StarsFrame numberOfStars={this.state.numberOfStars} />
                    <ButtonFrame selectedNumbers={this.state.selectedNumbers}
                                 correct={this.state.correct}
                                 checkAnswer={this.checkAnswer}
                                 acceptAnswer={this.acceptAnswer}
                                 redraw={this.redraw}
                                 redraws={this.state.redraws} />
                    <AnswerFrame selectedNumbers={this.state.selectedNumbers}
                                 unselectNumber={this.unselectNumber} />
                </div>
                {bottomFrame}
            </div>
        );
    }
});

React.render(<Game />, document.getElementById('container'));