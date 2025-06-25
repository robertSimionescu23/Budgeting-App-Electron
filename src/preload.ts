// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

//Expose a method to save JSON data to the main process
contextBridge.exposeInMainWorld('electronAPI', {
    saveJson: (filename: string, data: any) => ipcRenderer.invoke('save-json', filename, data),
    getUserDataPath: () => ipcRenderer.invoke('get-user-data-path')
});
