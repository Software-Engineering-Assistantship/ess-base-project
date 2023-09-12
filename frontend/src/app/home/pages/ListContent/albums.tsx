import React, { useEffect, useState } from "react";

const AlbumsContext = React.createContext({
    albums: [], fetchAlbums: () => {}
  })
  
export default function Albums() {
    const [todos, setAlbums] = useState([])
    
    const fetchAlbums = async () => {
        const response = await fetch("http://localhost:8000/albums")
        const albums = await response.json()
        setAlbums(albums.data)
    }

    useEffect(() => {
        fetchAlbums()
    }, [])

    return (
        <AlbumsContext.Provider value={{albums, fetchAlbums}}>
        {/* <Stack spacing={5}> */}
            {albums.map((album) => (
            <b>{album.item}</b>
            ))}
        {/* </Stack> */}
        </AlbumsContext.Provider>
    )
}