import React from "react";
import { ReactComponent as CheckIcon } from "icons/check.svg";

const Checkbox = ({ onClick, checked }) => {
  return (
    <div
      onClick={() => onClick(checked)}
      className="mr-4 w-7 h-7 rounded bg-blue-100 hover:bg-blue-101 focus:bg-blue-102 flex items-center justify-center transition cursor-pointer"
    >
      {checked ? <CheckIcon className="w-5 stroke-current"></CheckIcon> : ""}
    </div>
  );
};

export default Checkbox;
