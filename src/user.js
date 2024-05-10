

export class User {
    #name

    constructor(name) {
        this.#name = name;
    }

    greet() {
        return `Welcome to the File Manager, ${this.#name}!\n`;
    }

    bye() {
        return `Thank you for using File Manager, ${this.#name}, goodbye!\n`;
    }

}