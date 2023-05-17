import { init, push } from "./notifications.mjs";

let style = document.createElement("style");
style.innerHTML = ``

customElements.define("job-form", class extends HTMLElement {
    static get observedAttributes() { return ['name']; }
    submitButton = document.createElement("button");

    constructor() {
        super();
    }
    connectedCallback() {
        document.querySelector("head").appendChild(style);

        this.submitButton.textContent = "Submit";
        setTimeout(() => {
            this.appendChild(this.submitButton);

        })
    };
    inputTo(/**@type HTMLInputElement */ element) {

    }
    submit(/**@type Event*/event) {
        event.preventDefault();
        console.log("submit");
    }
})