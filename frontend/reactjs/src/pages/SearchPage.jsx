import { AccessTime, Search } from "@mui/icons-material"
import {
    Box,
    Container,
    IconButton,
    InputAdornment,
    Link,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography
} from "@mui/material"
import { useState, useCallback, useEffect } from "react"
import { useLocation, Link as RouterLink, useNavigate } from "react-router-dom"

import { fetchDeezer } from "stores/deezer"

import { v4 as uuid } from "uuid"
import secondsToTimeString from "lib/secondsToTimeString"

export default function SearchPage() {
    const location = useLocation()
    const urlSearchParams = new URLSearchParams(location.search)
    const urlSearchQuery = urlSearchParams.get("q")
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate()

    const [searchQuery, setSearchQuery] = useState(() => urlSearchQuery || "")

    const [searchResults, setSearchResults] = useState([])

    const fetchSearchResults = useCallback(async (query) => {
        if (!query) return

        const result = await fetchDeezer({ resource: "search", params: { q: query } })
        setSearchResults(result.data.data)
    }, [])

    function search(event) {
        if (event) event.preventDefault()
        navigate(`/search?q=${searchQuery}`)
    }

    useEffect(() => {
        if (urlSearchQuery) {
            fetchSearchResults(urlSearchQuery)
            document.title = `"${urlSearchQuery}" - Search`
        } else {
            document.title = "Search"
        }
    }, [fetchSearchResults, urlSearchQuery])

    return (
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
                <form onSubmit={search}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        spellCheck="false"
                        autoComplete="off"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" onClick={search}>
                                        <Search />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    ></TextField>
                </form>

                <br />

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {/* TODO: Залепи първата и втората колона една за друга, така че иконата на албума да е до заглавието на песента. */}
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
                                        <AccessTime sx={{ color: "GrayText" }} fontSize="small" />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {searchResults.length
                                ? searchResults.map((track, index) => {
                                      return (
                                          <TableRow key={uuid()}>
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
                                                  <Stack>
                                                      <Typography>{track.title}</Typography>
                                                      <Link
                                                          variant="caption"
                                                          underline="hover"
                                                          color={"GrayText"}
                                                          sx={{
                                                              ":hover": { cursor: "pointer" }
                                                          }}
                                                          href={`/artist/${track.artist.id}`}
                                                          onClick={(event) => {
                                                              event.preventDefault()
                                                              navigate(`/artist/${track.artist.id}`)
                                                          }}
                                                      >
                                                          {track.artist.name}
                                                      </Link>
                                                  </Stack>
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
                                  })
                                : null}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </Container>
    )
}
