const httpHeader = {
    "Content-Type": "application/json",
  };
const getFacets = (query:string) => {
    const url = `https://rest.uniprot.org/uniprotkb/search?facets=model_organism,proteins_with,annotation_score&query=(${query})`;
    return fetch(url, {
        method: "GET",
        headers: httpHeader,
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            // throw HttpErrorsHandler(res);
            console.log('smth went wrong')
          }
        })
        .then((res) => res);
}

export {getFacets}