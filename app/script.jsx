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
        return (
            <div id="button-frame">
                <button className="btn btn-primary btn-lg" disabled={!this.props.selectedNumbers.length}>=</button>
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
              selectNumber = this.props.selectNumber;
        let className;
        
        for(let i = 1; i < 10; i++) {
            className = `number selected-${!!~selectedNumbers.indexOf(i)}`;
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

const Game = React.createClass({
    getInitialState: () => ({
        selectedNumbers: [],
        numberOfStars: Math.floor(Math.random() * 9) + 1
    }),
    selectNumber: function(clickedNumber) {
        if(~this.state.selectedNumbers.indexOf(clickedNumber)) return;
    
        this.setState(
            {selectedNumbers: this.state.selectedNumbers.concat(clickedNumber)}
        )
    },
    unselectNumber: function(clickedNumber) {
        const selectedNumbers = this.state.selectedNumbers,
              clickedNumberIndex = selectedNumbers.indexOf(clickedNumber);
              
        selectedNumbers.splice(clickedNumberIndex, 1);
        
        this.setState({selectedNumbers: selectedNumbers});
    },
    render: function() {
        return (
            <div id="game">
                <h2>Play Nine</h2>
                <hr />
                <div className="clearfix">
                    <StarsFrame numberOfStars={this.state.numberOfStars} />
                    <ButtonFrame selectedNumbers={this.state.selectedNumbers} />
                    <AnswerFrame selectedNumbers={this.state.selectedNumbers}
                                 unselectNumber={this.unselectNumber} />
                </div>
                <NumbersFrame selectedNumbers={this.state.selectedNumbers} 
                              selectNumber={this.selectNumber}/>
            </div>
        );
    }
});

React.render(<Game />, document.getElementById('container'));