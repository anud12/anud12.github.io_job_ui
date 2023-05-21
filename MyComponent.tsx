const React = require("react");
export default (props) => {
    const [a, setA] = React.useState();

    React.useEffect(() => {
        setA("From inside")
    }, [])
    return (
        <div>
            Child {props.name} demo
            <button onClick={() => console.log("click me")}>Click me {a}</button>
        </div>)
}