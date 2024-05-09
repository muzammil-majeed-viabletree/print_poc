import logo from "./logo.svg";
import { useReactToPrint } from "react-to-print";
import "./App.css";
import { useRef } from "react";

function App() {
  const printRef = useRef();

  const onClick = () => {
    if (printRef.current) {
      printRef?.current?.print?.();
    }
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <div className="App">
      <header className="App-header" ref={printRef}>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      <a onClick={handlePrint}>Learn React</a>
    </div>
  );
}

export default App;
