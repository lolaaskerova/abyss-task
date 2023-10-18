import React, { useEffect, useRef, useState } from "react";
import "./Category.scss";
import { CategoryInputs, SubCategoryInputs } from "../../types/Type";

const Category = () => {
  //draggable component functions
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

  // adding new category function

  const [inputValue, setInputValue] = useState<string>("");
  const [categories, setCategories] = useState<CategoryInputs[]>([]);
  const [categoriesItem, setCategoriesItem] = useState<SubCategoryInputs[]>([]);
  const [addCategory, setAddCategory] = useState<boolean>(false);
  const [subCategory, setSubCategory] = useState<boolean>(false);
  const [updateElementId, setUpdateElementId] = useState<number | null>(null);
  const [updateInput, setUpdateInput] = useState<string>("");

  useEffect(() => {
    const storedCategoriesString = localStorage.getItem("categories");
    const storedCategoriesItemString = localStorage.getItem("categoriesItem");

    const initialCategories: CategoryInputs[] = JSON.parse(
      storedCategoriesString || "[]"
    );

    const initialCategoriesItem: SubCategoryInputs[] = JSON.parse(
      storedCategoriesItemString || "[]"
    );

    setCategories(initialCategories);
    setCategoriesItem(initialCategoriesItem);
  }, []); // Load initial categories from localStorage

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function addCategoryClick() {
    setAddCategory(true);
    const newCategory: CategoryInputs = {
      title: inputValue,
      id: +categories.length + 1 + 100,
    };
    setCategories([...categories, newCategory]);
    localStorage.setItem(
      "categories",
      JSON.stringify([...categories, newCategory])
    );
    setInputValue("");
    setSubCategory(false);
  }

  function addSubCategoryClick() {
    setSubCategory(true);
    const newSubCategory: SubCategoryInputs = {
      title: inputValue,
      id: categoriesItem.length + 1,
    };
    setCategoriesItem([...categoriesItem, newSubCategory]);
    localStorage.setItem(
      "categoriesItem",
      JSON.stringify([...categoriesItem, newSubCategory])
    );
  }

  function deleteCategory(id: number) {
    const storedCategoriesString = localStorage.getItem("categories");
    const storedCategoriesItemString = localStorage.getItem("categoriesItem");

    const storedCategories = storedCategoriesString
      ? JSON.parse(storedCategoriesString)
      : [];
    const storedCategoriesItem = storedCategoriesItemString
      ? JSON.parse(storedCategoriesItemString)
      : [];

    const updatedCategoriesItem = storedCategoriesItem.filter(
      (e: any) => e.id !== id
    );
    setCategoriesItem(updatedCategoriesItem);

    const updatedCategories = storedCategories.filter((e: any) => e.id !== id);
    setCategories(updatedCategories);

    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    localStorage.setItem(
      "categoriesItem",
      JSON.stringify(updatedCategoriesItem)
    );
  }

  function updateElement(id: number) {
    // Kategori veya alt kategorinin bulunduğu diziyi belirle
    const isCategory = categories.some((e) => e.id === id);
    const targetArray = isCategory ? categories : categoriesItem;

    // Güncellenmiş diziyi oluştur
    const updatedArray = targetArray.map((item) =>
      item.id === id ? { ...item, title: updateInput } : item
    );

    // State'i güncelle
    if (isCategory) {
      setCategories(updatedArray as CategoryInputs[]);
    } else {
      setCategoriesItem(updatedArray as SubCategoryInputs[]);
    }

    // LocalStorage'ı güncelle
    localStorage.setItem(
      isCategory ? "categories" : "categoriesItem",
      JSON.stringify(updatedArray)
    );

    // Güncelleme işlemini sonlandır
    setUpdateElementId(null);
    setUpdateInput("");
  }

  return (
    <div ref={categoryRef} className="categories">
      <ul ref={treeRef} className="tree">
        <li>
          <div className="category">
            <span>Categories</span>
            <button onClick={() => addCategoryClick()} className="add">
              +
            </button>
          </div>
          <ul>
            {addCategory &&
              (subCategory ? (
                categoriesItem.map((item) => (
                  <li key={item.id}>
                    <div className="category-input">
                      {updateElementId === item.id ? (
                        <input
                          onKeyDown={(e) =>
                            e.key === "Enter" && updateElement(item.id)
                          }
                          onChange={(e) => setUpdateInput(e.target.value)}
                          className="item"
                          type="text"
                          style={{ color: "red" }}
                        />
                      ) : (
                        <div className="item">{item.title}</div>
                      )}
                      {updateElementId === item.id ? (
                        <>
                          <button
                            onClick={() => updateElement(item.id)}
                            id="add"
                          >
                            √
                          </button>
                        </>
                      ) : (
                        <>
                          {" "}
                          <button
                            id="edit"
                            onClick={() => setUpdateElementId(item.id)}
                          >
                            ✎
                          </button>{" "}
                          <button
                            id="delete"
                            onClick={() => deleteCategory(item.id)}
                          >
                            ×
                          </button>
                        </>
                      )}
                    </div>
                  </li>
                ))
              ) : (
                <li>
                  <div className="category-input">
                    <input
                      type="text"
                      placeholder="Category"
                      value={inputValue}
                      onChange={handleChange}
                    />
                    <button onClick={() => addSubCategoryClick()} id="add">
                      √
                    </button>{" "}
                    <button id="edit">✎</button> <button id="delete">×</button>
                  </div>
                </li>
              ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Category;
