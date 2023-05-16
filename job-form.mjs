import * as pushNotification from "./pushNotification.mjs";
customElements.define("job-form", class extends HTMLElement {
    static get observedAttributes() { return ['name']; }
    constructor() {
        super();
    }
    connectedCallback() {
        pushNotification.init();
        let form = document.createElement("form");
        form.addEventListener("submit", this.submit);
        setTimeout(() => {
            let children = this.querySelectorAll("*");
            children.forEach(child => form.appendChild(child));
            this.appendChild(form);
        }, 1);
    };
    submit(/**@type Event*/event) {
        const message = [
            "1: Submit",
        ]
        pushNotification.push("submit", "submit1", message.join('\\n'))
        setTimeout(() => {
            pushNotification.push("submit2", "submit2", message.join('\\n'))
        }, 500);

        setTimeout(() => {
            pushNotification.push("submit3", "submit3", message.join('\\n'))
        }, 1000);
        event.preventDefault();
    }
})