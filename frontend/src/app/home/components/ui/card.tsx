import { Center, Heading, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
  imageSize: { width: string; height: string };
  link: string; // Adicionando a propriedade link
}

const Card = ({ imageUrl, title, description, imageSize, link }: CardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  };

  return (
    <Center
      bg="rgba(106, 5, 114, 0.76)" // Cor de fundo dos cards com transparência
      color="#FFFFFF" // Cor da fonte
      borderRadius="md"
      p={4}
      textAlign="center"
      width="250px" // Ajustando a largura dos cards
      height="350px" // Ajustando a altura dos cards
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      cursor="pointer" // Adicionando cursor pointer
      onClick={handleClick} // Adicionando o evento de clique
    >
      <Image
        src={imageUrl}
        mb={4}
        width={imageSize.width}
        height={imageSize.height}
      />
      <Heading
        size="md"
        mb={4}
        fontFamily="Inter"
        width="100%" // Ajustando a largura para 100%
      >
        {title}
      </Heading>
      <Text
        fontFamily="Inter"
        width="100%" // Ajustando a largura para 100%
        whiteSpace="pre-line"
      >
        {description}
      </Text>
    </Center>
  );
};

export default Card;
