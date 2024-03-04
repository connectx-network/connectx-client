import { notifications } from "@mantine/notifications";
import successClasses from "./notification-success.module.css";
import errorClasses from "./notification-error.module.css";
import { Icons } from "@/components/icons";

export const showErrorNotification = ({
  title = "Error",
  message = "Something went wrong",
}) =>
  notifications.show({
    color: "red",
    icon: <Icons.redBubble style={{ borderRadius: "0 0 0 12px" }} />,
    title,
    message,
    classNames: errorClasses,
  });

export const showSuccessNotification = ({
  title = "Success",
  message = "Successfully",
}) =>
  notifications.show({
    color: "green",
    icon: <Icons.greenBubble style={{ borderRadius: "0 0 0 12px" }} />,
    title,
    message,
    classNames: successClasses,
  });

export default function Notification() {}
