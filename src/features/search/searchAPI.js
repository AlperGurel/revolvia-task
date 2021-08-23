import { data } from "./dummy.js";

export const fetchSearchResult = (keyword) => {
  const result = getDataFromJson(keyword);
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: result }), 2000)
  );
};

export const fetchNewsResult = (keyword) => {
  const result = getCardDataFromJson(keyword);
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: result }), 1)
  );
};

export const fetchRandom = () => {
  const result = getRandomDataFromJson();
  console.log(result);
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: result }), 1)
  );
};

const getTurkishDate = (datestr) => {
  const date = new Date(parseInt(datestr) * 1000);
  return date.toLocaleDateString("tr-TR", {
    month: "long",
    year: "numeric",
    day: "numeric",
  });
};

const getNewsByCategory = (title) => {
  const result = [];
  let categoryId = -1;
  data.categories.forEach((el) => {
    if (el.title == title) {
      categoryId = el.id;
    }
  });
  console.log("çağrıldım");
  data.content.forEach((el) => {
    if (el.category.includes(categoryId)) {
      result.push(el);
    }
  });
  return result;
};

const getNewsByEditor = (title) => {
  const result = [];
  let authorId = -1;
  data.authors.forEach((el) => {
    if (el.title == title) {
      authorId = el.id;
    }
  });
  data.content.forEach((el) => {
    if (el.author == authorId) {
      result.push(el);
    }
  });
  return result;
};

const getCardDataFromJson = (keyword) => {
  const normalKeyword = keyword.toLowerCase();
  const result = [];

  data.content.forEach((el) => {
    const normalTitle = el.title.toLowerCase();
    if (normalTitle.startsWith(normalKeyword)) {
      result.push({
        title: el.title,
        imageUrl: el.thumb.src,
        publishDateAsString: getTurkishDate(el.published),
      });
    }
  });

  data.categories.forEach((el) => {
    const normalTitle = el.title.toLowerCase();
    if (normalTitle.startsWith(normalKeyword)) {
      const haberler = getNewsByCategory(el.title);
      haberler.forEach((haber) => {
        result.push({
          title: haber.title,
          imageUrl: haber.thumb.src,
          publishDateAsString: getTurkishDate(haber.published),
        });
      });
    }
  });

  data.authors.forEach((el) => {
    const normalTitle = el.title.toLowerCase();
    if (normalTitle.startsWith(normalKeyword)) {
      const haberler = getNewsByEditor(el.title);
      haberler.forEach((haber) => {
        result.push({
          title: haber.title,
          imageUrl: haber.thumb.src,
          publishDateAsString: getTurkishDate(haber.published),
        });
      });
    }
  });

  return result;
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

const getRandomDataFromJson = () => {
  const result = [];
  for (let i = 0; i < 5; i++) {
    result.push(data.content[i].title);
  }
  return result;
};
