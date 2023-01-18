import {FC} from "react";

import Header from "./Header";

const FullLayout: FC = (
  {
    children,
  }) => {

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default FullLayout;
