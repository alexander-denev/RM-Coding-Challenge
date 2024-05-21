import { AccessTime, ArrowBack } from "@mui/icons-material"
import {
    Box,
    Container,
    IconButton,
    Link,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material"
import secondsToTimeString from "lib/secondsToTimeString"
import { useEffect, useState } from "react"
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom"
import { fetchDeezer } from "stores/deezer"

export default function AlbumPage() {
    const { id: albumId } = useParams()
    const [album, setAlbum] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Album"
        async function fetch() {
            const albumResult = await fetchDeezer({ resource: `album/${albumId}` })
            setAlbum(albumResult.data)
            document.title = `"${albumResult.data.title}" - Album`
        }
        fetch()
    }, [albumId])

    return (
        <>
            <Container
                maxWidth="md"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: 3
                }}
            >
                <Stack sx={{ width: "100%" }}>
                    <Box display="flex" marginBottom={2}>
                        <RouterLink to={-1}>
                            <IconButton edge="start">
                                <ArrowBack />
                            </IconButton>
                        </RouterLink>
                    </Box>

                    <Box display="flex">
                        <Box>
                            <Paper elevation={3} sx={{ borderRadius: "0.5em" }}>
                                <img
                                    src={album.cover_big}
                                    alt={album.title}
                                    style={{
                                        borderRadius: "0.5em",
                                        width: "100%",
                                        display: "block",
                                        minWidth: "10em",
                                        minHeight: "10em",
                                        maxWidth: "20em",
                                        maxHeight: "20em"
                                    }}
                                />
                            </Paper>
                        </Box>
                        <Stack marginLeft={2} width="auto" sx={{ width: "fit-content" }}>
                            <Typography variant="caption">Album</Typography>

                            <Typography variant={"h3"}>
                                <b>{album.title}</b>
                            </Typography>

                            <Box display="flex" marginBottom={1}>
                                <img
                                    src={album.artist?.picture_small}
                                    alt={album.artist?.name}
                                    style={{
                                        borderRadius: "50%",
                                        width: "2em",
                                        height: "2em",
                                        display: "block"
                                    }}
                                />

                                <Typography
                                    variant="subtitle2"
                                    color="GrayText"
                                    marginLeft={0.5}
                                    display="flex"
                                    alignItems="center"
                                >
                                    <Link
                                        underline="hover"
                                        color="GrayText"
                                        sx={{
                                            ":hover": { cursor: "pointer" }
                                        }}
                                        href={`/artist/${album.artist?.id}`}
                                        onClick={(event) => {
                                            event.preventDefault()
                                            navigate(`/artist/${album.artist?.id}`)
                                        }}
                                    >
                                        <b>{album.artist?.name}</b>
                                    </Link>
                                    , {album.release_date}
                                </Typography>
                            </Box>

                            <Box marginTop="auto">
                                <Typography variant="caption">{album.fans} fans</Typography>
                                <br />
                                <Typography variant="caption">{album.nb_tracks} tracks</Typography>
                            </Box>
                        </Stack>
                    </Box>

                    <br />

                    <Typography variant="h5" gutterBottom>
                        <b>Tracks</b>
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
                                {album.tracks?.data.map((track, index) => {
                                    return (
                                        <TableRow key={track.id}>
                                            <TableCell>
                                                <Typography variant="body2" color="GrayText">
                                                    {index + 1}
                                                </Typography>
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
                </Stack>
            </Container>
        </>
    )
}
