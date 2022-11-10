import { writable } from 'svelte/store';

const stored = localStorage.clampValues ? JSON.parse(localStorage.clampValues) : ''
const currentUnityStored = localStorage.currentUnity ? localStorage.currentUnity : ''
const defaultValuesStored = localStorage.defaultValues ? JSON.parse(localStorage.defaultValues) : ''

export const value = writable(0);
export const currentUnity = writable(currentUnityStored || "px");
export const clampValues = writable(stored || {valor: 0, ratio: 1366, minimo: 950, maximo: 1920})
export const defaultValues = writable(defaultValuesStored || {rem: 16, vw: 1920, vh: 1080})

currentUnity.subscribe((value) =>localStorage.currentUnity = value )
clampValues.subscribe((value) => localStorage.clampValues = JSON.stringify(value))
defaultValues.subscribe((value) => localStorage.defaultValues = JSON.stringify(value))