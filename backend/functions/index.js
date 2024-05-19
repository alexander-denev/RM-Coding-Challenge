// Define constants
const { onCall } = require("firebase-functions/v2/https")
// const { log } = require("firebase-functions/logger")
const axios = require("axios")

// Define functions
exports.helloWorld = onCall(() => {
    return "Hello from Firebase!"
})

exports.fetchDeezer = onCall(async (request) => {
    const { resource, params } = request.data
    const result = await axios({
        method: "get",
        baseURL: "https://api.deezer.com",
        url: resource,
        params
    })
    return result.data
})
