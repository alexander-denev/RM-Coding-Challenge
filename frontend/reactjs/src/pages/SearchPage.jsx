import { useState, useEffect } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"
import deezer from "stores/deezer"
import { v4 as uuid } from "uuid"

export default function SearchPage() {
    const location = useLocation()
    const urlSearchParams = new URLSearchParams(location.search)
    const urlSearchQuery = urlSearchParams.get("q")

    const [searchQuery, setSearchQuery] = useState(urlSearchQuery)
    const [searchResults, setSearchResults] = useState([])

    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()
        navigate(`/search?q=${searchQuery}`)
    }

    useEffect(() => {
        async function fetchSearchResults() {
            const result = await deezer.search(urlSearchQuery)
            setSearchResults(result.data)
        }
        fetchSearchResults()
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
                    {searchResults.map((result) => {
                        return (
                            <tr key={uuid()}>
                                <td>
                                    <img
                                        src={result.album.cover_small}
                                        title={result.album.title}
                                        alt={result.album.title}
                                        style={{ width: "32px", height: "32px" }}
                                    />
                                </td>
                                <td>{result.title}</td>
                                <td>
                                    <Link to={`/artist/${result.artist.id}`}>
                                        {result.artist.name}
                                    </Link>
                                </td>
                                <td>{result.duration}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}
