export class Commander {
    #messenger;
    #fileSystem;
    #operatingSystem;
    #user;

    constructor(messenger, fs, os) {
        this.#messenger = messenger;
        this.#fileSystem = fs;
        this.#operatingSystem = os;
    }

    parseCommand() {
        
    }

}
