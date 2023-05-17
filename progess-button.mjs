import { init, push } from "./notifications.mjs";

customElements.define("progess-button", class extends HTMLElement {
    static get observedAttributes() { return ['name']; }
    constructor() {
        super();
    }
    connectedCallback() {
        init();
        const shadowRoot = this.attachShadow({ mode: "open" });
    };
})