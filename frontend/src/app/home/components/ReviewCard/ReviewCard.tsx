import styled from "styled-components";
import starEmpty from "./star-empty.svg";
import starFull from "./star-full.svg";
import starHalf from "./star-half.svg";

export type ReviewCardProps = {
  songCover: string;
  songTitle: string;
  artistName: string;
  rating: number;
  title: string;
  content: string;
  authorImage: string;
  authorName: string;
  authorUsername: string;
};

const CardWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 16px;
  row-gap: 16px;
  max-width: 600px;
`;

const SongHeader = styled.div`
  column-gap: 16px;
  display: flex;
`;

const SongCover = styled.img`
  border-radius: 8px;
`;

const SongTitle = styled.div`
  font-weight: 700;
  margin-bottom: 5px;
`;

const ArtistName = styled.div`
  margin-bottom: 5px;
`;

const ReviewTitle = styled.div`
  font-weight: 700;
`;

const AuthorImage = styled.img`
  border-radius: 50%;
`;

const AuthorName = styled.div`
  font-weight: 700;
`;

const AuthorInfo = styled.div`
  display: flex;
  column-gap: 8px;
`;

const AuthorUsername = styled.div`
  font-size: 11px;
`;

function* ratingStars(rating: number) {
  for (let i = 0; i < Math.floor(rating / 2); i++) {
    yield <img src={starFull} width={16} height={16} />;
  }

  if (rating % 2 === 1) {
    yield <img src={starHalf} width={16} height={16} />;
  }

  for (let i = 0; i < 5 - Math.ceil(rating / 2); i++) {
    yield <img src={starEmpty} width={16} height={16} />;
  }
}

export const ReviewCard = (props: ReviewCardProps) => {
  return (
    <CardWrapper>
      <SongHeader>
        <SongCover src={props.songCover} width={100} height={100} />

        <div>
          <SongTitle>{props.songTitle}</SongTitle>
          <ArtistName>{props.artistName}</ArtistName>
          <div>{[...ratingStars(props.rating)]}</div>
        </div>
      </SongHeader>

      <ReviewTitle>{props.title}</ReviewTitle>

      <div>{props.content}</div>

      <AuthorInfo>
        <AuthorImage src={props.authorImage} width={50} height={50} />

        <div>
          <AuthorName>{props.authorName}</AuthorName>
          <AuthorUsername>@{props.authorUsername}</AuthorUsername>
        </div>
      </AuthorInfo>
    </CardWrapper>
  );
};
