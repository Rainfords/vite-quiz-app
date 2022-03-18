import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
// Components
import { Quiz } from "@components/Quiz";
// Styles
import styles from "./App.module.scss";

const ErrorFallback = () => {
  return (
    <div role="alert">
      There was an error:{" "}
      <pre style={{ whiteSpace: "normal" }}>Something Wrong with API</pre>
    </div>
  );
};

function App() {
  return (
    <>
      <div className={styles.App}>
        <h1 className={styles.heading}>QUIZ</h1>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Quiz />
        </ErrorBoundary>
      </div>
    </>
  );
}

export default App;
