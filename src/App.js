import React from "react";
import { useSelector } from "react-redux";

import { selectPage } from "./features/search/searchSlice";
import Search from "./features/search/Search";
import { ResultPage } from "./features/result/Result";
import "./App.css";

function App() {
  const page = useSelector(selectPage);
  return (
    <div className="App">{page === "search" ? <Search /> : <ResultPage />}</div>
  );
}

export default App;
