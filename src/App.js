import logo from "./logo.svg";
import { useReactToPrint } from "react-to-print";
import "./App.css";
import { useRef } from "react";
import FullPagePdf from "./FullPagePdf";
import { pdf } from "@react-pdf/renderer";
import StickerPdf from "./stickerPdf";
// import { ipcRenderer } from "electron";

function App() {
  const printRef = useRef();
  const iframeRef = useRef();
  const stickerRef = useRef();

  const onClick = async () => {
    if (!window?.electronAPI?.printComponent) {
      // window.print();
      const pdfUrl = await pdf(myDocRender).toBlob();
      console.log({ pdfUrl });
      const pdfURL = URL.createObjectURL(pdfUrl);

      iframeRef.current.src = pdfURL;
      iframeRef.current.onload = () => {
        console.log("Iframe loaded.....");
        iframeRef.current.contentWindow.print(); // Trigger printing
        URL.revokeObjectURL(pdfURL); // Clean up the object URL
      };

      return;
    }

    return new Promise(async () => {
      console.log("forwarding print request to the main process...");

      const pdfUrl = await pdf(myDocRender).toBlob();
      console.log({ pdfUrl });
      // const pdfURL = URL.createObjectURL(pdfUrl);

      // console.log({ pdfURL });

      console.log(window.electronAPI, pdfUrl);
      window?.electronAPI?.printComponent(pdfUrl, (response) => {
        console.log("Main: ", response);
      });
    });
  };

  const onStickerPrint = async () => {
    const pdfUrl = await pdf(myStickerDocRender).toBlob();

    console.log({ pdfUrl });

    const pdfURL = URL.createObjectURL(pdfUrl);

    if (!window?.electronAPI?.printComponent) {
      stickerRef.current.src = pdfURL;
      stickerRef.current.onload = () => {
        stickerRef.current.contentWindow.print(); // Trigger printing
        URL.revokeObjectURL(pdfURL); // Clean up the object URL
      };

      return;
    }

    return new Promise(async () => {
      console.log("forwarding print request to the main process...");

      window?.electronAPI?.printStickerComponent(pdfUrl, (response) => {
        console.log("Main: ", response);
      });
    });
  };

  const handleTriggerBoth = () => {
    onClick();
    onStickerPrint();
  };

  const myDocRender = <FullPagePdf />;
  const myStickerDocRender = <StickerPdf />;

  return (
    <div className="App">
      <header className="App-header" ref={printRef}>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      <p onClick={onClick}>Print</p>
      <p onClick={onStickerPrint}>Print Sticker</p>

      <p onClick={handleTriggerBoth}>Print both</p>

      <iframe ref={iframeRef} style={{ display: "none" }} />
      <iframe ref={stickerRef} style={{ display: "none" }} />
    </div>
  );
}

export default App;
