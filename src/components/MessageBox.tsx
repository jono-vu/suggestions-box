import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Stack, Text, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SubmitButton } from "./SubmitButton";

const MessageBox = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<{ message: string }>();

  const [error, setError] = useState<string>();
  const [isSuccessfullySubmitted, setSuccessfulySubmitted] =
    useState<boolean>(false);

  const onSubmit = handleSubmit(async ({ message }) => {
    const res = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "suggestion",
        message,
      }),
    });

    if (res.ok) {
      setSuccessfulySubmitted(true);
    } else {
      setError(`${res.status}: ${res.statusText}.`);
    }
  });

  if (!isOpen)
    return (
      <Button onClick={() => setOpen(true)} rightIcon={<ChevronDownIcon />}>
        Send us a Message
      </Button>
    );

  return (
    <div>
      <form data-netlify="true" name="message" method="post" {...{ onSubmit }}>
        <input type="hidden" name="form-name" value="message" />

        <Stack spacing={4}>
          <Stack alignItems="center">
            <Text as="label" fontWeight="medium" textAlign="center">
              Send us a Message
            </Text>
            <Textarea
              {...register("message")}
              placeholder="Message"
              height={200}
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

          {watch().message && (
            <SubmitButton
              {...{ isSuccessfullySubmitted }}
              isLoading={isSubmitting}
            />
          )}
        </Stack>
      </form>
    </div>
  );
};

export { MessageBox };

function encode(data: any) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}
