# Second exercise

React components have properties & state, they are two different things, properties are provided by an external source and the state is managed internally. Now that we know how to write a ReactJS component we will add some behavior and state to it.

You can/should use the [First exercise](exercise.html) source code as baseline.

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
        tick: function() {
            this.setState({
                secondsElapsed: this.state.secondsElapsed + 1
            });
        },
        componentDidMount: function() {
            this.interval = setInterval(this.tick, 1000);
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
        var mountNode = document.getElementById('content');
        React.render(React.createElement(Timer, null), mountNode);
    }
    </script>
</head>

<body onload="rockandroll()">
    <h1>React workshop</h1>
    <div id="content">
        Content of the document......
    </div>
</body>

</html>
```

# Lets break the code down

This is this component initial state, this value is set for each instance of this component
```
  getInitialState: function() {
      return {
          secondsElapsed: 0
      };
  },
```

This instance method updates the component state which produces a new rendering
```
  tick: function() {
      this.setState({
          secondsElapsed: this.state.secondsElapsed + 1
      });
    },
```

These two guys are [life cycle](http://facebook.github.io/react/docs/component-specs.html#lifecycle-methods) methods that will be called by the React framework
```
  componentDidMount: function() {
      this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function() {
      clearInterval(this.interval);
    },
```
