import type { Meta } from "@storybook/react";
import { ReviewCard, ReviewCardProps } from "./ReviewCard";

export default {
  title: "Components/Review Card",
  component: ReviewCard,
  argTypes: {
    // songCover: { table: { disable: true } },
    songTitle: { name: "Song title", type: "string" },
    artistName: { name: "Artist name", type: "string" },
    rating: { name: "Rating", control: { type: "range", min: 0, max: 10 } },
    title: { name: "Review title", type: "string" },
    content: { name: "Review content", type: "string" },
    authorName: { name: "Author name", type: "string" },
    authorUsername: { name: "Author username", type: "string" },
  },
  args: {
    songCover:
      "https://upload.wikimedia.org/wikipedia/en/0/03/Olivia_Rodrigo_-_Guts.png",
    songTitle: "ballad of a homeschooled girl",
    artistName: "Olivia Rodrigo",
    rating: 7,
    title: "OMFG, I LOVE THIS SONG SO MUCH!",
    content:
      "I have no words to describe how much I love this song. It's just so good! I've been listening to it non-stop since it came out. I'm so excited for the next album!",
    authorImage:
      "https://i.scdn.co/image/ab6761610000e5eb00e540b760b56d02cc415c47",
    authorName: "biggest livie fan",
    authorUsername: "livieforever",
  },
} as Meta<ReviewCardProps>;

export const reviewCard = (props: ReviewCardProps) => <ReviewCard {...props} />;
