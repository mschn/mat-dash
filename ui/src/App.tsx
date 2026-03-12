import { Box, Flex } from "@chakra-ui/react";
import { Background } from "./components/Background";
import { Calendar } from "./components/Calendar/Calendar";
import { Header } from "./components/Header";
import { Heatmap } from "./components/Heatmap";
import { Weather } from "./components/Weather/Weather";

function App() {
  return (
    <Box w="100vw" position="relative">
      <Background />

      <Box maxW="50rem" mx="auto" pt={16} position="relative" zIndex={1}>
        <Header></Header>
        <Flex flexDir="column" gap={6}>
          <Weather />
          <Heatmap />
          <Calendar />
        </Flex>
      </Box>
    </Box>
  );
}

export default App;
