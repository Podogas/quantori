
 import "./FeatureViewer.css"
 import {useEffect} from 'react';
 import ReactDOM from "react-dom/client";
 const FeatureViewer = ({entry}:{entry:string}) => {
    
    return(
        <protvista-uniprot accession={entry} />
    )
  
    // window.customElements.define('protvista-uniprot', ProtvistaUniprot);
    
 }

 export {FeatureViewer};
