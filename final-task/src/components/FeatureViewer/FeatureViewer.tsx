import "./FeatureViewer.css";
import "../../protvista-uniprot.d.ts";
// @ts-ignore
import ProtvistaUniprot from 'protvista-uniprot';
window.customElements.get(`protvista-uniprot`) || window.customElements.define(`protvista-uniprot`, ProtvistaUniprot);
const FeatureViewer = ({ entry }: { entry: string }) => {
  return <protvista-uniprot accession={entry} />;
};

export { FeatureViewer };
