import React, { useState } from "react";

import styles from "./Search.module.css";
import { ReactComponent as SearchIcon } from "./assets/search-light.svg";
import { ReactComponent as RandomIcon } from "./assets/random-light.svg";
import { ReactComponent as CloseIcon } from "./assets/times-light.svg";

const Search = () => {
  const [searchStatus, setSearchStatus] = useState("idle");
  const onSearchFocus = () => {
    setSearchStatus("focused");
  };

  const stateClass = searchStatus == "focused" ? styles.focused : "";

  const searchButtonColor = () => {
    const colorMap = {
      idle: "#ff3439",
      focused: "white",
    };
    return colorMap[searchStatus];
  };

  const handleSearchClick = () => {
    if (searchStatus == "idle") {
      setSearchStatus("focused");
    }
  };

  return (
    <div className={`${styles.container} ${stateClass}`}>
      <div className={`${styles.topbar} ${stateClass} flex-row align-center`}>
        <div
          className={`${styles.iconcontainer} ${styles.small} ${stateClass}`}
          onClick={() => {
            setSearchStatus("idle");
          }}
        >
          <CloseIcon />
        </div>
        <div className={`${styles.searchbar} ${stateClass}`}>
          <input onClick={onSearchFocus} placeholder="Ara"></input>
          <div
            className={`${styles.iconcontainer} ${styles.searchicon} ${stateClass}`}
            onClick={() => {
              handleSearchClick();
            }}
          >
            <SearchIcon color={searchButtonColor()} />
          </div>
        </div>
        <div className={styles.iconcontainer}>
          <RandomIcon />
        </div>
        <div className={styles.suggestioncontainer}>sdf</div>
      </div>
    </div>
  );
};

export default Search;
