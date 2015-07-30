#JSX Offline

Run `npm install -g react-tools` to make it available globally.

- Create a `./ui` folder on the *root* directory.
- Create a [./ui/exercise-05.js](ui/exercise-05.js). This file will contain what we had in the `<script>` tag on [exercise-04.md](exercise-04)
- Create a [exercise-05.html](exercise-05.html). We will replace the inline script for an external reference `<script src="public/exercise-05.js">`

The `./ui/excercise.js` will contain what we had in the `<script>` tag.

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


function rockandroll() {
    var mountNode1 = document.getElementById('content-1'),
        mountNode2 = document.getElementById('content-2');

    React.render(<Timer frequency="2" />, mountNode1);
    React.render(<Timer frequency="6" />, mountNode2);
}
```

And the HTML file will read
```
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>React Workshop - Exercise 05 - Offline transform</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react.min.js"></script>
    <script type="text/javascript" src="public/exercise-05.js"></script>
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

# But it doesn't work!

Note that the script source points to `./public/exercise-05.js` instead of pointing to `./ui/exercise-05.js` where our source code is found. The reason is that our code in `./ui` folder contains **JSX** metadata, we need to transform it using the `react-tools` that we already installed at the very begining of this exercise.

Run `jsx /ui /public` on command line and see what happens, then go back to your browser and reload the page.

Every time you modify your source files in `/ui` directory you will need to run the `jsx` tool to parse your file.

# Watch for changes

If you want you can run the `jsx` tool in `--watch` mode, this way it will automatically translate your source files every time you update a file.

`jsx --watch /ui /public`
