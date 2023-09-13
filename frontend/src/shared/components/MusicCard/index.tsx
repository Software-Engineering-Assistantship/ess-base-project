import React, {useState} from "react";
import { MusicContainer, MusicImg, MusicArtist, MusicName, MusicRating } from "./style";
import MusicDetail from "../../../app/home/components/modalDetails";

const MusicCard: React.FC<{
  artist: string;
  name: string;
  image: string;
  avg_rating: number;
  id: string;
}> = ({ artist, name, image, avg_rating, id }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MusicContainer>
      <MusicImg style={{ backgroundImage: `url(${image})`}} onClick={() => setIsOpen(true)} />
      <MusicName>{name}</MusicName>
      <MusicArtist>{artist}</MusicArtist>
      {avg_rating && <MusicRating>{avg_rating}</MusicRating>}
      <MusicDetail isOpen={isOpen} setIsOpen={setIsOpen} id={id} averageRating={avg_rating}/>
    </MusicContainer>
  );
};

export default MusicCard;
