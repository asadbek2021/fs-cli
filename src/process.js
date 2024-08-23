
export class Process {
    #process = process;

    constructor() {}

    argumentValue(key) {
        const fullkey = "--" + key + "=";
        const argmts = this.#parseArguments()
        const keyValue = argmts.find(argmt => !!argmt.match(fullkey));

        if(!keyValue) {
            return;
        }

        return keyValue.replace(fullkey, "");
    }

    print(input) {
        if(typeof input != "string") {
            this.#process.stdout.write(JSON.stringify(input) + "\n");
            
            return this;
        }

        this.#process.stdout.write(input + "\n");

        return this;
    }

    currentDirectory() {
        return this.#process.cwd();
    }

    printCurrentDirectory() {
        this.print(`You are currently in ${this.currentDirectory()} \n---------------------------- \n`);

        return this;
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

         return this;
    }

    changeWorkingDirectory(path) {
        this.#process.chdir(path)
    }

    #parseArguments() {
        return this.#process.argv.reduce((args, current, index) => {
            if(index > 1) {
                args.push(current)
            }
            return args
        }, []);
    }
}