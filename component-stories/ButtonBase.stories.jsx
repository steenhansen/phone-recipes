import React from "react";
import { ButtonBase } from "./ButtonBase";

export default {
  title: "Main/ButtonBase",
  component: ButtonBase,
};

export const ButtonLeft = () => {
  return (
    <ButtonBase className={"float-left"}>
      <a href="/">a link</a>
    </ButtonBase>
  );
};

export const ButtonCenter = () => {
  return (
    <ButtonBase className={"mx-auto block"}>
      <a href="/">a link</a>
    </ButtonBase>
  );
};
