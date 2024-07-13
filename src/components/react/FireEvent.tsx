import React from "react";

export const FireEvent: React.FC<FireEventProps> = (props) => {
  const { children } = props;

  return <div>{children}</div>;
};

export type FireEventProps = {
  children: React.ReactNode;
};
