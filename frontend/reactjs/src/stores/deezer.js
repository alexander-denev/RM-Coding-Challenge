import { httpsCallable } from "firebase/functions"
import { functions } from "boot/firebase"

export const fetchDeezer = httpsCallable(functions, "fetchDeezer")