import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'protvista-uniprot': ProtvistaUniprotProps; // Use the custom props type
    }
  }
}

interface ProtvistaUniprotProps extends React.HTMLAttributes<HTMLElement> {
  accession: string; // Define the 'accession' prop
}