import styled from 'styled-components';

export const MusicContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

export const MusicImg = styled.div`
    width: 150px;
    height: 150px;

    border-radius: 10px;
    transition: all 0.15s;

    cursor: pointer;

    user-select: none;

    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.35);

    &:hover {
        transform: scale(1.05);
    }
`;

export const MusicArtist = styled.p`
    color: black;
    font-size: 12px;
    font-weight: 300;
`;

export const MusicName = styled.p`
    color: black;
    font-size: 20px;
    margin-top: 8px;
    font-weight: 500;
`;

export const MusicRating = styled.span`
  display: block;
  font-size: 12px;
  color: #555;
  margin-top: 4px;
  font-weight: bold;
`;
