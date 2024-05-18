// Define constants 
const { onCall, /*HttpsError*/ } = require("firebase-functions/v2/https")

const defaultFuncConfig = {
    enforceAppCheck: true
}

const axiosDeezer = require("axios").create({
    baseURL: "https://api.deezer.com"
})
const deezer = {
    async search(query) {
        return (await axiosDeezer.get("search", { query })).data
    },
    async getArtist(id) {
        return (await axiosDeezer.get(`artist/${id}`)).data
    }
}

// Define functions
exports.helloWorld = onCall(() => {
    return "Hello from Firebase!"
})

exports.search = onCall(defaultFuncConfig, async (request) => {
    const searchResult = await deezer.search(request.query)

    const filteredData = searchResult.data.map((track) => ({
        id: track.id,
        title: track.title,
        duration: track.duration
    }))

    return { ...searchResult, data: filteredData }
})

exports.artist = onCall(defaultFuncConfig, async (request) => {
    const result = await deezer.getArtist(request.query.id)

    // modify the result

    return result
})
