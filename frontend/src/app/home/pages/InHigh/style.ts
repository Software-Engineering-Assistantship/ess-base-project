import styled from 'styled-components';

export const Wallpaper = styled.div`
  background: linear-gradient(to bottom, #ff66c4, #ffde59);
  min-height: 100vh; /* Isso garante que o gradiente cubra toda a altura da tela */
`;

export const MusicListContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1100px;
    gap: 60px;
    margin: auto;
    padding-top: 160px;
`;