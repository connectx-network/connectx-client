import { Switch, SwitchProps } from "@mantine/core";
import classes from "./switch.module.css";

const CSwitch = (
  props: SwitchProps & React.ComponentPropsWithoutRef<"input">
) => {
  return <Switch {...props} classNames={classes} />;
};

export default CSwitch;
