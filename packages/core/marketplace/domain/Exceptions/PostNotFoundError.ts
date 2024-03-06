export default class PostNotFoundError extends Error {
    constructor() {
        super(`La publicacion no fue encontrada.`)
    }
}