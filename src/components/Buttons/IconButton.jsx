import React from "react";

const IconButton = ({ Icon, onclick }) => (
  <span
    className="coursor-pointer fle\ items-center space-x-2"
    onclick={onclick}
  >
    <Icon size={22} />
  </span>
);

export default IconButton;
