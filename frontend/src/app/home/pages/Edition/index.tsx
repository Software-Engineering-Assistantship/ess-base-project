import React, {useState} from 'react';
import { Wallpaper } from './style';
import MusicForm from '../../components/MusicFromsRegister';
import AlbumForm from '../../components/AlbumFormsRegister';
import { MusicListContainer } from '../MostListened/style';
const Edition: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <Wallpaper>
      <MusicListContainer> 
        <button onClick={() => setIsOpen(true)}>Criar música</button>

      <MusicForm isOpen={isOpen} setIsOpen={setIsOpen}/>
      </MusicListContainer>
    </Wallpaper>
  );
};

export default Edition;