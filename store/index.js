import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import { useMemo } from "react";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

let store;

// persist reducer
const persistConfig = {
  key: "primary",
  storage,
  whitelist: ["cart", "auth"], // place to select which state you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// initial states here
const initalState = {};

// middleware
const middleware = [thunk];

// creating store
function makeStore(initialState = initalState) {
  return createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? makeStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

// assigning store to next wrapper
export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
