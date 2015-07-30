var Timer = React.createClass({
    displayName: "Timer",
    getInitialState: function() {
        return {
            secondsElapsed: 0
        };
    },
    getDefaultProps: function() {
        return {
            frequency: 1
        };
    },
    tick: function() {
        var freq = parseInt(this.props.frequency);
        this.setState({
            secondsElapsed: this.state.secondsElapsed + freq
        });
    },
    componentDidMount: function() {
        var freq = parseInt(this.props.frequency);
        this.interval = setInterval(this.tick, 1000 * freq);
    },
    componentWillUnmount: function() {
        clearInterval(this.interval);
    },
    render: function() {
        return (
            <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
        );
    }
});
