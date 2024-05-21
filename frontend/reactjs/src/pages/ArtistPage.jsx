import { AccessTime, ArrowBack } from "@mui/icons-material"
import {
    Box,
    Container,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from "@mui/material"
import secondsToTimeString from "lib/secondsToTimeString"
import { useEffect, useState } from "react"
import { useParams, Link as RouterLink } from "react-router-dom"
import { fetchDeezer } from "stores/deezer"

export default function ArtistPage() {
    const { id: artistId } = useParams()
    const [artist, setArtist] = useState({})

    useEffect(() => {
        document.title = "Artist"
        async function fetch() {
            const artistResult = await fetchDeezer({ resource: `artist/${artistId}` })
            setArtist(artistResult.data)
            document.title = `"${artistResult.data.name}" - Artist`

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
            <Container
                maxWidth="sm"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: 3
                }}
            >
                <Stack sx={{ width: "100%" }}>
                    <Box display="flex" sx={{ marginBottom: 2 }}>
                        <RouterLink to={-1} style={{ display: "flex", alignItems: "center" }}>
                            <IconButton edge="start">
                                <ArrowBack />
                            </IconButton>
                        </RouterLink>
                        <Typography variant="h2" sx={{ marginLeft: 1 }}>
                            <b>{artist.name}</b>
                        </Typography>
                    </Box>

                    <Box sx={{ position: "relative", marginX: 5 }}>
                        <Paper elevation={3} sx={{ width: "fit-content", borderRadius: "0.5em" }}>
                            <img
                                src={artist.picture_xl}
                                alt={artist.name}
                                style={{ width: "100%", display: "block", borderRadius: "0.5em" }}
                            />
                        </Paper>
                        <Box
                            sx={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: "50%",
                                backgroundImage:
                                    "linear-gradient(to top, rgba(0,0,0,1), transparent)",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-end",
                                padding: 2,
                                borderRadius: "0.5em"
                            }}
                        >
                            {/* TODO: Make these typographies be below each other when the screen width gets small enough */}
                            <Typography color="lightgray">{artist.nb_album} albums</Typography>
                            <Typography color="lightgray">{artist.nb_fan} fans</Typography>
                        </Box>
                    </Box>

                    <br />

                    <Typography variant="h5" gutterBottom>
                        <b>Top Tracks</b>
                    </Typography>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="body2" color="GrayText">
                                            #
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography variant="body2" color="GrayText">
                                            Album
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography variant="body2" color="GrayText">
                                            Title
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Box
                                            display="flex"
                                            alignItems="flex-end"
                                            justifyContent="center"
                                            height="100%"
                                        >
                                            <AccessTime
                                                sx={{ color: "GrayText" }}
                                                fontSize="small"
                                            />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {artist.top?.map((track, index) => {
                                    return (
                                        <TableRow key={track.id}>
                                            <TableCell>
                                                <Typography variant="body2" color="GrayText">
                                                    {index + 1}
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Tooltip title={track.album.title}>
                                                    <RouterLink to={`/album/${track.album.id}`}>
                                                        <img
                                                            src={track.album.cover_small}
                                                            alt={track.album.title}
                                                            style={{
                                                                width: "3em",
                                                                height: "3em",
                                                                borderRadius: "10%"
                                                            }}
                                                        />
                                                    </RouterLink>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>{track.title}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Box
                                                    display="flex"
                                                    alignItems="flex-end"
                                                    justifyContent="center"
                                                    height="100%"
                                                >
                                                    <Typography variant="body2" color="GrayText">
                                                        {secondsToTimeString(track.duration)}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <br />

                    <Typography variant="h5" gutterBottom>
                        <b>Albums</b>
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="body2" color="GrayText">
                                            Cover
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" color="GrayText">
                                            Album
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" color="GrayText">
                                            Release Date
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {artist.albums?.map((album) => {
                                    return (
                                        <TableRow key={album.id}>
                                            <TableCell>
                                                <RouterLink to={`/album/${album.id}`}>
                                                    <img
                                                        src={album.cover_medium}
                                                        style={{
                                                            width: "6em",
                                                            height: "6em",
                                                            borderRadius: "10%"
                                                        }}
                                                    />
                                                </RouterLink>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>{album.title}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" color="GrayText">
                                                    {album.release_date}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
            </Container>
        </>
    )
}
