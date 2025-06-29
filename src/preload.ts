// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';
import type { BudgetEntry } from './InterfaceBudgetEntry';

//Expose a method to save JSON data to the main process
contextBridge.exposeInMainWorld('electronAPI', {
    saveJson: (year: number, data: BudgetEntry[]) => ipcRenderer.invoke('save-json', year, data),
    getSubmittedYears: () => ipcRenderer.invoke('get-submitted-years'),
    getYearReport: (year: number) => ipcRenderer.invoke('get-year-report', year),
});
