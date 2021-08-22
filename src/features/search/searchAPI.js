import { data } from "./dummy.js";

export const fetchSearchResult = (keyword) => {
  const result = getDataFromJson(keyword);
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: result }), 2000)
  );
};

const getDataFromJson = (keyword) => {
  const normalKeyword = keyword.toLowerCase();
  const result = [];

  data.content.forEach((el) => {
    const normalTitle = el.title.toLowerCase();
    if (normalTitle.startsWith(normalKeyword)) {
      result.push({
        text: el.title,
        labels: [],
      });
    }
  });

  data.categories.forEach((el) => {
    const normalTitle = el.title.toLowerCase();
    if (normalTitle.startsWith(normalKeyword)) {
      result.push({
        text: el.title,
        labels: ["Kategori"],
      });
    }
  });

  data.authors.forEach((el) => {
    const normalTitle = el.title.toLowerCase();
    if (normalTitle.startsWith(normalKeyword)) {
      result.push({
        text: el.title,
        labels: ["Editör"],
      });
    }
  });

  return result;
};
