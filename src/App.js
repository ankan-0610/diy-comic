import "./App.css";
import Create from "./Create.js";
import React, { useState } from "react";

function App() {
  const [generatedImages, setGeneratedImages] = useState([]);

  return (
    <div>
      <div className="app-container">
        <div className="content">
          <h1>DIY COMIC APP</h1>
          <h2>Welcome to the AI-powered Comic App</h2>
        </div>
      </div>
      <Create onImagesGenerated={setGeneratedImages} />

    </div>
  );
}

export default App;