import "./ProteinDetails.css";
import { useState } from "react";
import { ProteinT } from "../../utils/globalTypes.t";
const ProteinDetails = ({ protein }: { protein: ProteinT }) => {
  const [isBtnAnimation, setIsBtnAnimation] = useState(false);
  function formatDate(inputDate: string) {
    const date = new Date(inputDate);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formatedDate = date
      .toLocaleDateString("en-US", options)
      .replace(",", "");
    return formatedDate;
  }
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsBtnAnimation(true);
      setInterval(() => {
        setIsBtnAnimation(false);
      }, 200);
    });
  };
  return (
    <>
      <h3 className="protein-details__title">Sequence</h3>
      <div className="protein-details__description-wrapper">
        <div className="protein-details__description">
          <p className="protein-details__description-title-paragraph">Length</p>
          <p className="protein-details__description-paragraph">
            {protein.sequence.length}
          </p>
        </div>
        <div className="protein-details__description">
          <p className="protein-details__description-title-paragraph">
            Last updated
          </p>

          <p className="protein-details__description-paragraph">
            {formatDate(protein.entryAudit.lastSequenceUpdateDate)}
          </p>
        </div>
        <div className="protein-details__description">
          <p className="protein-details__description-title-paragraph">
            Mass (Da)
          </p>
          <p className="protein-details__description-paragraph">
            {protein.sequence.molWeight.toLocaleString()}
          </p>
        </div>
        <div className="protein-details__description">
          <p className="protein-details__description-title-paragraph">
            Checksum
          </p>
          <p className="protein-details__description-paragraph">
            {protein.sequence.crc64}
          </p>
        </div>
      </div>
      <div className="protein-details__sequence">
        <button
          className={`protein-details__sequence-copy-btn ${
            isBtnAnimation ? "protein-details__sequence-copy-btn--animated" : ""
          }`}
          onClick={() => {
            copyToClipboard(protein.sequence.value);
          }}
        ></button>
        <p className="protein-details__sequence-text">
          {protein.sequence.value}
        </p>
      </div>
    </>
  );
};

export { ProteinDetails };
