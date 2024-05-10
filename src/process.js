
export class Process {
    #process = process;

    constructor() {}

    argumentValue(key) {
        const fullkey = "--" + key + "=";
        const argmts = this.#parseArguments()
        const keyValue = argmts.find(argmt => !!argmt.match(fullkey));

        if(!keyValue ) {
            return;
        }

        const value = keyValue.replace(fullkey, "");

        return value;
    }

    print(input) {
        this.#process.stdout.write(input);
    }

    printCurrentDirectory() {
        this.print(`You are currently in ${this.#process.cwd()}`);
    }

    #parseArguments() {
        return this.#process.argv.reduce((args, current, index) => {
            if(index > 1) {
                args.push(current)
            }
            return args
        }, []);
    }

    listen(callback) {        
        this.#process.stdin.on("data", (input) => {
            callback(input)
        });
    }

    onExit(callback){
        this.#process.on("SIGINT", (s)=> {
            callback()
            this.#process.exit(0)
        })
    }
}