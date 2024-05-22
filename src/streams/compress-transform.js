import Stream from "stream";


export class CompressTransformStream extends Stream.Transform {
    #archiver

    constructor(archiver, opts){
        super(opts)
        this.#archiver = archiver;
    }

    _transform(chunk, encoding, callback) {
        const compressed = this.#archiver.compress(chunk);

        this.push(compressed);
        callback();
    }
}