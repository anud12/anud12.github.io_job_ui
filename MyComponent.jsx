const React = require("react");
module.exports = (props) => (
    <div>
        Child {props.name} demo
        <button onClick={() => console.log("click me")}>Click me</button>
    </div>)