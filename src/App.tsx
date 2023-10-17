import { useRef } from "react";
import "./App.scss";
import Category from "./components/categories/Category";
import Header from "./components/header/Header";

function App() {
  const centerRef = useRef<boolean>(false);
  function center() {
    centerRef.current = true;
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
