import type { Meta } from "@storybook/react";
import { SongCard, SongCardProps } from "./SongCard";

export default {
  title: "Components/Song Card",
  component: SongCard,
  argTypes: {
    // songCover: { table: { disable: true } },
    title: { name: "Title", type: "string" },
    artistName: { name: "Artist Name", type: "string" },
    mediumRating: { name: "Medium Rating", type: "number" },
    genre: { name: "Genre", type: "string" },
    releaseYear: { name: "Release Year", type: "number" },
    amountReview: { name: "Amount of Reviews", type: "number" },
  },
  args: {
    songCover: "https://upload.wikimedia.org/wikipedia/en/0/03/Olivia_Rodrigo_-_Guts.png",
    title: "Example Song",
    artistName: "Example Artist",
    mediumRating: 4.5,
    genre: "Example Genre",
    releaseYear: 2023,
    amountReview: 54000,
  },
} as Meta<SongCardProps>;

export const songCard = (props: SongCardProps) => <SongCard {...props} />;