import React, { useState } from 'react';
import RegisterInput from '../Input';
import ModalComponent from '../Modal-ui';
import axios from 'axios';

const MusicForm = () => {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [artist, setArtist] = useState('');
    const handleSubmit = async (e) => {
        // e.preventDefault();
        console.log("teste");

        const formData = {
            'title': title,
            'genre': genre,
            'release_year': Number(year),
            'artist': artist
        };

        console.log(formData);

        try {
            const response = await axios.post('http://127.0.0.1:8000/songs/create', formData);
            console.log(response.data);

            // setTitle('');
            // setGenre('');
            // setYear('');
        } catch (error) {
            console.error("Error posting music data:", error);
        }
    };

    return (
        <ModalComponent
            open={true}
            setOpen={() => { }}
            title="Criação de música"
            textExit="Cancelar"
            textSubmit="Salvar"
            onClick={(e) => handleSubmit(e)}

            onCancel={() => { }}
            isBold={false}
            disabledSubmit={false}
            children={
                <form>
                    <div>
                        <label>Title:</label>
                        <RegisterInput

                            value={title}
                            onChange={(e) => setTitle(e)}
                            required
                        />
                    </div>
                    <div>
                        <label>Gênero:</label>
                        <RegisterInput

                            value={genre}
                            onChange={(e) => setGenre(e)}
                            required
                        />
                    </div>
                    <div>
                        <label>Artista:</label>
                        <RegisterInput
                            value={artist}
                            onChange={(e) => setArtist(e)}
                            required
                        />
                    </div>
                    <div>
                        <label>Ano de lançamento:</label>
                        <RegisterInput
                            value={year}
                            onChange={(e) => setYear(e)}
                            required
                        />
                    </div>
                </form>
            }
        />
    );
};

export default MusicForm;
