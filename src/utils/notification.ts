import { notifications } from "@mantine/notifications";

export const showErrorNotification = ({
  title = "Error",
  message = "Something went wrong",
}) => notifications.show({ color: "red", title, message });

export const showSuccessNotification = ({
  title = "Success",
  message = "Successfully",
}) => notifications.show({ color: "green", title, message });
