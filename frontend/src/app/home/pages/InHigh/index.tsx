import React from "react";
import { Wallpaper, MusicListContainer } from "./style";
import MusicCard from "../../../../shared/components/MusicCard";
import MusicImage from "../../../../shared/assets/Lover.png";

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
  return (
    <Wallpaper>
      <MusicListContainer>
        {fakeMusicList.map((music, index) => (
          <MusicCard
            key={index}
            artist={music.artist}
            name={music.name}
            image={music.image}
          />
        ))} 
      </MusicListContainer>
    </Wallpaper>
  );
};

export default InHigh;
