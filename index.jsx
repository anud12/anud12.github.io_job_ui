const React = require("react");
const MyComponent = require("./MyComponent");

module.exports = (
    <html>
        <body>
            <script src="./inline.js" />
            <div className="Hello world"></div>
            <MyComponent name="Hello world"></MyComponent>
        </body>
    </html>
)