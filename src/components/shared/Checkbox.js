import React from "react";
import { ReactComponent as CheckIcon } from "icons/check.svg";

const Checkbox = ({ onClick, checked, className = "", iconClassName = "w-5" }) => {
  return (
    <div
      onClick={() => onClick(checked)}
      className={`${className} flex items-center justify-center`}
    >
      {checked ? <CheckIcon className={`${iconClassName} stroke-current`}></CheckIcon> : ""}
    </div>
  );
};

export default Checkbox;
