import React from "react";
// import { RenderResult, render, Matcher } from "@testing-library/react";
import { Matcher, screen } from "@testing-library/react";
// import { Provider } from "react-redux";
// import { store } from "./app/store";
// import App from "./App";

test("renders learn react link", () => {
  // const view = render(
  //   <Provider store={store}>
  //     <App />
  //   </Provider>
  // );

  const expectedRes: Matcher = /GraphQL/i;

  expect(screen.getByText(expectedRes)).toBeInTheDocument();
});
