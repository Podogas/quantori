interface GenesT {
  geneName: {
    value: string;
  };
}
interface ProteinT {
  comments: [
    {
      subcellularLocations: [
        {
          location: {
            value: string;
          };
        }
      ];
    }
  ];
  primaryAccession: string;
  uniProtkbId: string;
  organism: {
    scientificName: string;
  };
  sequence: {
    length: string;
    molWeight: number;
    crc64: string;
    value: string;
  };
  genes: GenesT[];
  proteinDescription: {
    recommendedName: {
      fullName: {
        value: string;
      };
    };
    submissionNames: [
      {
        fullName: {
          value: string;
        };
      }
    ];
  };
  entryAudit: {
    lastSequenceUpdateDate: string;
  };
}
interface CitationT {
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

interface SourceT {
  name: string;
}

interface ReferenceT {
  source: SourceT;
  citationId: string;
  sourceCategories: string[];
  referencePositions: string[];
  referenceNumber: number;
}

interface StatisticsT {
  reviewedProteinCount: number;
  unreviewedProteinCount: number;
  computationallyMappedProteinCount: number;
  communityMappedProteinCount: number;
}

interface ProteinPublicationT {
  citation: CitationT;
  references: ReferenceT[];
  statistics: StatisticsT;
}

interface FiltrObjT {
  gene: undefined | string;
  organism: undefined | string;
  lengthFrom: undefined | string;
  lengthTo: undefined | string;
  annotationScore: undefined | string;
  protetinsWith: undefined | string;
}
interface OptionT {
  count: number;
  label: string;
  value: string;
}

export type { ProteinT, GenesT, ProteinPublicationT, FiltrObjT, OptionT };
