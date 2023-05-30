import "./ProteinPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProtein, getProteinPublications } from "../../api/uniprot";
import { Header } from "../Header/Header";
import { ProteinDetails } from "../ProteinDetails/ProteinDetails";
import { FeatureViewer } from "../FeatureViewer/FeatureViewer";
import { ProteinPublications } from "../ProteinPublications/ProteinPublications";
import { ProteinPublicationT, ProteinT } from "../../utils/globalTypes.t";

const ProteinPage = () => {
  const location = useLocation();
  const path = location.pathname.replace("/proteins", "");
  const navigate = useNavigate();
  const [protein, setProtein] = useState<ProteinT | null>(null);
  const [proteinPublications, setProteinPublications] = useState<
    ProteinPublicationT[] | null
  >(null);
  const [selectedTab, setSelectedTab] = useState("details");
  useEffect(() => {
    getProtein(path)
      .then((res) => {
        setProtein(res);
      })
      .catch((err) => {
        console.error(err);
        navigate("/not-found");
      });
    getProteinPublications(path)
      .then((res) => {
        setProteinPublications(res);
      })
      .catch((err) => {
        console.error(err);
        navigate("/not-found");
      });
  }, []);
  if (protein) {
    const renderTab = () => {
      if (selectedTab === "details") {
        return <ProteinDetails protein={protein} />;
      }
      if (selectedTab === "feature-viewer") {
        return <FeatureViewer entry={protein.primaryAccession} />;
      }
      if (selectedTab === "publications") {
        return (
          <ProteinPublications proteinPublications={proteinPublications} />
        );
      }
    };
    return (
      <>
        <Header />
        <div className="protein">
          <h2 className="protein__title">
            {`${protein.primaryAccession} / ${protein.uniProtkbId}`}
            <span className="protein__title-tag">
              {protein.organism.scientificName}
            </span>
          </h2>
          <div className="protein__description">
            <p className="protein__description-title-paragraph">Protein</p>
            <p className="protein__description-paragraph">
              {protein.proteinDescription.recommendedName
                ? protein.proteinDescription.recommendedName.fullName.value
                : null}
            </p>
            {protein.genes.map((g) =>
              g.geneName ? g.geneName.value : null
            )[0] ? (
              <>
                <p className="protein__description-title-paragraph">Gene</p>
                <p className="protein__description-paragraph">
                  {protein.genes.map((g) =>
                    g.geneName ? g.geneName.value : null
                  )}
                </p>
              </>
            ) : null}
          </div>
          <nav className="protein__tabs">
            <button
              className={`protein__tabs-tab-btn 
                        ${
                          selectedTab === "details"
                            ? "protein__tabs-tab-btn--selected"
                            : ""
                        }`}
              type="button"
              onClick={() => {
                setSelectedTab("details");
              }}
            >
              Details
            </button>
            <button
              className={`protein__tabs-tab-btn 
                        ${
                          selectedTab === "feature-viewer"
                            ? "protein__tabs-tab-btn--selected"
                            : ""
                        }`}
              type="button"
              onClick={() => {
                setSelectedTab("feature-viewer");
              }}
            >
              Feature viewer
            </button>
            <button
              className={`protein__tabs-tab-btn 
                        ${
                          selectedTab === "publications"
                            ? "protein__tabs-tab-btn--selected"
                            : ""
                        }`}
              type="button"
              onClick={() => {
                setSelectedTab("publications");
              }}
            >
              Publications
            </button>
          </nav>
          {renderTab()}
        </div>
      </>
    );
  }
  return <div className="protein__preloader"></div>;
};

export { ProteinPage };
