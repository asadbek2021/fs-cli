export class Console {
    // #red = '\\x1b[31m';
    // #green = '\\x1b[32m';
    // #reset = '\\x1b[0m';

    #process;
    #username;

    constructor(ps, username) {
        this.#process = ps;
        this.#username = username;
    }

    greetWithUsername() {
        this.#process.stdout(`Welcome to the File Manager, ${this.#username}!\n`)
    }

    invalidInput() {
        this.#process.stdout("Invalid input\n");
    }

    finish() {
        this.#process.stdout(`Thank you for using File Manager, ${this.#username}, goodbye!\n`)
    }

    clear() {
        this.#process.stdout.write("\033c");
    }
}