import { Alert, Box, Flex, Grid, GridItem, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Heatmap } from "./components/Heatmap";
import { orpcUtils } from "./lib/orpc";
import { Weather } from "./components/Weather/Weather";

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
    <Grid
      maxW="40rem"
      mx="auto"
      mt="5rem"
      templateColumns="repeat(2, 1fr)"
      gap="6"
    >
      <GridItem colSpan={2}>
        <Heatmap weeks={20} activities={data ?? []} />
      </GridItem>
      <GridItem colSpan={1}>
        <Weather />
      </GridItem>
    </Grid>
  );
}

export default App;
