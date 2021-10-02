import { ChakraProvider, Divider, Grid, Stack, Text } from "@chakra-ui/react";
import React from "react";

import { MessageBox } from "./components/MessageBox";
import { SuggestionsBox } from "./components/SuggestionsBox";

const App = () => {
  return (
    <ChakraProvider>
      <Grid
        position="absolute"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="100vh"
      >
        <Stack p={4} spacing={4} width={500} maxWidth={"80vw"}>
          <SuggestionsBox />
          <StyledDivider />
          <MessageBox />
        </Stack>
      </Grid>
    </ChakraProvider>
  );
};

export default App;

const StyledDivider = () => {
  return (
    <Grid gridTemplateColumns="1fr auto 1fr" alignItems="center">
      <Divider />
      <Text m={4} fontSize="sm" color="gray.500">
        or
      </Text>
      <Divider />
    </Grid>
  );
};
