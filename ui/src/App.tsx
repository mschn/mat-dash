import { Alert, Box, Flex, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import bg from "./assets/bg.jpg";
import { Calendar } from "./components/Calendar/Calendar";
import { Header } from "./components/Header";
import { Heatmap } from "./components/Heatmap";
import { Links } from "./components/Links";
import { Weather } from "./components/Weather/Weather";
import { orpcUtils } from "./lib/orpc";

function App() {

  // TODO move this query in the heatmap component 
  const { data, error, isPending } = useQuery(
    orpcUtils.activities.queryOptions(),
  );

  if (isPending)
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner size="xl" />
      </Flex>
    );

  if (error)
    return (
      <Box p={8}>
        <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Title>{error.message}</Alert.Title>
        </Alert.Root>
      </Box>
    );

  return (
    <Box w="100vw" h="100vh" bgSize="cover" bgImage={`url(${bg})`}>
      <Box maxW="60rem" mx="auto" pt={8}>
        <Header></Header>

        <Flex dir="row" gap={3}>
          {/* Left */}
          <Flex flexDir="column" gap={3}>
            <Weather />
            <Heatmap weeks={20} activities={data ?? []} />
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
