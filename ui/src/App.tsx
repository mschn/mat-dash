import { Box, Flex } from "@chakra-ui/react";
import { Calendar } from "./components/Calendar/Calendar";
import { Header } from "./components/Header";
import { Heatmap } from "./components/Heatmap";
import { Links } from "./components/Links";
import { Weather } from "./components/Weather/Weather";
import { Background } from "./components/Background";

function App() {
  return (
    <Box w="100vw" h="100vh" position="relative">
      <Background />

      <Box maxW="70rem" mx="auto" pt={16} position="relative" zIndex={1}>
        <Header></Header>
        <Flex dir="row" gap={6}>
          {/* Left */}
          <Flex flexDir="column" gap={6}>
            <Weather />
            <Heatmap />
          </Flex>

          {/* Right */}
          <Flex flexDir="column" gap={6}>
            <Links />
            <Calendar></Calendar>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}

export default App;
