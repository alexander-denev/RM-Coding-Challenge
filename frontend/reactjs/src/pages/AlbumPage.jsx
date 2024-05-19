import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchDeezer } from "stores/deezer"

export default function AlbumPage() {
    const { id: albumId } = useParams()

    const [album, setAlbum] = useState({})

    useEffect(() => {
        async function fetch() {
            const albumResult = await fetchDeezer({ resource: `album/${albumId}` })
            setAlbum(albumResult.data)
        }
        fetch()
    }, [albumId])

    return (
        <>
            <Link to="/search">Go back to Search</Link>
        
            <h1>Album - {album.title}</h1>
            <img
                src={album.cover_big}
                alt={album.title}
                style={{ width: "300px", height: "300px" }}
            />
            <p>Released {album.release_date}</p>
            <p>{album.nb_tracks} tracks</p>
            <p>{album.fans} fans</p>

            <h2>Artist - {album.artist?.name}</h2>
            <Link to={`/artist/${album.artist?.id}`}>
            <img src={album.artist?.picture_medium} style={{ width: "64px", height: "64px" }} />
            </Link>

            <h2>Tracks</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {album.tracks?.data.map((track) => {
                        return (
                            <tr key={track.id}>
                                <td>{track.title}</td>
                                <td>{track.duration}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}
