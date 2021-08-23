import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchNews,
  selectFilter,
  selectOrder,
  setFilterEditor,
  setFilterCategory,
  setFilterDirect,
  setNewsOrder,
} from "../search/searchSlice";

import { data } from "../search/dummy";

import styles from "./FilterSidebar.module.css";
import { ReactComponent as FilterRegularIcon } from "./assets/filterbar/filter-regular.svg";
import { ReactComponent as FilterLightIcon } from "./assets/filterbar/filter-light.svg";
import { ReactComponent as CategoryIcon } from "./assets/filterbar/Group-1552.svg";
import { ReactComponent as SortIcon } from "./assets/filterbar/sort-amount-down-alt-light.svg";
import { ReactComponent as EditorIcon } from "./assets/filterbar/user-circle-solid.svg";

const FilterSidebar = () => {
  const dispatch = useDispatch();

  const filter = useSelector(selectFilter);
  const sorder = useSelector(selectOrder);

  const [category, setCategory] = useState(filter.category);
  const [editor, setEditor] = useState(filter.editor);
  const [order, setOrder] = useState(sorder);

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.title}`}>
        <FilterRegularIcon />
        <div>Sonuçları Filtrele</div>
      </div>
      <div className={`${styles.label}`}>
        <CategoryIcon />
        <span>Kategoriler</span>
      </div>
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      >
        <option value="">Tümü</option>
        {Object.keys(data.categoriesMap).map((key) => (
          <option key={key} value={key}>
            {data.categoriesMap[key]}
          </option>
        ))}
      </select>
      <div className={`${styles.label}`}>
        <SortIcon />
        <span>Sıralama</span>
      </div>
      <select
        value={order}
        onChange={(e) => {
          setOrder(e.target.value);
        }}
      >
        <option value="latest">Yeniden Eskiye</option>
        <option value="reverse-latest">Eskiden Yeniye</option>
      </select>
      <div className={`${styles.label}`}>
        <EditorIcon />
        <span>Editör</span>
      </div>
      <select
        value={editor}
        onChange={(e) => {
          setEditor(e.target.value);
        }}
      >
        <option value="">Tümü</option>
        {Object.keys(data.authorsMap).map((key) => (
          <option key={key} value={key}>
            {data.authorsMap[key]}
          </option>
        ))}
      </select>
      <div className={`flex-row justify-end`}>
        <button
          onClick={() => {
            dispatch(setFilterDirect(""));
            dispatch(setFilterCategory(category));
            dispatch(setFilterEditor(editor));
            dispatch(setNewsOrder(order));
            dispatch(fetchNews());
          }}
        >
          <FilterLightIcon />
          Filtrele
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
