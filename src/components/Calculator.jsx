import React, { useState } from "react";
function Calculator() {
  function operations(firstNum, secNum, op) {
    let result;
    switch (op) {
      case "+":
        result = firstNum + secNum;
        break;
      case "-":
        result = firstNum - secNum;
        break;
      case "*":
        result = firstNum * secNum;
        break;
      case "/":
        result = firstNum / secNum;
        break;
      default:
        break;
    }
    return result;
  }
  const [input, setInput] = useState({
    firstInput: "",
    secondInput: "",
  });
  const [isOperator, setIsOperator] = useState(false);
  const [operator, setOperator] = useState("");
  const [emoji, setEoji] = useState(false);
  function handleOperatorClick(prop) {
    const op = prop.target.value;
    if (input.firstInput !== "" && input.secondInput === "") {
      setIsOperator(true);
      setOperator(op);
    }
    if (input.firstInput !== "" && input.secondInput !== "") {
      setOperator(op);

      setInput((prevValue) => {
        let res = operations(
          parseFloat(prevValue.firstInput),
          parseFloat(prevValue.secondInput),
          operator
        );
        return {
          firstInput: res.toString(),
          secondInput: "",
        };
      });
    }
  }
  function handleNumClick(prop) {
    const num = prop.target.value;
    if (!isOperator) {
      setInput((prevValue) => {
        return {
          ...prevValue,
          firstInput: prevValue.firstInput + num,
        };
      });
    } else {
      setInput((prevValue) => {
        return {
          ...prevValue,
          secondInput: prevValue.secondInput + num,
        };
      });
    }
  }
  function handleEquals() {
    if (input.firstInput !== "" && input.secondInput !== "") {
      setInput((prevValue) => {
        let res = operations(
          parseFloat(prevValue.firstInput),
          parseFloat(prevValue.secondInput),
          operator
        );
        return {
          firstInput: res.toString(),
          secondInput: "",
        };
      });
      setIsOperator(false);
      setOperator("");
    }
  }
  function handleC() {
    setInput({
      firstInput: "",
      secondInput: "",
    });
    setIsOperator(false);
    setOperator("");
  }
  function handleCE() {
    if (input.firstInput === "Infinity") {
      handleC();
    }
    if (isOperator) {
      setInput((prevValue) => {
        if (prevValue.secondInput === "") {
          setIsOperator(false);
        }
        return {
          ...prevValue,
          secondInput: prevValue.secondInput.substring(
            0,
            prevValue.secondInput.length - 1
          ),
        };
      });
    } else {
      setInput((prevValue) => {
        return {
          ...prevValue,
          firstInput: prevValue.firstInput.substring(
            0,
            prevValue.firstInput.length - 1
          ),
        };
      });
    }
  }
  function handleNegation() {
    if (input.firstInput !== "Infinity") {
      if (isOperator && input.secondInput !== "") {
        if (parseFloat(input.secondInput) > 0) {
          setInput((prevValue) => {
            return {
              ...prevValue,
              secondInput: -Math.abs(parseFloat(prevValue.secondInput)),
            };
          });
        }
        if (parseFloat(input.secondInput) < 0) {
          setInput((prevValue) => {
            return {
              ...prevValue,
              secondInput: Math.abs(parseFloat(prevValue.secondInput)),
            };
          });
        }
      }
      if (!isOperator) {
        if (parseFloat(input.firstInput) > 0) {
          setInput((prevValue) => {
            return {
              ...prevValue,
              firstInput: -Math.abs(parseFloat(prevValue.firstInput)),
            };
          });
        }
        if (parseFloat(input.firstInput) < 0) {
          setInput((prevValue) => {
            return {
              ...prevValue,
              firstInput: Math.abs(parseFloat(prevValue.firstInput)),
            };
          });
        }
      }
    }
  }
  function handleDec() {
    if (isOperator) {
      if (!input.secondInput.includes(".")) {
        setInput((prevValue) => {
          return { ...prevValue, secondInput: prevValue.secondInput + "." };
        });
      }
    } else {
      if (!input.firstInput.includes(".")) {
        setInput((prevValue) => {
          return {
            ...prevValue,
            firstInput: prevValue.firstInput + ".",
          };
        });
      }
    }
  }
  function handleEmoji() {
    setEoji(true);

    setTimeout(() => {
      setEoji(false);
    }, 1500);
  }

  return (
    <div>
      {emoji ? <img id="emoji" src="giphyEmoji.gif" alt="emoji"></img> : null}

      <div className={emoji ? "blur" : ""} id="container">
        <div className="input-box">
          <input
            className="input-history"
            disabled
            value={isOperator ? input.firstInput + operator : ""}
            readOnly
          ></input>
          <input
            className="input-result"
            value={isOperator ? input.secondInput : input.firstInput}
            readOnly
          ></input>
        </div>
        <div className="buttons">
          <button className="functions" onClick={handleC}>
            C
          </button>
          <button className="functions" onClick={handleCE}>
            CE
          </button>
          <button className="functions" onClick={handleNegation}>
            -/+
          </button>
          <button className="operators" value="+" onClick={handleOperatorClick}>
            +
          </button>
          <button className="number" value="1" onClick={handleNumClick}>
            1
          </button>
          <button className="number" value="2" onClick={handleNumClick}>
            2
          </button>
          <button className="number" value="3" onClick={handleNumClick}>
            3
          </button>
          <button className="operators" value="-" onClick={handleOperatorClick}>
            -
          </button>
          <button className="number" value="4" onClick={handleNumClick}>
            4
          </button>
          <button className="number" value="5" onClick={handleNumClick}>
            5
          </button>
          <button className="number" value="6" onClick={handleNumClick}>
            6
          </button>
          <button className="operators" value="*" onClick={handleOperatorClick}>
            *
          </button>
          <button className="number" value="7" onClick={handleNumClick}>
            7
          </button>
          <button className="number" value="8" onClick={handleNumClick}>
            8
          </button>
          <button className="number" value="9" onClick={handleNumClick}>
            9
          </button>
          <button className="operators" value="/" onClick={handleOperatorClick}>
            /
          </button>
          <button className="number" value="." onClick={handleDec}>
            .
          </button>
          <button className="number" value="0" onClick={handleNumClick}>
            0
          </button>
          <button onClick={handleEmoji}>😊</button>
          <button className="functions" onClick={handleEquals}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}
export default Calculator;
