import React, { useState, useEffect } from 'react';
import RegisterInput from '../Input';
import ModalComponent from '../Modal-ui';
import axios from 'axios';
import MusicCard from '../../../../shared/components/MusicCard';
import ReviewCard from '../ReviewCard/ReviewCard';
import { Interface } from 'readline';
import SongCard from '../../../../../src/app/home/components/SongCard/SongCard';

interface MusicData {
    id: string;
    title: string;
    genre: string;
    artist: string;
    release_year: number;
    popularity: number;
    available_on: {
        youtube_link: string;
        deezer_link: string;
        spotify_link: string;
    };
    created_at: string;
    image_url: string;
}
interface Review {  // added this for clarity
    id: number;
    rating: number;
    comment: string;
    created_at: string;
    user: string;
}
const MusicDetail: React.FC<{
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    id: string;
    averageRating: number;
  }> = ({ isOpen, setIsOpen, id, averageRating }) => {
    const [data, setData] = useState<MusicData | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {

        try {
            const response = await axios.get('http://127.0.0.1:8000/songs/' + id + '/');
            const response2 = await axios.get('http://127.0.0.1:8000/songs/' + id + '/reviews');
            if(id == '65009d89de657d24ae7f1357') {
                console.log("-----------------")
                console.log(response.data);
                console.log(response2.data);
                console.log("-----------------")


            }
            let data = response.data;
            const aux = {
                youtube_link: '',
                deezer_link: '',
                spotify_link: '',
                apple_music_link: '',
            }

            // data.available_on = aux;

            setData(response.data);
            setReviews(response2.data.reviews);
        } catch (error) {
            console.error("Error posting music data:", error);
        }
    };

    return (
        <div>
            <ModalComponent
                open={isOpen}
                setOpen={() => {setIsOpen(false)}}
                title="Detalhes da música"
                textExit=""
                textSubmit=""
                onClick={(e) => handleSubmit(e)}
                onCancel={() => {setIsOpen(false)}}
                isBold={false}
                disabledSubmit={false}
                children={
                    data ? (
                        <>
                            <SongCard
                                id={data.id}
                                title={data.title}
                                artistName={data.artist}
                                songCover={data.image_url}
                                genre={data.genre}
                                releaseYear={data.release_year}
                                averageRating={averageRating}
                                amountReview={reviews.length}
                                spotifyLink={data.available_on.spotify_link}
                                appleMusicLink={data.available_on.apple_music_link}
                                deezerLink={data.available_on.deezer_link}
                                youtubeLink={data.available_on.youtube_link}
                            />
                        {reviews.length > 0 ? (
                            reviews.map((review: Review) => (
                                <ReviewCard
                                    key={review.id}
                                    id={review.id}
                                    rating={review.rating}
                                    comment={review.comment}
                                    createdAt={review.created_at}
                                    user={review.user}
                                />
                            ))
                        ) : (
                            <div>No reviews available.</div>
                        )}
                        </>
                    ) : (
                        <div>Carregando...</div>
                    )
                }
                
                
            />
        </div>

    );
};

export default MusicDetail;
