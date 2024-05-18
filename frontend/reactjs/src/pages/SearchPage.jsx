import { useParams } from "react-router-dom"

export default function SearchPage() {
    const { q: searchQuery } = useParams()

    return (
        <div>
            <h1>Search Page</h1>
            <p>{searchQuery}</p>
        </div>
    )
}
