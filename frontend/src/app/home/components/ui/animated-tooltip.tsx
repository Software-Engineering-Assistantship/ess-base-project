import { useState } from "react";
import { Avatar, AvatarGroup, Box, Text, Flex } from "@chakra-ui/react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    image: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  const tooltipBg = "transparent";
  const tooltipTextColor = "white";

  return (
    <Box display="flex" alignItems="center">
      <AvatarGroup size="xl" max={6}>
        {items.map((item) => (
          <Box
            key={item.id}
            onMouseEnter={() => setHoveredIndex(item.id)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === item.id && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.6 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 10,
                    },
                  }}
                  exit={{ opacity: 0, y: 20, scale: 0.6 }}
                  style={{
                    translateX: translateX,
                    rotate: rotate,
                    whiteSpace: "nowrap",
                  }}
                  className="tooltip-content"
                >
                  <Flex
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    bg={tooltipBg}
                    color={tooltipTextColor}
                    borderRadius="md"
                    p={2}
                    shadow="xl"
                    position="absolute"
                    top="-50px"
                    left="50%"
                    transform="translateX(-50%)"
                    zIndex="tooltip"
                  >
                    <Text fontWeight="bold">{item.name}</Text>
                    <Text fontSize="sm">{item.designation}</Text>
                  </Flex>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div
              onMouseMove={handleMouseMove}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Avatar
                name={item.name}
                src={item.image}
                size="xl" // Definindo o tamanho dos avatares individualmente
              />
            </motion.div>
          </Box>
        ))}
      </AvatarGroup>
    </Box>
  );
};
