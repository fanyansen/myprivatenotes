import React, { Suspense } from "react";
import { LazyExoticComponent } from "react";

// type LoadableProps = (
//   Component: LazyExoticComponent<React.FC>
// ) => (props: JSX.IntrinsicAttributes) => JSX.Element;

// const Loadable: LoadableProps =
//   (Component: LazyExoticComponent<React.FC>) =>
//   (props: JSX.IntrinsicAttributes) =>
//     (
//       <Suspense fallback={"loading"}>
//         <Component {...props} />
//       </Suspense>
//     );
const Loadable =
  (Component: LazyExoticComponent<React.FC>) =>
  (props: JSX.IntrinsicAttributes) =>
    (
      <Suspense fallback={"loading"}>
        <Component {...props} />
      </Suspense>
    );

export default Loadable;
