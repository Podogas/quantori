import "./ProteinPublications.css";
import { ProteinPublicationT } from "../../utils/globalTypes.t";
const ProteinPublications = ({
  proteinPublications,
}: {
  proteinPublications: ProteinPublicationT[] | null;
}) => {
  const renderCards = (publication: ProteinPublicationT) => {
    const title = publication.citation.title;
    const authors = publication.citation.authors
      ? publication.citation.authors.join(", ")
      : undefined;
    const categories = publication.references[0].sourceCategories
      ? publication.references[0].sourceCategories.join(", ")
      : undefined;
    const citedFor = publication.references[0].referencePositions
      ? publication.references[0].referencePositions.join(", ")
      : undefined;
    const source = publication.references[0].source.name;
    const pubMedLink = publication.citation.citationCrossReferences
      ? `https://pubmed.ncbi.nlm.nih.gov/${publication.citation.citationCrossReferences[0].id}`
      : undefined;
    const euMcLink = publication.citation.citationCrossReferences
      ? `https://pubmed.ncbi.nlm.nih.gov/${publication.citation.citationCrossReferences[0].id}`
      : undefined;
    const DOILink =
      publication.citation.citationCrossReferences &&
      publication.citation.citationCrossReferences[1]
        ? `https://dx.doi.org/${publication.citation.citationCrossReferences[1].id}`
        : undefined;
    const DOILinkTitle =
      publication.citation.journal &&
      publication.citation.volume &&
      publication.citation.firstPage &&
      publication.citation.lastPage &&
      publication.citation.publicationDate
        ? `${publication.citation.journal} ${publication.citation.volume}:${publication.citation.firstPage}-${publication.citation.lastPage} (${publication.citation.publicationDate})`
        : undefined;
    return (
      <div className="publication" key={publication.citation.id}>
        <p className="publication__title">{title}</p>
        {authors ? <p className="publication__authors">{authors}</p> : null}

        {categories ? (
          <p className="publication__categories">
            <span className="publication__categories-title">Categoties: </span>
            {categories}
          </p>
        ) : null}
        {citedFor ? (
          <p className="publication__cited-for">
            <span className="publication__cited-for-title">Cited for: </span>
            {citedFor}
          </p>
        ) : null}
        <p className="publication__source">
          <span className="publication__source-title">Source: </span>
          {source}
        </p>
        <div className="publication__links">
          {pubMedLink ? (
            <a className="publication__link" target="_blank" href={pubMedLink}>
              PubMed
            </a>
          ) : null}
          {euMcLink ? (
            <a className="publication__link" target="_blank" href={euMcLink}>
              Europe PMC
            </a>
          ) : null}

          {DOILink ? (
            <a className="publication__link" target="_blank" href={DOILink}>
              {DOILinkTitle}
            </a>
          ) : DOILinkTitle ? (
            <a
              className="publication__link publication__link--inactive"
              target="_blank"
            >
              {DOILinkTitle}{" "}
            </a>
          ) : null}
        </div>
      </div>
    );
  };
  if (proteinPublications) {
    return (
      <section className="protein-publications">
        {proteinPublications.map((el) => renderCards(el))}
      </section>
    );
  }
  return <h5>Loading</h5>;
};

export { ProteinPublications };
