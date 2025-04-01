'use client';

import { useState } from 'react';

function Home() {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const performCalculation = (op, firstOperand, secondOperand) => {
    switch (op) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return secondOperand !== 0 ? firstOperand / secondOperand : 'Error';
      default:
        return secondOperand;
    }
  };

  const handleNumberClick = (num) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperatorClick = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const result = performCalculation(operator, prevValue, inputValue);
      setDisplay(String(result));
      setPrevValue(result);
    }

    setOperator(nextOperator);
    setWaitingForNewValue(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
  };

  const handleEqual = () => {
    const inputValue = parseFloat(display);
    if (operator && prevValue !== null) {
      const result = performCalculation(operator, prevValue, inputValue);
      setDisplay(String(result));
      setPrevValue(null);
      setOperator(null);
      setWaitingForNewValue(true);
    }
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(`${display  }.`);
    }
  };

  const buttonStyle = {
    width: '80px',
    height: '80px',
    fontSize: '28px',
    border: 'none',
    borderRadius: '50%',
    margin: '5px',
  };

  const orange = '#f1a33c';
  const dark = '#333333';
  const lightGray = '#a5a5a5';

  const renderButton = (label, onClick, bgColor = dark, textColor = 'white', customStyle = {}) => (
    <button
      type="button"
      onClick={onClick}
      style={{
        ...buttonStyle,
        backgroundColor: bgColor,
        color: textColor,
        ...customStyle,
      }}
    >
      {label}
    </button>
  );

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        minHeight: '100vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1 className="text-white">React Calculator</h1>

      <div
        style={{
          backgroundColor: '#000',
          padding: '20px',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '350px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: '48px',
            textAlign: 'right',
            paddingRight: '10px',
            minHeight: '60px',
            marginBottom: '20px',
          }}
        >
          {display}
        </div>

        {/* Button Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {renderButton('AC', handleClear, lightGray, '#000')}
          {renderButton('±', () => setDisplay((parseFloat(display) * -1).toString()), lightGray, '#000')}
          {renderButton('%', () => setDisplay((parseFloat(display) / 100).toString()), lightGray, '#000')}
          {renderButton('÷', () => handleOperatorClick('/'), orange)}

          {renderButton('7', () => handleNumberClick('7'))}
          {renderButton('8', () => handleNumberClick('8'))}
          {renderButton('9', () => handleNumberClick('9'))}
          {renderButton('×', () => handleOperatorClick('*'), orange)}

          {renderButton('4', () => handleNumberClick('4'))}
          {renderButton('5', () => handleNumberClick('5'))}
          {renderButton('6', () => handleNumberClick('6'))}
          {renderButton('−', () => handleOperatorClick('-'), orange)}

          {renderButton('1', () => handleNumberClick('1'))}
          {renderButton('2', () => handleNumberClick('2'))}
          {renderButton('3', () => handleNumberClick('3'))}
          {renderButton('+', () => handleOperatorClick('+'), orange)}

          {/* 0 button spans two columns */}
          <button
            type="button"
            onClick={() => handleNumberClick('0')}
            style={{
              gridColumn: 'span 2',
              height: '80px',
              fontSize: '28px',
              backgroundColor: dark,
              color: 'white',
              border: 'none',
              borderRadius: '40px',
              margin: '5px',
              textAlign: 'left',
              paddingLeft: '28px',
            }}
          >
            0
          </button>
          {renderButton('.', handleDecimal)}
          {renderButton('=', handleEqual, orange)}
        </div>
      </div>
    </div>
  );
}

export default Home;
