import React, { useEffect, useRef } from "react";
import "./Category.scss";

const Category = () => {
  const categoryRef = useRef<HTMLDivElement>(null);
  const treeRef = useRef<HTMLUListElement>(null);
  const isClicked = useRef<boolean>(false);
  const coordinates = useRef<{
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  }>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    if (!categoryRef || !treeRef) return;

    const category = categoryRef.current;
    const tree = treeRef.current;

    function onMouseDown(e: MouseEvent) {
      isClicked.current = true;
      coordinates.current.startX = e.clientX;
      coordinates.current.startY = e.clientY;
    }
    function onMouseUp(e: MouseEvent) {
      isClicked.current = false;
      coordinates.current.lastX = tree?.offsetLeft || 0;
      coordinates.current.lastY = tree?.offsetTop || 0;
    }

    function onMouseMove(e: MouseEvent) {
      if (isClicked.current && tree) {
        const lastXx = coordinates.current.lastX || 0;
        const lastYy = coordinates.current.lastY || 0;

        const newX = e.clientX - coordinates.current.startX + lastXx;
        const newY = e.clientY - coordinates.current.startY + lastYy;

        if (tree) {
          tree.style.left = `${newX}px`;
          tree.style.top = `${newY}px`;
        }
      }
    }

    tree?.addEventListener("mousedown", onMouseDown);
    tree?.addEventListener("mouseup", onMouseUp);
    category?.addEventListener("mousemove", onMouseMove);
    category?.addEventListener("mouseleave", onMouseUp);

    function cleanUp() {
      tree?.removeEventListener("mousedown", onMouseDown);
      tree?.removeEventListener("mouseup", onMouseUp);
      category?.removeEventListener("mousemove", onMouseMove);
      category?.removeEventListener("mouseleave", onMouseUp);
    }
    return cleanUp;
  }, []);

  return (
    <div ref={categoryRef} className="categories">
      <ul ref={treeRef} className="tree">
        <li>
          <div className="category">
            <span>Categories</span>
            <button className="add">+</button>
          </div>
          <ul>
            <li>
              <div className="category-input">
                <input type="text" placeholder="Category" />
                <button id="add">√</button> <button id="edit">✎</button>{" "}
                <button id="delete">×</button>
              </div>
              <ul>
                <li>
                  <div className="category-input">
                    <input type="text" placeholder="Category" />{" "}
                    <button id="add">√</button> <button id="edit">✎</button>{" "}
                    <button id="delete">×</button>
                  </div>
                  <ul>
                    <li>
                      <div className="category-input">
                        <input type="text" placeholder="Category" />{" "}
                        <button id="add">√</button> <button id="edit">✎</button>{" "}
                        <button id="delete">×</button>
                      </div>
                    </li>
                  </ul>
                </li>
                <li>
                  <div className="category-input">
                    <input type="text" placeholder="Category" />{" "}
                    <button id="add">√</button> <button id="edit">✎</button>{" "}
                    <button id="delete">×</button>
                  </div>
                </li>
              </ul>
            </li>
            <li>
              <div className="category-input">
                <input type="text" placeholder="Category" />
                <button id="add">√</button> <button id="edit">✎</button>{" "}
                <button id="delete">×</button>
              </div>
              <ul>
                <li>
                  <div className="category-input">
                    <input type="text" placeholder="Category" />{" "}
                    <button id="add">√</button> <button id="edit">✎</button>{" "}
                    <button id="delete">×</button>
                  </div>
                  <ul>
                    <li>
                      <div className="category-input">
                        <input type="text" placeholder="Category" />{" "}
                        <button id="add">√</button> <button id="edit">✎</button>{" "}
                        <button id="delete">×</button>
                      </div>
                    </li>
                    <li>
                      <div className="category-input">
                        <input type="text" placeholder="Category" />{" "}
                        <button id="add">√</button> <button id="edit">✎</button>{" "}
                        <button id="delete">×</button>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Category;
