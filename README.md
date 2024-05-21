# RM Coding Challenge

Deezer is an internet-based music streaming service. You are required to implement a
React/Node App to explore its database. Your Node server should wrap the Deezer
API(https://api.deezer.com)

1. Users should be able to search for tracks. For every track found, show the artist and the
    duration of the track. On bigger screens with more available space, also include the
    name of the album.
2. Clicking/tapping the artists must allow users to see basic information about them, like its
    total number of fans. Also show its top 5 tracks along with a list of all their albums. For
    every album include the year in which it was released

Be sure to follow best practices and to demonstrate the skills you’ve learnt to develop a modern
web app. Keep in mind that our team intends to add more features to your code and that they
expect this to be quick and easy for them to do.

Deploy your app online (preferably with Firebase), so it can be tested live online

IMPORTANT
Most browsers enforce the same-origin restriction which may prevent HTTP calls to the Deezer
API. To circumvent this problem and to enable CORS(Cross-origin resource sharing) in your
app, simply forward requests through a public CORS proxy that adds the
Access-Control-Allow-Originheader to anyOPTIONSpreflight response.
For example when using thehttps://cors-anywhere.herokuapp.com/proxy, then a call intended
tohttps://api.deezer.com/search?q=eminemmust becomea call to
https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=eminemin your code.
