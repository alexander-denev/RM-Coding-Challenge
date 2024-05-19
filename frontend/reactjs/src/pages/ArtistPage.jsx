import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import deezer from "stores/deezer"

export default function ArtistPage() {
    const { id: artistId } = useParams()

    const [artist, setArtist] = useState({})
    
    useEffect(() => {
        async function fetchArtist() {
            const result = await deezer.artist(artistId)
            setArtist(result)
        }
        fetchArtist()
    }, [artistId])

    return (
        <>
            <h1>Artist</h1>
            <img src={artist.picture_medium} alt={artist.name} />
            <h2>{artist.name}</h2>
            <p>{artist.nb_album} albums</p>
            <p>{artist.nb_fan} fans</p>
        </>
    )
}
