# First exercise

We will use the ReactJS framework to create a simple stateless component that says hello

- Create a [HTML5 document](exercise-01.html)
- In the document's body be sure to have a container `<div id="content"></div>`
- Add a script reference to the [ReactJS framework](https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react.min.js) on [CDN](https://cdnjs.com/libraries/react/)
- Use the ReactJS framework to create a small component which displays a hello message.

The document shall look like this

```
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>React Workshop - Exercise 01 - Simple `say hello` component</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react.min.js"></script>
    <script type="text/javascript">
    var HelloMessage = React.createClass({
        displayName: "HelloMessage",
        render: function() {
            return React.createElement("div", null, "Hello ", this.props.name);
        }
    });

    function rockandroll() {
        React.render(React.createElement(HelloMessage, {
            name: "Kitty"
        }), document.getElementById('content'));
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
