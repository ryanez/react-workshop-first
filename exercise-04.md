# Using JSX

We will update the example we made on [exercise-03](exercise-03.md) to be written using **JSX** syntax instead of calling react's DOM api directly.

- Include JSXTransformer.js
- Replace api calls with `JSX`
- Deal with errors

After the `<script src="...react.min.js"></scripts>` add a reference to JSXTransformer
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/JSXTransformer.js"></script>
```

Modify the render function to use the **JSX** syntax
```
render: function() {
    return (
        <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
    );
}
```

And also we can rock differently
```
function rockandroll() {
    var mountNode1 = document.getElementById('content-1'),
        mountNode2 = document.getElementById('content-2');

    React.render(<Timer frequency="2" />, mountNode1);
    React.render(<Timer frequency="6" />, mountNode2);
}
```

Since our script is now using **JSX** syntax we need to modify the script tag to avoid browser trying to interpret it as Javascript
```
<script type="text/jsx">
```

# The problems!

Now that we are using **JSX** instead of calling the DOM api, the properties we send to the components will be interpreted as string values, because of the XML syntax. (not sure if there is a better way of doing this) We need to parse the `frequency` value to become a number.
```
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
```

The whole file will read like [this](exercise-04.html)
```
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>React Workshop - Exercise 02 - Stateful component</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/JSXTransformer.js"></script>
    <script type="text/jsx">
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
    </script>
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
