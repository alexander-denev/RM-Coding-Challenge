// Define constants
const { onCall } = require("firebase-functions/v2/https")
// const { log } = require("firebase-functions/logger")

const axiosDeezer = require("axios").create({
    baseURL: "https://api.deezer.com"
})
const deezer = {
    async search(query) {
        const result = (await axiosDeezer.get("search", { params: { q: query } })).data

        const filteredData = result.data.map((track) => ({
            id: track.id,
            title: track.title,
            duration: track.duration,
            album: {
                id: track.album.id,
                title: track.album.title,
                cover_small: track.album.cover_small,
                cover_medium: track.album.cover_medium,
                cover_big: track.album.cover_big,
                cover_xl: track.album.cover_xl
            },
            artist: {
                id: track.artist.id,
                name: track.artist.name
            }
        }))

        return { total: result.total, data: filteredData }
    },
    async artist(id) {
        const resultArtist = (await axiosDeezer.get(`artist/${id}`)).data
        const resultArtistTopTracks = (await axiosDeezer.get(`artist/${id}/top`)).data.data
        const resultArtistAlbums = (await axiosDeezer.get(`artist/${id}/albums`)).data.data

        const responseData = {
            id: resultArtist.id,
            name: resultArtist.name,
            picture_small: resultArtist.picture_small,
            picture_medium: resultArtist.picture_medium,
            picture_big: resultArtist.picture_big,
            picture_xl: resultArtist.picture_xl,
            nb_album: resultArtist.nb_album,
            nb_fan: resultArtist.nb_fan,
            top: resultArtistTopTracks,
            albums: resultArtistAlbums
        }

        return responseData
    }
}

// Define functions
exports.helloWorld = onCall(() => {
    return "Hello from Firebase!"
})

exports.search = onCall(async (request) => {
    const result = await deezer.search(request.data.query)
    return result
})

exports.artist = onCall(async (request) => {
    const result = await deezer.artist(request.data.id)
    return result
})
