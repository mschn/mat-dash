import { Box, Flex } from "@chakra-ui/react";
import bg from "./assets/bg.jpg";
import { Calendar } from "./components/Calendar/Calendar";
import { Header } from "./components/Header";
import { Heatmap } from "./components/Heatmap";
import { Links } from "./components/Links";
import { Weather } from "./components/Weather/Weather";

function App() {
  return (
    <Box w="100vw" h="100vh" bgSize="cover" bgImage={`url(${bg})`}>
      <Box maxW="60rem" mx="auto" pt={8}>
        <Header></Header>

        <Flex dir="row" gap={3}>
          {/* Left */}
          <Flex flexDir="column" gap={3}>
            <Weather />
            <Heatmap />
          </Flex>

          {/* Right */}
          <Flex flexDir="column" gap={3}>
            <Links />
            <Calendar></Calendar>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}

export default App;
