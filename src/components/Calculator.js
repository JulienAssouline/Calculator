import React, { useState } from "react";

function Calculator() {
  const [inputVal, setInputVal] = useState("0");
  const [calcVal, setCalcVal] = useState("0");
  const [operatorState, setOperatorState] = useState(false);

  function handleClear() {
    setInputVal("0");
    setCalcVal("0");
  }

  function handleNumberClick(event) {
    setInputVal(
      inputVal === "0"
        ? String(event.target.innerHTML)
        : inputVal + event.target.innerHTML
    );

    setCalcVal(
      calcVal === "0"
        ? String(event.target.innerHTML)
        : calcVal + event.target.innerHTML
    );
  }

  function handleOperatorClick(operator) {
    operatorState === true ? setOperatorState(false) : setOperatorState(true);

    if (operator === "^") {
      setInputVal(inputVal === "0" ? String(operator) : `${inputVal} ^ `);
      setCalcVal(calcVal === "0" ? String("**") : `${calcVal} ** `);
    } else if (operator === "√") {
      setInputVal(
        inputVal === "0" ? String(` √${inputVal} `) : ` √${inputVal} `
      );
      setCalcVal(
        calcVal === "0"
          ? String(`${Math.sqrt(calcVal)} `)
          : ` ${Math.sqrt(calcVal)} `
      );
    } else {
      setInputVal(
        inputVal === "0" ? String(operator) : `${inputVal} ${operator} `
      );
      setCalcVal(
        calcVal === "0" ? String(operator) : `${calcVal} ${operator} `
      );
    }
  }

  function inputDot() {
    if (operatorState === true) {
      setInputVal(inputVal + ".");
      setOperatorState(false);
    }

    if (!inputVal.includes(".")) {
      setInputVal(inputVal + ".");
    }

    if (operatorState === true) {
      setCalcVal(calcVal + ".");
      setOperatorState(false);
    }

    if (!calcVal.includes(".")) {
      setCalcVal(calcVal + ".");
    }
  }

  function handleEqualClick() {
    try {
      setInputVal(eval(calcVal));
      setCalcVal(eval(calcVal));
    } catch (err) {
      setInputVal("Invalid Equation");
    }
  }

  return (
    <div className="calculator">
      <div className="cal-container">
        <div className="cal-display">
          <div className="display-val" data-testid="input-val">
            {inputVal}
          </div>
        </div>

        <div className="row-container">
          <div className="row-val" onClick={handleClear}>
            C
          </div>
          <div className="row-val" onClick={inputDot}>
            .
          </div>

          <div className="row-val" onClick={() => handleOperatorClick("^")}>
            ^
          </div>
          <div
            className="row-val operator"
            onClick={() => handleOperatorClick("√")}
          >
            √
          </div>
        </div>
        <div className="row-container">
          <div className="row-val" onClick={handleNumberClick}>
            7
          </div>
          <div className="row-val" onClick={handleNumberClick}>
            8
          </div>
          <div className="row-val" onClick={handleNumberClick}>
            9
          </div>
          <div
            className="row-val operator"
            onClick={() => handleOperatorClick("*")}
          >
            x
          </div>
        </div>
        <div className="row-container">
          <div className="row-val" onClick={handleNumberClick}>
            4
          </div>
          <div className="row-val" onClick={handleNumberClick}>
            5
          </div>
          <div className="row-val" onClick={handleNumberClick}>
            6
          </div>
          <div
            className="row-val operator"
            onClick={() => handleOperatorClick("-")}
          >
            -
          </div>
        </div>
        <div className="row-container">
          <div className="row-val" onClick={handleNumberClick}>
            1
          </div>
          <div className="row-val" onClick={handleNumberClick}>
            2
          </div>
          <div className="row-val" onClick={handleNumberClick}>
            3
          </div>
          <div
            className="row-val operator"
            onClick={() => handleOperatorClick("+")}
          >
            +
          </div>
        </div>
        <div className="row-container">
          <div className="row-val" onClick={handleNumberClick}>
            0
          </div>

          <div className="row-val" onClick={handleNumberClick}>
            (
          </div>
          <div className="row-val" onClick={handleNumberClick}>
            )
          </div>
          <div
            className="row-val operator"
            onClick={() => handleOperatorClick("/")}
          >
            ÷
          </div>
        </div>
        <div className="row-val-equal operator" onClick={handleEqualClick}>
          =
        </div>
      </div>
    </div>
  );
}

export default Calculator;
