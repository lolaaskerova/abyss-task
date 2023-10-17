import { useRef, useState } from "react";
import "./App.scss";
import Category from "./components/categories/Category";
import Header from "./components/header/Header";

interface BodyStyle extends CSSStyleDeclaration {
  zoom: string;
}

function App() {
  const centerRef = useRef<boolean>(false);
  const [zoom, setZoom] = useState<number>(100);
  //center component function
  function center() {
    centerRef.current = true;
    window.location.reload();
  }

  //zoom in & zoom out function
  const zoomIn = () => {
    const newZoom = zoom + 10;
    if (newZoom <= 150) {
      setZoom(newZoom);
      updateZoom(newZoom);
    }
  };

  // Zoom out function
  const zoomOut = () => {
    const newZoom = zoom - 10;
    if (newZoom >= 20) {
      setZoom(newZoom);
      updateZoom(newZoom);
    }
  };

  // Update zoom for all elements with the specified class name
  const updateZoom = (newZoom: number) => {
    const categoriesList = document.getElementsByClassName("category-part");
    for (let i = 0; i < categoriesList.length; i++) {
      const categories = categoriesList[i];
      const bodyStyle = (categories as HTMLElement).style as BodyStyle;
      bodyStyle.zoom = `${newZoom}%`;
    }
  };

  return (
    <div className="App">
      <Header
        center={center}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        zoom={zoom}
        updateZoom={updateZoom}
      />
      <div className="category-part">
        <Category />
      </div>
    </div>
  );
}

export default App;
