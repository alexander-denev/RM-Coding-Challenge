import { useParams } from "react-router-dom"

export default function ArtistPage() {
    const { id: artistId } = useParams()
    return (
        <>
            <h1>Artist Page</h1>
            <p>Artist id: {artistId}</p>
        </>
    )
}
