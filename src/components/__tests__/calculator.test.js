import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Calculator from "../Calculator";

afterEach(cleanup);

test("evaluate simple equations", () => {});

test("test initial input", () => {
  const { getByTestId } = render(<Calculator />);

  const input = getByTestId("input-val").innerHTML;

  expect(input).toBe("0");
});

test("test basic equations & click events", () => {
  const { getByText, getByTestId } = render(<Calculator />);

  fireEvent.click(getByText("9"));
  fireEvent.click(getByText("+"));
  fireEvent.click(getByText("9"));
  fireEvent.click(getByText("="));

  const input = getByTestId("input-val").innerHTML;

  expect(input).toBe("18");
});

test("test clear", () => {
  const { getByText, getByTestId } = render(<Calculator />);
  fireEvent.click(getByText("("));
  fireEvent.click(getByText("2"));
  fireEvent.click(getByText("+"));
  fireEvent.click(getByText("3"));
  fireEvent.click(getByText(")"));
  fireEvent.click(getByText("÷"));
  fireEvent.click(getByText("5"));

  fireEvent.click(getByText("C"));

  const input = getByTestId("input-val").innerHTML;

  expect(input).toBe("0");
});

test("test exponent", () => {
  const { getByText, getByTestId } = render(<Calculator />);

  fireEvent.click(getByText("9"));
  fireEvent.click(getByText("^"));
  fireEvent.click(getByText("2"));
  fireEvent.click(getByText("="));

  const input = getByTestId("input-val").innerHTML;

  expect(input).toBe("81");
});

test("test square root", () => {
  const { getByText, getByTestId } = render(<Calculator />);

  fireEvent.click(getByText("9"));
  fireEvent.click(getByText("√"));
  fireEvent.click(getByText("="));

  const input = getByTestId("input-val").innerHTML;
  expect(input).toBe("3");

  fireEvent.click(getByText("C"));

  fireEvent.click(getByText("√"));
  fireEvent.click(getByText("="));

  const inputZero = getByTestId("input-val").innerHTML;
  expect(inputZero).toBe("0");

  fireEvent.click(getByText("C"));

  fireEvent.click(getByText("√"));
  fireEvent.click(getByText("9"));
  fireEvent.click(getByText("="));

  const inputZeroNine = getByTestId("input-val").innerHTML;
  expect(inputZeroNine).toBe("Invalid Equation");

  fireEvent.click(getByText("C"));

  fireEvent.click(getByText("9"));
  fireEvent.click(getByText("√"));
  fireEvent.click(getByText("-"));
  fireEvent.click(getByText("4"));
  fireEvent.click(getByText("="));

  const inputSquareRootEquation = getByTestId("input-val").innerHTML;
  expect(inputSquareRootEquation).toBe("-1");

  fireEvent.click(getByText("C"));

  fireEvent.click(getByText("√"));
  fireEvent.click(getByText("9"));
  fireEvent.click(getByText("-"));
  fireEvent.click(getByText("4"));
  fireEvent.click(getByText("="));

  const inputSquareRootEquationErr = getByTestId("input-val").innerHTML;
  expect(inputSquareRootEquationErr).toBe("Invalid Equation");
});

test("test equation with brackets", () => {
  const { getByText, getByTestId } = render(<Calculator />);
  fireEvent.click(getByText("("));
  fireEvent.click(getByText("2"));
  fireEvent.click(getByText("+"));
  fireEvent.click(getByText("3"));
  fireEvent.click(getByText(")"));
  fireEvent.click(getByText("÷"));
  fireEvent.click(getByText("5"));
  fireEvent.click(getByText("="));

  const input = getByTestId("input-val").innerHTML;

  expect(input).toBe("1");
});

test("test invalid equation", () => {
  const { getByText, getByTestId } = render(<Calculator />);
  fireEvent.click(getByText("2"));
  fireEvent.click(getByText("+"));
  fireEvent.click(getByText("3"));
  fireEvent.click(getByText(")"));
  fireEvent.click(getByText("÷"));
  fireEvent.click(getByText("5"));
  fireEvent.click(getByText("="));

  const input = getByTestId("input-val").innerHTML;
  expect(input).toBe("Invalid Equation");

  fireEvent.click(getByText("C"));
  fireEvent.click(getByText("9"));
  fireEvent.click(getByText("^"));
  fireEvent.click(getByText("^"));
  fireEvent.click(getByText("9"));
  fireEvent.click(getByText("="));

  const exponentInput = getByTestId("input-val").innerHTML;
  expect(exponentInput).toBe("Invalid Equation");

  fireEvent.click(getByText("C"));
  fireEvent.click(getByText("9"));
  fireEvent.click(getByText("√"));
  fireEvent.click(getByText("√"));
  fireEvent.click(getByText("9"));
  fireEvent.click(getByText("="));

  const squareRootInput = getByTestId("input-val").innerHTML;
  expect(squareRootInput).toBe("Invalid Equation");
});

test("test decimals", () => {
  const { getByText, getByTestId } = render(<Calculator />);
  fireEvent.click(getByText("9"));
  fireEvent.click(getByText("."));
  fireEvent.click(getByText("."));
  fireEvent.click(getByText("."));
  fireEvent.click(getByText("1"));
  fireEvent.click(getByText("x"));
  fireEvent.click(getByText("3"));
  fireEvent.click(getByText("."));
  fireEvent.click(getByText("."));
  fireEvent.click(getByText("1"));

  const input = getByTestId("input-val").innerHTML;

  expect(input).toBe("9.1 * 3.1");
  fireEvent.click(getByText("="));

  const inputResult = getByTestId("input-val").innerHTML;

  expect(inputResult).toBe("28.21");
});

test("test after equals is clicked", () => {
  const { getByText, getByTestId } = render(<Calculator />);
  fireEvent.click(getByText("9"));
  fireEvent.click(getByText("x"));
  fireEvent.click(getByText("9"));
  fireEvent.click(getByText("="));
  fireEvent.click(getByText("√"));
  fireEvent.click(getByText("="));

  const input = getByTestId("input-val").innerHTML;

  expect(input).toBe("9");

  fireEvent.click(getByText("C"));

  fireEvent.click(getByText("9"));
  fireEvent.click(getByText("x"));
  fireEvent.click(getByText("9"));
  fireEvent.click(getByText("="));
  fireEvent.click(getByText("+"));
  fireEvent.click(getByText("1"));
  fireEvent.click(getByText("0"));
  fireEvent.click(getByText("x"));
  fireEvent.click(getByText("5"));
  fireEvent.click(getByText("="));

  const inputResult = getByTestId("input-val").innerHTML;

  expect(inputResult).toBe("131");
});
