const httpHeader = {
    "Content-Type": "application/json",
  };
const initialUrl = 'https://rest.uniprot.org/uniprotkb/search?fields=accession,id,gene_names,organism_name,length,cc_subcellular_location'
const formatNextLink = (str:string | null) => {
    if(str){
        const linkRegex = /<([^>]+)>;\s*rel="next"/;
        const match = linkRegex.exec(str);
        const link = match ? match[1] : null;
        return link;
    }
    return null;
}
const getSearchResults = (url:string, query:string) => {
  console.log('getSearchResults')
    return fetch(url, {
      method: "GET",
      headers: httpHeader,
    })
      .then((res) => {
        if (res.ok) {
          const resultPromise = res.json();
          const next = formatNextLink(res.headers.get("link"));
          const totalResultsCount = Number(res.headers.get("X-Total-Results"));
          return resultPromise.then((result) => {
            const proteins:[] = result.results;
            return { proteins, next, totalResultsCount, query };
          });
        } else {
          console.log(res, "something went wrong");
        }
      });
  };
const getChunk = (url:string) => {
  console.log('getNextChunk', url)

    return fetch(url, {
      method: "GET",
      headers: httpHeader,
    })
      .then((res) => {
        if (res.ok) {
          const query = undefined;
          const resultPromise = res.json();
          const next = formatNextLink(res.headers.get("link"));
          const totalResultsCount = res.headers.get("X-Total-Results");
          return resultPromise.then((result) => {
            const proteins:[] = result.results;
            return { proteins, next, totalResultsCount, query, url };
          });
        } else {
          console.log(res, "something went wrong");
        }
        
  })
  }
 

const getFacets = (query:string, filters:string) => {
  console.log('getSearchFacets')
    const url = `https://rest.uniprot.org/uniprotkb/search?facets=model_organism,proteins_with,annotation_score&query=(${query})${filters}`;
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

const getProtein = (id:string) => {
  console.log('getSearchProtein')
  const url = 'https://rest.uniprot.org/uniprotkb/';
    return fetch(url+id, {
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

const getProteinPublications = (id:string) => {
  const url = `https://rest.uniprot.org/uniprotkb/${id}/publications`;
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
    .then((res) => res.results);
}
export {getFacets, getSearchResults, getChunk, getProtein, getProteinPublications}