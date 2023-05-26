import "./ProteinPage.css";
import { useLocation } from 'react-router-dom';
import {useEffect, useState} from 'react';
import { getProtein, getProteinPublications } from "../../api/uniprot";
import { Header } from "../Header/Header";
import { ProteinDetails } from "../ProteinDetails/ProteinDetails";
import { FeatureViewer } from "../FeatureViewer/FeatureViewer";
import { ProteinPublications } from "../ProteinPublications/ProteinPublications";
interface Genes {
    geneName: {
        value: string
    }
}
interface Protein {
    comments: [{
        subcellularLocations:[{
            location:{
                value:string
            }
        }]
    }]
    primaryAccession: string,
    uniProtkbId: string,
    organism: {
        scientificName: string
    },
    sequence: {
        length: string,
        molWeight: number,
        crc64: string,
        value: string
    },
    genes: Genes[],
    proteinDescription:{
        recommendedName: {
            fullName: {
                value: string
            }
        },
        submissionNames:[
            {
                fullName:{
                    value:string
                }
            }
        ]
    },
    
    entryAudit:{
        lastSequenceUpdateDate: string
    }
}

interface Citation {
    id: string;
    citationType: string;
    authors: string[];
    citationCrossReferences: { database: string; id: string }[];
    title: string;
    publicationDate: string;
    journal: string;
    firstPage: string;
    lastPage: string;
    volume: string;
    completeAuthorList: boolean;
    literatureAbstract: string;
  }
  
  interface Source {
    name: string;
  }
  
  interface Reference {
    source: Source;
    citationId: string;
    sourceCategories: string[];
    referencePositions: string[];
    referenceNumber: number;
  }
  
  interface Statistics {
    reviewedProteinCount: number;
    unreviewedProteinCount: number;
    computationallyMappedProteinCount: number;
    communityMappedProteinCount: number;
  }
  
  interface ProteinPublication {
    citation: Citation;
    references: Reference[];
    statistics: Statistics;
  }

const ProteinPage = () => {
    //REDO PATH AND ROUTING
    const location = useLocation();
    const path = location.pathname.slice(10);
    //
    const [protein, setProtein] = useState<Protein|null>(null);
    const [proteinPublications, setProteinPublications] = useState<ProteinPublication[]|null>(null);
    const [selectedTab, setSelectedTab] = useState('details');
    useEffect(() => {
        getProtein(path)
        .then(res => {
            setProtein(res)
        })
        getProteinPublications(path)
        .then(res => {
            setProteinPublications(res)
        })
    },[])
    if(protein){
        const renderTab = () => {
            if(selectedTab === 'details'){
                return <ProteinDetails protein={protein}/>
            }
            if(selectedTab === 'feature-viewer'){
                return <FeatureViewer entry={protein.primaryAccession} />
                
            }
            if(selectedTab === 'publications'){
                return <ProteinPublications proteinPublications={proteinPublications}/>
            }
        }
        
        return(
            <>
            <Header/>
            <div className="protein">
                <h2 className="protein__title">{`${protein.primaryAccession} / ${protein.uniProtkbId}`}
                    <span className="protein__title-tag">{protein.organism.scientificName}</span>
                </h2>
                <div className="protein__description">
                    <p className="protein__description-title-paragraph">Protein</p>
                    <p className="protein__description-paragraph">{protein.proteinDescription.recommendedName ? protein.proteinDescription.recommendedName.fullName.value : protein.proteinDescription.submissionNames[0].fullName.value}</p>
                    {protein.genes ?
                    <>
                        <p className="protein__description-title-paragraph">Gene</p>
                        <p className="protein__description-paragraph">{protein.genes.map(g => g.geneName.value)}</p>
                    </>  
                        : null
                    }
                    
                </div>
                <nav className="protein__tabs">
                    <button className={
                        `protein__tabs-tab-btn 
                        ${selectedTab ==='details' ? 'protein__tabs-tab-btn--selected' : ''}`} 
                        type="button" 
                        onClick={()=>{setSelectedTab('details')}}
                    >
                        Details
                    </button>
                    <button className={
                        `protein__tabs-tab-btn 
                        ${selectedTab ==='feature-viewer' ? 'protein__tabs-tab-btn--selected' : ''}`} 
                        type="button" 
                        onClick={()=>{setSelectedTab('feature-viewer')}}
                    >
                        Feature viewer
                    </button>
                    <button className={
                        `protein__tabs-tab-btn 
                        ${selectedTab ==='publications' ? 'protein__tabs-tab-btn--selected' : ''}`} 
                        type="button" 
                        onClick={()=>{setSelectedTab('publications')}}
                    >
                        Publications
                    </button>
                </nav>
                {
                    renderTab()
                }
            </div>
            </>
        )
    }
    return <div>sorry fetch failed</div>
}

export {ProteinPage};