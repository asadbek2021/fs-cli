class Commander {
    #process;
    #fileSystem;
    #operatingSystem

    constructor(ps, fs, os) {
        this.#process = ps
        this.#fileSystem = fs;
        this.#operatingSystem = os;

        this.#onStartHook()
    }

    #onStartHook() {
        this.#process.on("SIGINT", (s)=> {
            // process.stdout.write("\033c");
            process.stdout.write("Thank you for using File Manager, Username, goodbye!\n")
            process.exit(0)
        })
    }
}