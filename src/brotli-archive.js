import Zlib from "zlib"

export class BrotliCompress {
    #archiver = Zlib;

    compress(input) {
        return this.#archiver.brotliCompressSync(input)
    }

    decompress(input) {
        return this.#archiver.brotliDecompressSync(input)
    }
}