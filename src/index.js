import { Messenger } from "./console.js";
import { FileSystem } from "./fs.js";
import { OperatingSystem } from "./os.js";
import { Process } from "./process.js";
import { Commander } from "./commander.js";
import { User } from "./user.js";

const newProcess = new Process()

const username = newProcess.argumentValue("username");

if(!username) {
    throw new Error('Invalid input. Username was not provided')
}
const user = new User(
    username
)
const messenger = new Messenger(
    newProcess,
    user
)

newProcess.onExit(() => messenger.finish());
newProcess.listen((data) => {
    messenger.greetWithUsername()
    console.log(data)
    messenger.afterEachMessage()
});

new Commander(
    new Messenger(
        newProcess,
        user
    ),
    new FileSystem(),
    new OperatingSystem(),
)

messenger.greetWithUsername()