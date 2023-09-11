import styled from 'styled-components';

export const MusicContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

export const MusicImg = styled.img`
    width: 100%;
    max-width: 140px;

    border-radius: 10px;
    transition: all 0.15s;

    cursor: pointer;

    user-select: none;

    &:hover {
        transform: scale(1.05);
    }
`;

export const MusicArtist = styled.p`
    color: black;
    font-size: 12px;
`;

export const MusicName = styled.p`
    color: black;
    font-size: 20px;
    margin-top: 8px;
`;