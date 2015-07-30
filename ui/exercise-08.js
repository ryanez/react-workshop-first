
var React = require('react'),
    Timer = require('./timerModule08');

module.exports = function () {
    var mountNode1 = document.getElementById('content-1'),
        mountNode2 = document.getElementById('content-2');

    React.render(<Timer frequency="4" />, mountNode1);
    React.render(<Timer frequency="6" />, mountNode2);
};