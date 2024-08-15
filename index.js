//index.js
import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";

// Must be exported or Fast Refresh won't update the context
export function App() {
  const ctx = require.context("./", true, /\.\/app\/.*\.tsx?$/);
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);