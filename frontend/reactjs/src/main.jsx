import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"

import MainLayout from "layouts/MainLayout"

// import App from "src/App.jsx"
import SearchPage from "pages/SearchPage"
import ArtistPage from "pages/ArtistPage"

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "search",
                element: <SearchPage />
            },
            {
                path: "artist/:id",
                element: <ArtistPage />
            }
        ]
    }    
])

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
