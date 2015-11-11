const StarsFrame = React.createClass({
    render: function() {
        const numberOfStars = Math.floor(Math.random() * 9) + 1;
        
        const stars = [];
        for(let i = 0; i < numberOfStars; i++) {
            stars.push(
                <span className="glyphicon glyphicon-star"></span>
            );
        }
        
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
                <button className="btn btn-primary btn-lg">=</button>
            </div>
        );
    }
});

const AnswerFrame = React.createClass({
    render: function() {
        return (
            <div id="answer-frame">
                <div className="well">
                    ...
                </div>
            </div>
        );
    }
});

const NumbersFrame = React.createClass({
    render: function() {
        const numbers = [];
        
        for(let i = 1; i < 10; i++) {
            numbers.push(
                <div className="number">{i}</div>
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
    render: function() {
        return (
            <div id="game">
                <h2>Play Nine</h2>
                <hr />
                <div className="clearfix">
                    <StarsFrame />
                    <ButtonFrame />
                    <AnswerFrame />
                </div>
                <NumbersFrame />
            </div>
        );
    }
});

React.render(<Game />, document.getElementById('container'));