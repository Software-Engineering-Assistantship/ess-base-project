import React, { useEffect } from 'react';
import { Wallpaper } from './style';
import styled from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import axios from 'axios';
interface Review {
  id: number;
  artist_name: string;
  album_name: string;
  review_title: string;
  review_content: string;
  rating: number;
  author_name: string;
  author_username: string;
  author_image_uri: string;
  album_image_uri: string;
}
export const TableDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 60vw;
  flex-direction: column;
  gap: 12%;
  margin: auto;
  margin-top: 1%;
`;
const Home: React.FC = () => {
  const [data, setData] = React.useState([]);

  const fetchData = async () => {

    try {
        const response = await axios.get('http://127.0.0.1:8000/reviews/', {
        });
        
        const data = response.data.reviews;
        console.log('---------------');
        console.log(data);
        console.log('---------------');
        setData(data);
      // setSearchResults(data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Wallpaper>
      <TableDiv>  
        {data.map((review: Review) => (
          <ReviewCard
            songCover={review.album_image_uri}
            songTitle={review.album_name}
            artistName={review.artist_name}
            rating={review.rating}
            title={review.review_title}
            content={review.description}
            authorName='ana'
            authorUsername='ana2'
          />
        ))}

      </TableDiv>
    </Wallpaper>
  );
};

export default Home;