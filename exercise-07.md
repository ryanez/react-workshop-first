# The build tools

Now that we can break down the components into different files we will face the problem that as we create new components we will need to add a new `<script>` tag to include and make them available to our code. Maintain that model is kind of painful, and there is where [Browserify](http://browserify.org/) covers our back (because it's not allowed to say: save our asses)

- Install the Browserify tool `npm install -g browserify`

# Write node.js style modules

Browserify allows us to write node.js style modules and `require` them in the web, so lets get started.

- To avoid names collision we will create a new javascript file [timerModule.js](ui/timerModule.js) and we will write it as if it's a node.js module, using the `module.exports` to expose the *component*.
```
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
- Now we can `require` the component in our [exercise-07.js](ui/exercise-07.js)
```
var Timer = require('./timerModule');

module.exports = function () {
    var mountNode1 = document.getElementById('content-1'),
        mountNode2 = document.getElementById('content-2');

    React.render(<Timer frequency="4" />, mountNode1);
    React.render(<Timer frequency="6" />, mountNode2);
};
```
- Our [Html](exercise-07.html) will only need the `public/exercise-07.js` file.
```
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>React Workshop - Exercise 07 - Biuild Tools</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react.min.js"></script>
    <script type="text/javascript" src="public/exercise-07.js"></script>
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
- Now run the `jsx /ui /public` command and feel disappointed when the [example-07.html](exercise-07.html) crashes.

# Running the Browserify tool

On command line run `browserify ui/exercise-07.js public/exercise-07.js` and please don't cry, you will see some *parsin errors*. This is because **browserify** doesn't know the **JSX** syntax and is complaining about it.

# Reactify

We will use [Reactify](https://github.com/andreypopp/reactify) as a transform tool for **Browserify** to allow transform **JSX** on the fly on our build process.

- On command line run `npm install reactify --save-dev`
- In order to bundle our file we will need primarily
  - The transformation option `-t reactify`
  - The entry point `ui/exercise-07.js`
  - The output file `-o public/exercise-07.js`
  - Expose our main function as standalone `-s rockandroll`
- On command line run `browserify -t reactify ui/exercise-07.js -o public/exercise-07.js -s rockandroll`

