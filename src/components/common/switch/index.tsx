import { Switch, SwitchProps } from "@mantine/core";
import classes from "./switch.module.css";

const CXSwitch = (
  props: SwitchProps & React.ComponentPropsWithoutRef<"input">
) => {
  return <Switch {...props} classNames={classes} />;
};

export default CXSwitch;
