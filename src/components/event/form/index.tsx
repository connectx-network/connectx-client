"use client";

import { resgiterContactEventRequest } from "@/api/event";
import { EventContactBody, EventDetail } from "@/types/event";
import { showErrorNotification, showSuccessNotification } from "@/utils";
import {
  Button,
  Checkbox,
  Grid,
  NativeSelect,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";

const GENDER_SELECT = [
  { value: "MALE", label: "Mr./Ông" },
  { value: "FEMALE", label: "Ms./Bà" },
];

export type RegisterContactEventDataForm = {
  fullName: string;
  email: string;
  company: string;
  companyWebsite: string;
  jobTitle: string;
  linkedinProfile: string;
  telegram: string;
  knowEventBy: string;
};

type EventFormProps = {
  eventData: EventDetail;
};

const EventForm = (props: EventFormProps) => {
  const { eventData } = props;
  const registerContactEventForm = useForm<RegisterContactEventDataForm>({
    initialValues: {
      fullName: "",
      email: "",
      company: "",
      companyWebsite: "",
      jobTitle: "",
      linkedinProfile: "",
      telegram: "",
      knowEventBy: "",
    },

    validate: {
      fullName: (value) => (value.length > 0 ? null : "Full name is required"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email is invalid"),
      company: (value) => (value.length > 0 ? null : "Company is required"),
      jobTitle: (value) => (value.length > 0 ? null : "Your title is required"),
      telegram: (value) => (value.length > 0 ? null : "Telegram is required"),
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: EventContactBody) =>
      await resgiterContactEventRequest(data),
    onSuccess: (data) => {
      showSuccessNotification({
        message: "Registration successfully!",
      });
      registerContactEventForm.reset();
      registerContactEventForm.setValues({});
    },
    onError: (error) => {
      showErrorNotification({
        message: (error as any).response.data.message,
      });
    },
  });

  const handleSubmitData = (data: RegisterContactEventDataForm) => {
    const dataBody: EventContactBody = {
      email: data.email,
      fullName: data.fullName,
      company: data.company,
      companyUrl: data.companyWebsite,
      jobTitle: data.jobTitle,
      linkedInUrl: data.linkedinProfile,
      telegramId: data.telegram,
      knowEventBy: data.knowEventBy,
      eventId: eventData.id,
    };
    mutation.mutateAsync(dataBody);
  };

  return (
    <>
      <form
        onSubmit={registerContactEventForm.onSubmit((data) =>
          handleSubmitData(data)
        )}
      >
        <Grid gutter="xl" pb={40}>
          <Grid.Col span={12}>
            <TextInput
              withAsterisk
              label="Name"
              {...registerContactEventForm.getInputProps("fullName")}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <TextInput
              withAsterisk
              label="Email"
              type="email"
              {...registerContactEventForm.getInputProps("email")}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <TextInput
              withAsterisk
              label="Your company"
              {...registerContactEventForm.getInputProps("company")}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <TextInput
              label="Your company's website"
              {...registerContactEventForm.getInputProps("companyWebsite")}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <TextInput
              withAsterisk
              label="Your Title"
              {...registerContactEventForm.getInputProps("jobTitle")}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <TextInput
              label="Your Linkedin Profile"
              {...registerContactEventForm.getInputProps("linkedinProfile")}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <TextInput
              withAsterisk
              label="Your Telegram ID"
              {...registerContactEventForm.getInputProps("telegram")}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <TextInput
              label="How did you find us (ConnectX, Luma, Friend, Organizer, Other)"
              {...registerContactEventForm.getInputProps("knowEventBy")}
            />
          </Grid.Col>
          <Grid.Col className="flex justify-end">
            <Button
              type="submit"
              variant="gradient"
              gradient={{
                from: "rgba(86, 105, 255, 1)",
                to: "rgba(191, 86, 255, 1)",
                deg: 180,
              }}
            >
              Submit
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </>
  );
};

export default EventForm;
