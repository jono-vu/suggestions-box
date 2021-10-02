import { Input, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SubmitButton } from "./SubmitButton";

const SuggestionsBox = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<{ bandName: string }>();

  const [error, setError] = useState<string>();
  const [isSuccessfullySubmitted, setSuccessfulySubmitted] =
    useState<boolean>(false);

  const onSubmit = handleSubmit(async ({ bandName }) => {
    const res = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "bandName",
        ...{ bandName },
      }),
    });

    if (res.ok) {
      setSuccessfulySubmitted(true);
    } else {
      setError(`${res.status}: ${res.statusText}.`);
    }
  });

  return (
    <form data-netlify="true" name="bandName" method="POST" {...{ onSubmit }}>
      <input type="hidden" name="form-name" value="bandName" />

      <Stack spacing={4}>
        <Stack alignItems="center">
          <Text as="label" fontWeight="medium" textAlign="center">
            Send us a Band Name
          </Text>
          <Input
            {...register("bandName")}
            placeholder="Enter Suggestion"
            textAlign="center"
          />
        </Stack>

        {error && (
          <Text
            fontSize="sm"
            fontWeight="medium"
            color="red.500"
            textAlign="center"
          >
            {error}
          </Text>
        )}

        {watch().bandName && (
          <SubmitButton
            {...{ isSuccessfullySubmitted }}
            isLoading={isSubmitting}
          />
        )}
      </Stack>
    </form>
  );
};

export { SuggestionsBox };

function encode(data: any) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}
