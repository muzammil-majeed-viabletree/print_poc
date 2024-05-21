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

  win.loadURL("https://poc-electron-view.web.app"); // Adjust port if needed

  const printOptions = {
    silent: true,
    printBackground: true,
    color: false,
    margin: {
      marginType: "printableArea",
    },
    landscape: false,
    pagesPerSheet: 1,
    collate: false,
    copies: 1,
    deviceName: "HP LaserJet M14-M17",
  };

  // ipcMain.handle("printComponent", (event, url) => {
  // console.log({ url });
  // let win = new BrowserWindow({ show: true });
  // win.loadURL(url);

  // win.webContents.on("did-finish-load", () => {
  //   // win.webContents.print(printOptions, (success, failureReason) => {
  //   //   console.log("Print Initiated in Main...");
  //   //   if (!success) console.log(failureReason);
  //   // });
  // });
  // return "done in main";
  // });

  ipcMain.handle("printComponent", async (event, url) => {
    console.log({ url });
    // const blob = new Blob([url], { type: "text/html" });
    // const objectUrl = URL.createObjectURL(blob);
    let win = new BrowserWindow({ show: false });
    win.loadURL(url);
    // win.loadURL(__dirname + "/example_pdf.pdf");

    win.webContents.on("did-finish-load", () => {
      win.webContents.print(printOptions, (success, failureReason) => {
        console.log("Print Initiated in Main...");
        if (!success) console.log(failureReason);
      });
    });

    return "done in main";
  });

  ipcMain.handle("printStickerComponent", async (event, url) => {
    let win = new BrowserWindow({
      show: false,
      height: 250,
      width: 250,
    });
    // win.loadURL(URL.createObjectURL(url));

    // win.loadURL(__dirname + "/example_pdf.pdf");
    win.loadURL(url);

    const printers = await win.webContents.getPrintersAsync();

    console.log("all Printers ===>>>", JSON.stringify(printers));

    const printOptions = {
      silent: true,
      printBackground: true,
      color: true,
      pagesPerSheet: 1,
      collate: false,
      copies: 1,
      deviceName: "POS-80(copy of 1)",
      // pageSize: {
      //   height: 4500000,
      //   width: 4500000,
      // },
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
