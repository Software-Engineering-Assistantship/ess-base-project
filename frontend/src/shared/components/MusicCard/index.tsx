import React from "react";
import { MusicContainer, MusicImg, MusicArtist, MusicName } from "./style";

const MusicCard: React.FC<{
  artist: string;
  name: string;
  image: string;
}> = ({ artist, name, image }) => {
  return (
    <MusicContainer>
      <MusicImg style={{ backgroundImage: `url(${image})`}} />
      <MusicName>{name}</MusicName>
      <MusicArtist>{artist}</MusicArtist>
    </MusicContainer>
  );
};

export default MusicCard;
