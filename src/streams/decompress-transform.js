import Stream from "stream";


export class DecompressTransformStream extends Stream.Transform {
    #archiver

    constructor(archiver, opts){
        super(opts)
        this.#archiver = archiver;
    }

    _transform(chunk, encoding, callback) {
        const compressed = this.#archiver.decompress(chunk);

        this.push(compressed);
        callback();
    }
}