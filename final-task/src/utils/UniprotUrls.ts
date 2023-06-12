const baseSearchUrl = 'https://rest.uniprot.org/uniprotkb/search?fields=accession,id,gene_names,organism_name,length,cc_subcellular_location';
const baseFacetsUrl = 'https://rest.uniprot.org/uniprotkb/search?facets=model_organism,proteins_with,annotation_score&query'
const baseProteinUrl = "https://rest.uniprot.org/uniprotkb/";
export {baseSearchUrl, baseFacetsUrl, baseProteinUrl};