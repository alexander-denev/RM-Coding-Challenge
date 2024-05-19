import { useState, useEffect } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { fetchDeezer } from "stores/deezer"
import { v4 as uuid } from "uuid"

export default function SearchPage() {
    const location = useLocation()
    const urlSearchParams = new URLSearchParams(location.search)
    const urlSearchQuery = urlSearchParams.get("q")

    const [searchQuery, setSearchQuery] = useState(urlSearchQuery || "")
    const [searchResults, setSearchResults] = useState([])

    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()
        navigate(`/search?q=${searchQuery}`)
    }

    useEffect(() => {
        async function fetchSearchResults() {
            const result = await fetchDeezer({ resource: "search", params: { q: urlSearchQuery } })
            setSearchResults(result.data.data)
        }
        if (urlSearchQuery) {
            fetchSearchResults()
        }
    }, [urlSearchQuery])

    return (
        <>
            <h1>Search</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                ></input>
            </form>

            <br />

            <table>
                <thead>
                    <tr>
                        <th>Album</th>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Duration</th>
                    </tr>
                </thead>

                <tbody>
                    {searchResults.map((track) => {
                        return (
                            <tr key={uuid()}>
                                <td>
                                    <img
                                        src={track.album.cover_small}
                                        title={track.album.title}
                                        alt={track.album.title}
                                        style={{ width: "40px", height: "40px" }}
                                    />
                                </td>
                                <td>{track.title}</td>
                                <td>
                                    <Link to={`/artist/${track.artist.id}`}>
                                        {track.artist.name}
                                    </Link>
                                </td>
                                <td>{track.duration}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}
