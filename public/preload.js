// const {contextBridge, ipcRenderer} =require("electron")

// // contextBridge.exposeInMainWorld("ipcRenderer", {
// //     send: (channel, args) => ipcRenderer.send(channel, args),
// //     on: (channel, listener) => ipcRenderer.on(channel, listener),
// // })

// // As an example, here we use the exposeInMainWorld API to expose the IPC renderer
// // to the main window. They'll be accessible at "window.ipcRenderer".
// process.once("loaded", () => {
//     contextBridge.exposeInMainWorld("ipcRenderer", ipcRenderer);
//   });

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  printComponent: async (url, callback) => {
    console.log({ url });
    const pdfUrl = URL.createObjectURL(url);
    console.log({ pdfUrl });
    let response = await ipcRenderer.invoke("printComponent", pdfUrl);
    callback(response);
  },
  printStickerComponent: async (url, callback) => {
    let response = await ipcRenderer.invoke("printStickerComponent", url);
    callback(response);
  },
});
