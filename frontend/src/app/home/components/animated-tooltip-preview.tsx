import { AnimatedTooltip } from "./ui/animated-tooltip";

const people = [
  {
    id: 1,
    name: "Amanda Cristina",
    designation: "Salvar, Gostar, Compartilhar, Avaliar Reservas",
    image: "https://i.imgur.com/B3GoJFb.png",
  },
  {
    id: 2,
    name: "Bianca Duarte",
    designation: "Cadastro, Login e Tela Inicial",
    image: "https://i.imgur.com/GKQzbwx.png",
  },
  {
    id: 3,
    name: "Maria Letícia",
    designation: "Promoções, E-mail e Reservas",
    image: "https://i.imgur.com/RwDa0K6.png",
  },
  {
    id: 4,
    name: "Victória Cesar",
    designation: "Realizar Reservas",
    image: "https://i.imgur.com/N5YaGKi.png",
  },
  {
    id: 5,
    name: "Matheus Augusto",
    designation: "Métodos de Pagamento",
    image: "https://i.imgur.com/2ccf5ry.png",
  },
  {
    id: 6,
    name: "Matheus Galdino",
    designation: "Busca com Filtro",
    image: "https://i.imgur.com/9KP19I1.png",
  },
];

export function AnimatedTooltipPreview() {
  return <AnimatedTooltip items={people} />;
}
