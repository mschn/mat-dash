import { Alert, Box, Flex, Grid, GridItem, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Heatmap } from "./components/Heatmap";
import { orpcUtils } from "./lib/orpc";
import { Weather } from "./components/Weather/Weather";
import bg from "./assets/bg.jpg";
import { Calendar } from "./components/Calendar/Calendar";
import { Header } from "./components/Header";

function App() {
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
        <Grid
          templateColumns="repeat(3, 1fr)"
          templateRows="repeat(3, 1fr)"
          gap="6"
        >
          <GridItem colSpan={2}>
            <Heatmap weeks={20} activities={data ?? []} />
          </GridItem>
          <GridItem colSpan={1} rowSpan={2}>
            <Calendar></Calendar>
          </GridItem>
          <GridItem colSpan={2}>
            <Weather />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}

export default App;
