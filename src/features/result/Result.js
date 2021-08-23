import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectKeyword,
  setKeyword,
  selectNews,
  fetchNews,
} from "../search/searchSlice";

import FilterSidebar from "./FilterSidebar";

import styles from "./Result.module.css";
import { ReactComponent as SearchIcon } from "./assets/search-light.svg";
import { ReactComponent as RandomIcon } from "./assets/random-light.svg";
import { ReactComponent as ClearIcon } from "./assets/delete.svg";
import { ReactComponent as SortIcon } from "./assets/sort-amount-down-alt-light.svg";
import { ReactComponent as MiniClearIcon } from "./assets/times-light.svg";
import { ReactComponent as DateIcon } from "./assets/Group327.svg";
import { ReactComponent as CategoryIcon } from "./assets/Ellipse152.svg";
import { ReactComponent as EditorIcon } from "./assets/user-circle-solid.svg";
import { ReactComponent as CardIcon } from "./assets/cardicon.svg";

export const ResultPage = () => {
  return (
    <div className={`${styles.container}`}>
      <SearchBar />
      <Shuffle />
      <Filters />
      <FilterSidebar />
      <ResultContainer />
    </div>
  );
};

const SearchBar = () => {
  const dispatch = useDispatch();
  const keyword = useSelector(selectKeyword);
  return (
    <div className={`${styles.searchbar}`}>
      <input
        value={keyword}
        placeholder="Ara"
        onChange={(e) => {
          dispatch(setKeyword(e.target.value));
        }}
      ></input>
      <div className={`flex-row align-center`}>
        <div
          className={`${styles.iconcontainer} no-shadow`}
          onClick={() => {
            dispatch(setKeyword(""));
          }}
        >
          <ClearIcon />
        </div>
        <div
          className={`${styles.iconcontainer} ${styles.searchicon} `}
          onClick={() => {}}
        >
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};

const Shuffle = () => {
  return (
    <div className={`${styles.iconcontainer} ${styles.randomicon}`}>
      <RandomIcon />
    </div>
  );
};

const Filters = () => {
  return (
    <div className={`${styles.filters}`}>
      <div className={`${styles.filteritem}`}>
        <div className={`flex-row align-center`}>
          <SortIcon />
          <span>Yeniden Eskiye</span>
          <MiniClearIcon />
        </div>
      </div>
      <div className={`${styles.filteritem}`}>
        <div className={`flex-row align-center`}>
          <CategoryIcon />
          <span>Tüm Kategoriler</span>
          <MiniClearIcon />
        </div>
      </div>
      <div className={`${styles.filteritem}`}>
        <div className={`flex-row align-center`}>
          <EditorIcon />
          <span>Tüm Editörler</span>
          <MiniClearIcon />
        </div>
      </div>
    </div>
  );
};

const ResultContainer = () => {
  const news = useSelector(selectNews);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <div className={`${styles.resultcontainer}`}>
      <h4>{news.length} sonuç:</h4>
      <div>
        <div className={`${styles.cardscontainer}`}>
          {news.map((el) => {
            return <ResultCard data={el} />;
          })}
        </div>
      </div>
    </div>
  );
};

const ResultCard = (props) => {
  const { title, publishDateAsString, imageUrl } = props.data;
  return (
    <div className={`${styles.resultcard}`}>
      <div className={`${styles.imagecontainer}`}>
        <img src={imageUrl} alt="" />
      </div>
      <p>{title}</p>
      <div
        style={{
          position: "absolute",
          bottom: "15px",
          width: "90%",
        }}
      >
        <div className={`flex-row justify-between align-center`}>
          <CardIcon />
          <span>{publishDateAsString}</span>
        </div>
      </div>
    </div>
  );
};
