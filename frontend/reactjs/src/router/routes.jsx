import { Navigate } from "react-router-dom"
import MainLayout from "layouts/MainLayout"
import SearchPage from "pages/SearchPage"
import ArtistPage from "pages/ArtistPage"
import AlbumPage from "pages/AlbumPage"

const routes = [
    {
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/search" />
            },
            {
                path: "search",
                element: <SearchPage />
            },
            {
                path: "artist/:id",
                element: <ArtistPage />
            },
            {
                path: "album/:id",
                element: <AlbumPage />
            }
        ]
    }
]

export default routes