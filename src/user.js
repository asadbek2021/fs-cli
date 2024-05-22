

export class User {
    #name

    constructor(name) {
        if(!name) {
            throw new Error('Invalid input. Username was not provided')
        }

        this.#name = name;
    }

    greet() {
        return `Welcome to the File Manager, ${this.#name}!\n---------------------------- \n`;
    }

    bye() {
        return `\nThank you for using File Manager, ${this.#name}, goodbye!\n`;
    }
}