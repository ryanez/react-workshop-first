#Third exercise

Now that we have a component with state, lets make it a more usable. We will add a property that will allow us to modify the frequency on which the counter will be updated.

This will tell our component that the default `frequency` will be `1` just in case that it's not specified.
```
  getDefaultProps: function() {
      return {
          frequency: 1
      };
  },
```

Now while incrementing the counter we must use the value in the frequency property `this.props.frequency`.
```
  tick: function() {
      this.setState({
          secondsElapsed: this.state.secondsElapsed + this.props.frequency
      });
  },
```

And also use that property value when creating the interval.
```
componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000 * this.props.frequency);
},
```

The whole file would read like this (note that we are using two instances of the same component):
```
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>React Workshop - Exercise 02 - Stateful component</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react.min.js"></script>
    <script type="text/javascript">
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
            this.setState({
                secondsElapsed: this.state.secondsElapsed + this.props.frequency
            });
        },
        componentDidMount: function() {
            this.interval = setInterval(this.tick, 1000 * this.props.frequency);
        },
        componentWillUnmount: function() {
            clearInterval(this.interval);
        },
        render: function() {
            return (
                React.createElement("div", null, "Seconds Elapsed: ", this.state.secondsElapsed)
            );
        }
    });


    function rockandroll() {
        var mountNode1 = document.getElementById('content-1'),
            mountNode2 = document.getElementById('content-2');

        React.render(React.createElement(Timer, { frequency: 2 }), mountNode1);
        React.render(React.createElement(Timer, { frequency: 5 }), mountNode2);
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
