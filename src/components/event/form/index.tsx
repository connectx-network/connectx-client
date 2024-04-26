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
  email: string;
  fullName: string;
  phoneNumber: string;
  company: string;
  jobTitle: string;
  gender: string;
  knowEventBy: string;
  phaseIds: string[];
};

type EventFormProps = {
  eventData: EventDetail;
};

const EventForm = (props: EventFormProps) => {
  const { eventData } = props;
  const registerContactEventForm = useForm<RegisterContactEventDataForm>({
    initialValues: {
      email: "",
      fullName: "",
      phoneNumber: "",
      company: "",
      jobTitle: "",
      gender: "MALE",
      knowEventBy: "",
      phaseIds: [],
    },

    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Bussiness email is invalid",
      fullName: (value) => (value.length > 0 ? null : "Full name is required"),
      phoneNumber: (value) => (value.length > 0 ? null : "Mobile is required"),
      company: (value) =>
        value.length > 0 ? null : "Organization is required",
      jobTitle: (value) => (value.length > 0 ? null : "Job title is required"),
      gender: (value) => (value.length > 0 ? null : "Gender is required"),
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: EventContactBody) =>
      await resgiterContactEventRequest(data),
    onSuccess: (data) => {
      showSuccessNotification({
        message: "Submit successfully!",
      });
      registerContactEventForm.reset();
      registerContactEventForm.setValues({
        phaseIds: [],
      });
    },
    onError: (error) => {
      showErrorNotification({
        message: (error as any).response.data.message,
      });
    },
  });

  const handleSubmitData = (data: RegisterContactEventDataForm) => {
    const dataBody: EventContactBody = {
      ...data,
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
          <Grid.Col span={6}>
            <NativeSelect
              withAsterisk
              label="Prefix / Danh xưng"
              data={GENDER_SELECT}
              {...registerContactEventForm.getInputProps("gender")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <TextInput
              withAsterisk
              label="Full name / Họ và tên"
              placeholder="Full name / Họ và tên"
              {...registerContactEventForm.getInputProps("fullName")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <TextInput
              withAsterisk
              label="Mobile / Số điện thoại"
              placeholder="Mobile / Số điện thoại"
              {...registerContactEventForm.getInputProps("phoneNumber")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <TextInput
              withAsterisk
              label="Bussiness email / Email công việc"
              type="email"
              placeholder="Bussiness email / Email công việc"
              {...registerContactEventForm.getInputProps("email")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <TextInput
              withAsterisk
              label="Job title / Chức vụ"
              placeholder="Job title / Chức vụ"
              {...registerContactEventForm.getInputProps("jobTitle")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <TextInput
              withAsterisk
              label="Organization / Tổ chức"
              placeholder="Organization / Tổ chức"
              {...registerContactEventForm.getInputProps("company")}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <Checkbox.Group
              label="Quý khách muốn đăng ký tham gia phiên hội thảo nào?"
              {...registerContactEventForm.getInputProps("phaseIds", {
                type: "checkbox",
              })}
            >
              <Stack mt={12} ml={24}>
                {eventData.eventPhases.map((phase) => (
                  <Checkbox
                    key={phase.id}
                    value={phase.id}
                    label={`${phase.title}: ${phase.description}`}
                    styles={{
                      label: {
                        fontSize: 14,
                        fontWeight: 200,
                        lineHeight: "24px",
                      },
                    }}
                  />
                ))}
              </Stack>
            </Checkbox.Group>
          </Grid.Col>
          <Grid.Col span={12}>
            <Textarea
              label="Quý vị biết đến Diễn đàn Đổi mới sáng tạo Quốc gia qua kênh thông tin nào"
              placeholder="Quý vị biết đến Diễn đàn Đổi mới sáng tạo Quốc gia qua kênh thông tin nào"
              rows={4}
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
