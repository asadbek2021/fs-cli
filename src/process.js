
export class Process {
    #process = ps;

    constructor(ps) {
        this.#process = ps;
        
        this.#addHooks()
    }

    listen() {
        this.#process.stdin.on("data", (input) => {

        });
    }

    username() {
        const variables = this.parseArguments();
        const usernameWithKey = variables[0];

        if(usernameWithKey.match('--username=')) {
            return usernameWithKey.replace('');
        }
    }

    parseArguments() {
        return this.#process.argv.reduce((args, current, index) => {
            if(index > 1) {
                args.push(current)
            } 
        }, [])
    }

    printCurrentDirectory() {
        this.#process.stdout(`You are currently in ${this.#process.cwd()}`) 
    }

    #addHooks() {
        this.#process.on("SIGINT", (s)=> {
            this.#ps.stdout.write("\033c");
            this.#ps.write("Thank you for using File Manager, Username, goodbye!\n")
            this.#ps.exit(0)
        })
    }
}