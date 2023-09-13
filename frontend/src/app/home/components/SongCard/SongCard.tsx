import styled from "styled-components";
import appleMusic from "./apple-music.svg";
import deezer from "./deezer.svg";
import starFull from "./star-full.svg";
import spotify from "./spotify.svg";
import youtube from "./youtube.svg";

export type SongCardProps = {
  songCover: string;
  title: string;
  artistName: string;
  averageRating: number;
  genre: string;
  amountReview: number;
  releaseYear: number;
  spotifyLink: string;
  appleMusicLink: string;
  youtubeLink: string;
  deezerLink: string;
};

const CardWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: grid;
  align-items: end;
  gap: 16px;
  grid-template-columns: auto 1fr 1fr;
  padding: 16px;
  max-width: 1250px;
`;

const SongCover = styled.img`
  border-radius: 8px;
  width: 200px;
  height: 200px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 900;
  line-height: 1.5;
`;

const ArtistName = styled.div`
  font-weight: 400;
`;

const TextCenter = styled.div`
  text-align: center;
`;

const RatingStar = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 4px;
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

const Rating = styled.div`
  display: flex;

  & > * {
    flex: 1 0;
  }
`

const AverageRating = styled.div`
  font-weight: 400;
  font-size: 24px;

  & + & {
    border-left: 1px solid gray;
  }

  & > small {
    font-size: 12px;
  }
`;

const ButtonRate = styled.button`
  background-color: pink;
  border: 1px solid purple;
  border-radius: 4px;
  cursor: pointer;
  display: block;
  margin: 8px auto;
  padding: 8px 24px;
  font-size: 16px;
`

const AvailableLinks = styled.div`
  display: flex;
  column-gap: 16px;
  justify-content: center;
`;

const AvailableLink = styled.a`
  &:not([href]) {
    cursor: not-allowed;
    filter: grayscale(100%);
  }
`

const SongCard = (props: SongCardProps) => {
  const formatNumber = (number: number) => {
    if (number >= 1000) {
      return `${(number / 1000).toFixed(1)}k`;
    }
    return number.toString();
  };

  return (
    <CardWrapper>
      <SongCover src={props.songCover} alt="Song Cover" />

      <div>
        <Title>
          {props.title}
        </Title>
        <ArtistName>{props.artistName}</ArtistName>
        <Genre>{props.genre}</Genre>
        <ReleaseYear>{props.releaseYear}</ReleaseYear>
      </div>

      <TextCenter>
        <Rating>
          <AverageRating>
            <div>{props.amountReview}</div>
            <small>Avaliações</small>
          </AverageRating>

          <AverageRating>
            <div><RatingStar src={starFull} alt="Star" /> {props.averageRating.toFixed(1)} / 5</div>
            <small>Nota média</small>
          </AverageRating>
        </Rating>

        {/* <ButtonRate>
          Avalie esta música
        </ButtonRate> */}

        <AvailableLinks>
          <AvailableLink href={props.spotifyLink}>
            <img src={spotify} width={48} height={48} />
          </AvailableLink>

          <AvailableLink href={props.appleMusicLink}>
            <img src={appleMusic} width={48} height={48} />
          </AvailableLink>

          <AvailableLink href={props.deezerLink}>
            <img src={deezer} width={48} height={48} />
          </AvailableLink>

          <AvailableLink href={props.youtubeLink}>
            <img src={youtube} width={48} height={48} />
          </AvailableLink>
        </AvailableLinks>
      </TextCenter>
    </CardWrapper>
  );
};

export default SongCard;