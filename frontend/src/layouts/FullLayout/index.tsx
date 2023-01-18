import {FC} from "react";

import Header from "./Header";

/**
 * FullLayout component props interface
 * @param children
 * @constructor
 */
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
