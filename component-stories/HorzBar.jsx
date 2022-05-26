import React from "react";

export { FatHorz, StartHorz, ThinHorz };

const ThinHorz = ({ className }) => {
  return <hr className={["border-1", "border-gray-400", className].join(" ")} />;
};

const FatHorz = ({ className }) => {
  return <hr className={["border-2", "border-gray-200", className].join(" ")} />;
};

const StartHorz = ({ className }) => {
  return <hr className={["border-1", "border-gray-400", " float-left", "w-[12px]", className].join(" ")} />;
};
