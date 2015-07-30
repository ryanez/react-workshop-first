# Including the React Framework in the bundle

Now the we know how to bundle our files and write them like if there were node.js modules we will probably want to take rid of the external reference to the React framework hosted in the CDN.

# Install the react as npm pacakge

On command line run `npm install react --save-dev`

# Include react in the Brosersify build process

If we remove the `<script src="..react.js">` from the HTML we will lose the global `React` variable and then our scripts will crash (time to cry again). To avoid problems and tears we will `require('react')` wherever it's needed.

To avoid file names collisions we will call our timer component containing file [timerModule08.js](ui/timerModule08.js)
```
var React = require('react');

module.exports = React.createClass({
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

Your first tought probably will be "I don't see any reference to the `React` framework there", well you need to see beyond your keyboard, remember that **Reactify** will transform the **JSX** and will add direct calls to the **React**'s DOM api.

The [excercise-08.js](ui/exercise-08.js) will look like
```
var React = require('react'),
    Timer = require('./timerModule08');

module.exports = function () {
    var mountNode1 = document.getElementById('content-1'),
        mountNode2 = document.getElementById('content-2');

    React.render(<Timer frequency="4" />, mountNode1);
    React.render(<Timer frequency="6" />, mountNode2);
};
```

And our [Html](exercise-08.html) will not require any more the CDN reference.
```
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>React Workshop - Exercise 08 - Include React in the bundle file</title>
    <script type="text/javascript" src="public/exercise-08.js"></script>
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

# The build command

Now we need a new build command? The answer would be **NO** but, we added some new files, so basically the command is the same but using the files for exercise 08.

`browserify -t reactify ui/exercise-08.js -o public/exercise-08.js -s rockandroll`

**Browserfy** will do its magic and will include the **React** framework in the bundle file.
