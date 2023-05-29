import "./FeatureViewer.css";
import "../../protvista-uniprot.d.ts";
const FeatureViewer = ({ entry }: { entry: string }) => {
  return <protvista-uniprot accession={entry} />;

  // window.customElements.define('protvista-uniprot', ProtvistaUniprot);
};

export { FeatureViewer };
