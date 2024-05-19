import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchDeezer } from "stores/deezer"

export default function ArtistPage() {
    const { id: artistId } = useParams()

    const [artist, setArtist] = useState({})

    useEffect(() => {
        async function fetch() {
            const artistResult = await fetchDeezer({ resource: `artist/${artistId}` })
            setArtist(artistResult.data)

            const artistAlbumsResult = await fetchDeezer({ resource: `artist/${artistId}/albums` })
            setArtist((artist) => ({
                ...artist,
                albums: artistAlbumsResult.data.data
            }))

            const artistTopResult = await fetchDeezer({ resource: `artist/${artistId}/top` })
            setArtist((artist) => ({
                ...artist,
                top: artistTopResult.data.data
            }))
        }
        fetch()
    }, [artistId])

    return (
        <>
            <Link to="/search">Go back to Search</Link>

            <h1>Artist - {artist.name}</h1>
            <img
                src={artist.picture_big}
                alt={artist.name}
                style={{ width: "300px", height: "300px" }}
            />
            <p>{artist.nb_album} albums</p>
            <p>{artist.nb_fan} fans</p>

            <br />

            <h2>Top Tracks</h2>
            <table>
                <thead>
                    <tr>
                        <th>Album</th>
                        <th>Title</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {artist.top?.map((track) => {
                        return (
                            <tr key={track.id}>
                                <td>
                                    <Link to={`/album/${track.album.id}`}>
                                        <img
                                            src={track.album.cover_small}
                                            title={track.album.title}
                                            alt={track.album.title}
                                            style={{ width: "40px", height: "40px" }}
                                        />
                                    </Link>
                                </td>
                                <td>{track.title}</td>
                                <td>{track.duration}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <br />

            <h2>Albums</h2>
            <table>
                <thead>
                    <tr>
                        <th>Cover</th>
                        <th>Album</th>
                        <th>Release Date</th>
                    </tr>
                </thead>
                <tbody>
                    {artist.albums?.map((album) => {
                        return (
                            <tr key={album.id}>
                                <td>
                                    <Link to={`/album/${album.id}`}>
                                        <img
                                            src={album.cover_medium}
                                            style={{ width: "64px", height: "64px" }}
                                        />
                                    </Link>
                                </td>
                                <td>{album.title}</td>
                                <td>{album.release_date}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}
