# Reusable components

We can isolate our components in JS files that we can include in different pages and reuse them among our application.

- Create a `./ui/timer.js` to write our reusable component there.
```
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
```
- Create a `./ui/exercise-06.js` which only will contain the specific page initialization scripts in other words, will use the `timer` component.
```
function rockandroll() {
    var mountNode1 = document.getElementById('content-1'),
        mountNode2 = document.getElementById('content-2');

    React.render(<Timer frequency="4" />, mountNode1);
    React.render(<Timer frequency="6" />, mountNode2);
}
```
- Run the build tool `jsx /ui /public`
- In the (exercise-06.html)[exercise-06.html] you will need to add a reference to both scripts, the `timer` and the `exercise-06.js` which contains the page specific logic.
```
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>React Workshop - Exercise 05 - Offline transform</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react.min.js"></script>
    <script type="text/javascript" src="public/timer.js"></script>
    <script type="text/javascript" src="public/exercise-06.js"></script>
</head>

<body onload="rockandroll()">
    <h1>React workshop</h1>
    <div id="content-1">
        Content of the document......
    </div>
    <div id="content-2">
        Content of the document......
    </div>
</body>

</html>
```
