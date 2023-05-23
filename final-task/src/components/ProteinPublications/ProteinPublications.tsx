import './ProteinPublications';


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
        }
    },
    entryAudit:{
        lastSequenceUpdateDate: string
    }
}
const ProteinPublications = ({protein}:{protein:Protein}) => {

    return(
        <h1>ProteinPublications</h1>
    )
}

export {ProteinPublications};