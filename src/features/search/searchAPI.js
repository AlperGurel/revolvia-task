import { data } from "./dummy.js";

export const fetchResult = (filter, direction) => {
  const filtered = filterResult(filter, data.content);
  const sorted = orderResult(direction, filtered);
  const result = normalizeResult(sorted);
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: result }), 1)
  );
};

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
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: result }), 1)
  );
};

export const fetchSingleNew = (id) => {
  const result = getSingleNewFromJson(id);
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: result }), 1)
  );
};

const getCardDataFromJson = (keyword) => {
  const normalKeyword = keyword.toLowerCase();
  const result = [];

  data.content.forEach((el) => {
    const normalTitle = el.title.toLowerCase();
    if (normalTitle.startsWith(normalKeyword)) {
      result.push({
        id: el.id,
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

  return removeDuplicate(result);
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
        id: el.id,
      });
    }
  });

  data.categories.forEach((el) => {
    const normalTitle = el.title.toLowerCase();
    if (normalTitle.startsWith(normalKeyword)) {
      result.push({
        text: el.title,
        labels: ["Kategori"],
        id: el.id,
      });
    }
  });

  data.authors.forEach((el) => {
    const normalTitle = el.title.toLowerCase();
    if (normalTitle.startsWith(normalKeyword)) {
      result.push({
        text: el.title,
        labels: ["Editör"],
        id: el.id,
      });
    }
  });

  return result;
};

const getRandomDataFromJson = () => {
  const result = [];
  for (let i = 0; i < 5; i++) {
    result.push({
      title: data.content[i].title,
      id: data.content[i].id,
    });
  }
  return result;
};

const getSingleNewFromJson = (id) => {
  const result = [];
  data.content.forEach((el) => {
    if (el.id === id) {
      result.push({
        title: el.title,
        imageUrl: el.thumb.src,
        publishDateAsString: getTurkishDate(el.published),
      });
    }
  });
  return result;
};

const getTurkishDate = (datestr) => {
  const date = new Date(parseInt(datestr) * 1000);
  return date.toLocaleDateString("tr-TR", {
    month: "long",
    year: "numeric",
    day: "numeric",
  });
};

const removeDuplicate = (news) => {
  const existingIds = [];
  const result = [];
  news.forEach((el) => {
    if (!existingIds.includes(el.id)) {
      existingIds.push(el.id);
      result.push(el);
    }
  });
  return result;
};

const getNewsByCategory = (title) => {
  const result = [];
  let categoryId = -1;
  data.categories.forEach((el) => {
    if (el.title === title) {
      categoryId = el.id;
    }
  });
  data.content.forEach((el) => {
    if (el.category.includes(categoryId)) {
      result.push(el);
    }
  });
  return result;
};

const filterResult = (filter, input) => {
  let result = input;
  if (filter.direct) {
    result = result.filter((el) => el.id === filter.direct);
    return result;
  }
  if (filter.category) {
    result = input.filter((el) =>
      el.category.includes(parseInt(filter.category))
    );
  }
  if (filter.editor) {
    result = result.filter((el) => el.author === parseInt(filter.editor));
  }
  if (filter.keyword) {
    const normalKeyword = filter.keyword.trim().toLowerCase();
    result = result.filter((el) => {
      const normalTitle = el.title.trim().toLowerCase();
      return normalTitle.includes(normalKeyword);
    });
  }
  return result;
};

const orderResult = (direction, input) => {
  let result;
  if (direction === "latest") {
    result = input.sort(
      (a, b) => parseInt(b.published) - parseInt(a.published)
    );
  } else {
    result = input.sort(
      (a, b) => parseInt(a.published) - parseInt(b.published)
    );
  }
  return result;
};

const normalizeResult = (input) => {
  const result = [];
  input.forEach((el) => {
    result.push({
      id: el.id,
      title: el.title,
      imageUrl: el.thumb.src,
      publishDateAsString: getTurkishDate(el.published),
    });
  });
  return result;
};

const getNewsByEditor = (title) => {
  const result = [];
  let authorId = -1;
  data.authors.forEach((el) => {
    if (el.title === title) {
      authorId = el.id;
    }
  });
  data.content.forEach((el) => {
    if (el.author === authorId) {
      result.push(el);
    }
  });
  return result;
};
