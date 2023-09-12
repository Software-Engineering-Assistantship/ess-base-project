import styled from "styled-components";
import starFull from "./star-full.svg";

export type SongCardProps = {
  songCover: string;
  title: string;
  artistName: string;
  mediumRating: number;
  genre: string;
  amountReview: number;
  releaseYear: number;
};

const CardWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  padding: 16px;
  row-gap: 16px;
`;

const SongCover = styled.img`
  border-radius: 8px;
  width: 200px;
  height: 200px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
`;

const Title = styled.div`
  font-weight: 700;
  display: flex;
  align-items: center;
  column-gap: 4px;
`;

const ArtistName = styled.div`
  font-weight: 400;
`;

const RatingStar = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 4px; /* Adicionando espaço entre a estrela e o número de avaliações */
`;

const Genre = styled.div`
  font-weight: 400;
  display: flex;
  align-items: center;
  column-gap: 4px;
`;

const ReleaseYear = styled.div`
  font-weight: 400;
  display: flex;
  align-items: center;
  column-gap: 4px;
`;

const MediumRating = styled.div`
  font-weight: 400;
  display: flex;
  align-items: center;
  column-gap: 3px; /* Aumenta o espaço entre o título e as avaliações */
  font-size: 16px; /* Aumenta o tamanho da fonte para as avaliações */
`;

export const SongCard = (props) => {
  const formatNumber = (number) => {
    if (number >= 1000) {
      return `${(number / 1000).toFixed(1)}k`;
    }
    return number.toString();
  };

  return (
    <CardWrapper>
      <SongCover src={props.songCover} alt="Song Cover" />
      <Details>
        <Title>
          {props.title}
        </Title>
        <MediumRating>
          {formatNumber(props.amountReview)} Reviews |
          <RatingStar src={starFull} alt="Star" /> {props.mediumRating.toFixed(1)}
        </MediumRating>
        <ArtistName>{props.artistName}</ArtistName>
        <Genre>{props.genre}</Genre>
        <ReleaseYear>{props.releaseYear}</ReleaseYear>
      </Details>
    </CardWrapper>
  );
};
