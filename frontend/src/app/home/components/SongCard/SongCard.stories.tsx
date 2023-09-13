import type { Meta } from "@storybook/react";
import { SongCard, SongCardProps } from "./SongCard";

export default {
  title: "Components/Song Card",
  component: SongCard,
  argTypes: {
    // songCover: { table: { disable: true } },
    title: { name: "Title", type: "string" },
    artistName: { name: "Artist Name", type: "string" },
    averageRating: { name: "Average Rating", type: "number" },
    genre: { name: "Genre", type: "string" },
    releaseYear: { name: "Release Year", type: "number" },
    amountReview: { name: "Amount of Reviews", type: "number" },
    spotifyLink: { name: "Spotify Link", type: "string" },
    appleMusicLink: { name: "Apple Music Link", type: "string" },
    deezerLink: { name: "Deezer Link", type: "string" },
    youtubeLink: { name: "Youtube Link", type: "string" },
  },
  args: {
    songCover: "https://upload.wikimedia.org/wikipedia/en/0/03/Olivia_Rodrigo_-_Guts.png",
    title: "ballad of a homeschooled girl",
    artistName: "Olivia Rodrigo",
    averageRating: 5,
    genre: "Pop Rock",
    releaseYear: 2023,
    amountReview: 54000,
    spotifyLink: "https://open.spotify.com/track/5sp71CUt0jXRNqHblPGp7b",
  },
} as Meta<SongCardProps>;

export const songCard = (props: SongCardProps) => <SongCard {...props} />;