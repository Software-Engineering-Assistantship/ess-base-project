import React from "react";
import { MusicContainer, MusicImg, MusicArtist, MusicName, MusicRating } from "./style";

const MusicCard: React.FC<{
  artist: string;
  name: string;
  image: string;
  avg_rating: number;
}> = ({ artist, name, image, avg_rating }) => {
  return (
    <MusicContainer>
      <MusicImg style={{ backgroundImage: `url(${image})`}} />
      <MusicName>{name}</MusicName>
      <MusicArtist>{artist}</MusicArtist>
      {avg_rating && <MusicRating>{avg_rating}</MusicRating>}
    </MusicContainer>
  );
};

export default MusicCard;
