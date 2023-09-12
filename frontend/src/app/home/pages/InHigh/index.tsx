import React, { useEffect } from "react";
import { Wallpaper, MusicListContainer } from "./style";
import MusicCard from "../../../../shared/components/MusicCard";
import MusicImage from "../../../../shared/assets/Lover.png";
import axios from "axios";

const fakeMusicList = [
  { artist: "Artista 1", name: "Música 1", image: MusicImage },
  { artist: "Artista 2", name: "Música 2", image: MusicImage },
  { artist: "Artista 3", name: "Música 3", image: MusicImage },
  { artist: "Artista 4", name: "Música 4", image: MusicImage },
  { artist: "Artista 5", name: "Música 5", image: MusicImage },
  { artist: "Artista 6", name: "Música 6", image: MusicImage },
  { artist: "Artista 7", name: "Música 7", image: MusicImage },
  { artist: "Artista 8", name: "Música 8", image: MusicImage },
  { artist: "Artista 9", name: "Música 9", image: MusicImage },
  { artist: "Artista 10", name: "Música 10", image: MusicImage },
];

const InHigh: React.FC = () => {
  interface SearchResult {
    id: number;
    title: string;
    artist: string;
    available_on: object;
    image_url: string;
    popularity: number;
    release_year: number;
  }
  interface ReponseTrue {
    albums: SearchResult[];
    songs: SearchResult[];
  }
  interface ResultReponse {
    data: ReponseTrue[];
  }
  interface SearchFilterProps {
    onSearch: (query: string) => void;
    onFilter: () => void;
    searchQuery: string;
  }
  const handleResponse = (response: ResultReponse) => {
    const aux = [];
    response.songs.forEach((song) => {
      song.image_url = 'https://upload.wikimedia.org/wikipedia/pt/3/3c/Capa_de_Lover.png'

      aux.push(song);
    }
    );
    console.log('---------------');

    console.log(aux);
    console.log('---------------');
    setTrueMusicList(aux);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/songs/songs_h/highlighted', {
      });
      
      const data: SearchResult[] = response.data;
      console.log('---------------');

      console.log(data);
      console.log('---------------');
      handleResponse(response.data);
      // setSearchResults(data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };
  const [trueMusicList, setTrueMusicList] = React.useState<SearchResult[]>([]);
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Wallpaper>
      <MusicListContainer>
        {trueMusicList.map((music, index) => (
          <MusicCard
            key={index}
            artist={music.artist}
            name={music.title}
            image={music.image_url}
          />
        ))} 
      </MusicListContainer>
    </Wallpaper>
  );
};

export default InHigh;
