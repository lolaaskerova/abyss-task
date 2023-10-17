import { useState } from "react";
import "./App.scss";
import Category from "./components/categories/Category";
import Header from "./components/header/Header";

function App() {
  const [centered, setCentered] = useState<boolean>(false);
  function center() {
    setCentered(true);
    window.location.reload();
  }
  return (
    <div className="App">
      <Header center={center} />
      <Category />
    </div>
  );
}

export default App;
