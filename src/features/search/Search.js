import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loader-spinner";
import {
  fetchResults,
  selectSearchResult,
  selectSearchStatus,
  selectKeyword,
  setKeyword,
  setPage,
  selectLatest,
  fetchLatest,
} from "./searchSlice";

import styles from "./Search.module.css";
import { ReactComponent as SearchIcon } from "./assets/search-light.svg";
import { ReactComponent as RandomIcon } from "./assets/random-light.svg";
import { ReactComponent as CloseIcon } from "./assets/times-light.svg";
import { ReactComponent as ChevronIcon } from "./assets/chevron-up-light.svg";
import { ReactComponent as ClearIcon } from "./assets/delete.svg";

const Search = () => {
  const dispatch = useDispatch();

  const keyword = useSelector(selectKeyword);
  const [searchStatus, setSearchStatus] = useState("idle");
  const apiSearchStatus = useSelector(selectSearchStatus);

  const stateClass = () => {
    if (searchStatus == "focused") {
      return styles.focused;
    } else if (searchStatus == "typingError") {
      return `${styles.focused} ${styles.typingerror}`;
    } else if (searchStatus == "typing") {
      return `${styles.focused} ${styles.typing}`;
    }
  };

  const searchButtonColor = () => {
    const colorMap = {
      idle: "#ff3439",
      focused: "white",
      typing: "#268AFF",
      typingerror: "white",
    };
    return colorMap[searchStatus];
  };

  const handleSearchClick = () => {
    if (searchStatus === "idle") {
      setSearchStatus("focused");
    }
  };

  const getTitle = () => {
    if (searchStatus === "focused") {
      return "son eklenenler";
    } else if (searchStatus === "typingError") {
      return "aramak için en az 3 harf girin";
    } else if (searchStatus === "typing") {
      return `"${keyword}" ile başlayan arama önerileri `;
    }
  };

  return (
    <div className={`${styles.container} ${stateClass()}`}>
      <div className={`${styles.topbar} ${stateClass()} flex-row align-center`}>
        <div
          className={`${styles.iconcontainer} ${styles.small} ${stateClass()}`}
          onClick={() => {
            setSearchStatus("idle");
            dispatch(setKeyword(""));
          }}
        >
          <CloseIcon />
        </div>
        <div className={`${styles.searchbar} ${stateClass()}`}>
          <input
            value={keyword}
            onClick={handleSearchClick}
            onChange={(e) => {
              dispatch(setKeyword(e.target.value));

              if (e.target.value.length == 0) {
                setSearchStatus("focused");
              } else if (e.target.value.length < 3) {
                setSearchStatus("typingError");
              } else {
                setSearchStatus("typing");
                dispatch(fetchResults());
              }
            }}
            placeholder="Ara"
          ></input>
          <div className={`flex-row align-center`}>
            {searchStatus === "typing" && (
              <div
                className={`${styles.iconcontainer} no-shadow`}
                onClick={() => {
                  dispatch(setKeyword(""));
                  setSearchStatus("focused");
                }}
              >
                <ClearIcon />
              </div>
            )}

            <div
              className={`${styles.iconcontainer} ${
                styles.searchicon
              } ${stateClass()}`}
              onClick={() => {
                handleSearchClick();
                if (searchStatus === "typing") {
                  dispatch(setPage("result"));
                }
              }}
            >
              <SearchIcon color={searchButtonColor()} />
            </div>
          </div>
          <div className={`${styles.suggestioncontainer} ${stateClass()}`}>
            <div className={`${styles.content}`}>
              <div className={`flex-row justify-end`}>
                <span className={`${styles.title}`}>{getTitle()}</span>
              </div>
              {apiSearchStatus === "loading" && <DotsLoader />}
              {apiSearchStatus === "failed" && searchStatus === "typing" && (
                <div>sonuç bulunamadı</div>
              )}
              {searchStatus === "focused" && <Suggestions />}
              {searchStatus === "typing" && <Results />}
            </div>
          </div>
        </div>
        <div className={styles.iconcontainer}>
          <RandomIcon />
        </div>
      </div>
    </div>
  );
};

const DotsLoader = () => {
  return (
    <div className="flex-row justify-center">
      <Loader type="ThreeDots" color="#DBDBDB" height={30} width={30} />
    </div>
  );
};

const Suggestions = () => {
  const dispatch = useDispatch();
  useState(() => {
    dispatch(fetchLatest());
  }, [dispatch]);
  const latest = useSelector(selectLatest);
  return (
    <>
      {" "}
      {latest.map((el, index) => {
        return (
          <div key={index} className={`${styles.suggestion}`}>
            <div>
              <span>{el}</span>
            </div>
            <div>
              <ChevronIcon />
            </div>
          </div>
        );
      })}
    </>
  );
};

const Results = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchResults());
  }, []);

  const data = useSelector(selectSearchResult);

  return (
    <>
      {data.map((el) => {
        return (
          <div key={el.text} className={`${styles.result}`}>
            {el.text}
            {el.labels.map((label) => {
              return (
                <span key={label} className={`${styles.label}`}>
                  <span></span> {label}
                </span>
              );
            })}
          </div>
        );
      })}
      <div>
        <button
          onClick={() => {
            dispatch(setPage("result"));
          }}
        >
          <SearchIcon />
          Ara
        </button>
      </div>
    </>
  );
};

export default Search;
