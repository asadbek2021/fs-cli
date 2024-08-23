export class Messenger {
    #process;
    #user;

    constructor(ps, user) {
        this.#process = ps;
        this.#user = user;
    }

    greetWithUsername() {
        this.#process.print(this.#user.greet())
    }

    invalidInput() {
        this.#process.print("Invalid input\n");
    }

    finish() {
        this.#process.print(this.#user.bye())
    }

    afterEachMessage() {
        this.#process.printCurrentDirectory()
    }
}