import { baseFacetsUrl, baseProteinUrl } from "../utils/UniprotUrls";
import { HttpErrorsHandler } from "../utils/Errors";
const httpHeader = {
  "Content-Type": "application/json",
};
const formatNextLink = (str: string | null) => {
  if (str) {
    const linkRegex = /<([^>]+)>;\s*rel="next"/;
    const match = linkRegex.exec(str);
    const link = match ? match[1] : null;
    return link;
  }
  return null;
};
const getSearchResults = (url: string, query: string) => {
  return fetch(url, {
    method: "GET",
    headers: httpHeader,
  }).then((res) => {
    if (res.ok) {
      const resultPromise = res.json();
      const next = formatNextLink(res.headers.get("link"));
      const totalResultsCount = Number(res.headers.get("X-Total-Results"));
      return resultPromise.then((result) => {
        const proteins: [] = result.results;
        return { proteins, next, totalResultsCount, query };
      });
    } else {
      throw HttpErrorsHandler(res);
    }
  });
};
const getChunk = (url: string) => {
  return fetch(url, {
    method: "GET",
    headers: httpHeader,
  }).then((res) => {
    if (res.ok) {
      const query = undefined;
      const resultPromise = res.json();
      const next = formatNextLink(res.headers.get("link"));
      const totalResultsCount = res.headers.get("X-Total-Results");
      return resultPromise.then((result) => {
        const proteins: [] = result.results;
        return { proteins, next, totalResultsCount, query, url };
      });
    } else {
      throw HttpErrorsHandler(res);
    }
  });
};
const getFacets = (query: string, filters: string) => {
  const url = `${baseFacetsUrl}=(${query})${filters}`;
  return fetch(url, {
    method: "GET",
    headers: httpHeader,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw HttpErrorsHandler(res);
      }
    })
    .then((res) => res);
};

const getProtein = (id: string) => {
  const url = baseProteinUrl;
  return fetch(url + id, {
    method: "GET",
    headers: httpHeader,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw HttpErrorsHandler(res);
      }
    })
    .then((res) => res);
};

const getProteinPublications = (id: string) => {
  const url = `${baseProteinUrl+id}/publications`;
  return fetch(url, {
    method: "GET",
    headers: httpHeader,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw HttpErrorsHandler(res);
      }
    })
    .then((res) => res.results);
};
export {
  getFacets,
  getSearchResults,
  getChunk,
  getProtein,
  getProteinPublications,
};
