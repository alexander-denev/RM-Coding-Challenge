import { httpsCallable } from "firebase/functions"
import { functions } from "boot/firebase"

export default {
    async search(query) {
        const search = httpsCallable(functions, "search")
        const response = await search({ query })
        return response.data
    },
    async artist(id) {
        const artist = httpsCallable(functions, "artist")
        const response = await artist({ id })
        return response.data
    }
}
