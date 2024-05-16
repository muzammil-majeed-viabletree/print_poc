const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const { print } = require("pdf-to-printer");
const axios = require("axios");
const fs = require("fs");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,

    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true, // add this
      preload: path.join(__dirname, "preload.js"),
    },
  });
  // win.webContents.print({silent: true})

  win.loadURL("http://localhost:3000"); // Adjust port if needed

  const printOptions = {
    silent: true,
    printBackground: true,
    color: true,
    margin: {
      marginType: "printableArea",
    },
    landscape: false,
    pagesPerSheet: 1,
    collate: false,
    copies: 1,
    header: "Page header",
    footer: "Page footer",
    deviceName: "HP LaserJet M14-M17",
  };

  // ipcMain.handle("printComponent", (event, url) => {
  //   console.log({ url });
  //   let win = new BrowserWindow({ show: false });
  //   win.loadURL(url);

  //   win.webContents.on("did-finish-load", () => {
  //     win.webContents.print(printOptions, (success, failureReason) => {
  //       console.log("Print Initiated in Main...");
  //       if (!success) console.log(failureReason);
  //     });
  //   });
  //   return "done in main";
  // });

  ipcMain.handle("printComponent", async (event, url) => {
    console.log({ url });

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/pdf",
          "Content-Type": "application/pdf",
        },
        responseType: "blob", // Request the PDF as a blob
      });

      console.log({ response });

      const res = await response.json();

      let tmpFile = __dirname + "/tmp_pdf.pdf";
      fs.writeFileSync(tmpFile, res.data, { encoding: "binary" });
      print(tmpFile, res.data, {
        printer: "HP LaserJet M14-M17",
        silent: true,
        printDialog: false,
      });
      return "done in main";
    } catch (error) {
      console.error("errror ----", error);
      return "Failed in main";
    }
  });

  ipcMain.handle("printStickerComponent", async (event, url) => {
    let win = new BrowserWindow({ show: false });
    win.loadURL(URL.createObjectURL(url));

    const printers = await win.webContents.getPrintersAsync();

    console.log("all Printers ===>>>", JSON.stringify(printers));

    const printOptions = {
      silent: false,
      printBackground: true,
      color: true,
      margin: {
        marginType: "printableArea",
      },
      pagesPerSheet: 1,
      collate: false,
      copies: 1,
      deviceName: "POS-80(copy of 1)",
    };

    win.webContents.on("did-finish-load", () => {
      win.webContents.print(printOptions, (success, failureReason) => {
        console.log("Print Initiated in Main...");
        if (!success) console.log(failureReason);
      });
    });
    return "done in main";
  });

  win.webContents.on("ipc-message", (event, message) => {
    if (message === "silent-print") {
      console.log("print event triggered");
      const options = {
        silent: true,
        printBackground: true,
      };

      win.webContents.print(options, (error) => {
        if (error) {
          console.error("onprint error ===>>", error);
        }
      });
    }
  });

  win.webContents.openDevTools(); // Enable DevTools in development mode

  win.on("closed", () => {
    win = null;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
