import { createEffect } from "solid-js";
import { createStore, SetStoreFunction, Store } from "solid-js/store";

export function createLocalStorage<T extends object>(name: string, init: T): [Store<T>, SetStoreFunction<T>] {
    const localState = localStorage.getItem(name);
    const [state, setState] = createStore<T>(localState ? JSON.parse(localState) : init);
    createEffect(() => localStorage.setItem(name, JSON.stringify(state)));
    return [state, setState];
}