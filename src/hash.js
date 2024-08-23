import Crypto from "crypto";

export class Hash {
    #hash;
    #crypto = Crypto;


    createHash(algorithm) {
        if (this.#hash){
            throw new Error("Hash already exists")
        }
        this.#hash = this.#crypto.createHash(algorithm);

        return this;
    }

    appendHash(chunk) {
        if (!this.#hash){
            throw new Error("Hash doesn't exist")
        }

        this.#hash.update(chunk)
    }

    digestHash(type) {
        if (!this.#hash){
            throw new Error("Hash doesn't exist")
        }

        return this.#hash.digest(type);
    }
}