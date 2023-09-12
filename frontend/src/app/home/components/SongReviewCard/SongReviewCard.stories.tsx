import type { Meta } from "@storybook/react";
import { SongReviewCard, SongReviewCardProps } from "./SongReviewCard";

export default {
  title: "Components/Song Review Card",
  component: SongReviewCard,
  argTypes: {
    rating: { name: "Rating", control: { type: "range", min: 0, max: 10 } },
    title: { name: "Review title", type: "string" },
    content: { name: "Review content", type: "string" },
    authorImage: { name: "Author image", type: "string" },
    authorName: { name: "Author name", type: "string" },
    authorUsername: { name: "Author username", type: "string" },
  },
  args: {
    rating: 7,
    title: "OMFG, I LOVE THIS SONG SO MUCH!",
    content:
      "I have no words to describe how much I love this song. It's just so good! I've been listening to it non-stop since it came out. I'm so excited for the next album!",
    authorImage: "https://i.scdn.co/image/ab6761610000e5eb00e540b760b56d02cc415c47",
    authorName: "biggest livie fan",
    authorUsername: "livieforever",
  },
} as Meta<SongReviewCardProps>;

export const songReviewCard = (props: SongReviewCardProps) => <SongReviewCard {...props} />;
