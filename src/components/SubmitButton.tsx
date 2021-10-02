import { CheckIcon } from "@chakra-ui/icons";
import { Button, Stack, Text } from "@chakra-ui/react";
import React from "react";

const SubmitButton = ({ ...props }) => {
  if (props.isSuccessfullySubmitted) {
    return (
      <Button variant="solid" colorScheme="blue" rightIcon={<CheckIcon />}>
        Thank you for your suggestion
      </Button>
    );
  }

  return (
    <Stack>
      <Button variant="solid" colorScheme="blue" {...props} type="submit">
        Submit →
      </Button>

      <Text textAlign="center" fontSize="sm" color="gray.500">
        All submissions are anonymous.
      </Text>
    </Stack>
  );
};

export { SubmitButton };
