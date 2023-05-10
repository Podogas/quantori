import React, { useRef } from "react";
import "./Tags.css";

const Tags = ({
  onSelectTag,
  blockName,
  initialSelectedTag,
}: {
  onSelectTag: (tag: string) => void;
  blockName: string;
  initialSelectedTag: string | undefined;
}) => {
  const tagsRef = useRef<Array<React.RefObject<HTMLSpanElement>>>(
    [...Array(4)].map(() => React.createRef<HTMLSpanElement>())
  );

  let healthTagSelected = false;
  let workTagSelected = false;
  let homeTagSelected = false;
  let otherTagSelected = false;

  switch (initialSelectedTag) {
    case "health":
      healthTagSelected = true;
      break;
    case "work":
      workTagSelected = true;
      break;
    case "home":
      homeTagSelected = true;
      break;
    case "other":
      otherTagSelected = true;
      break;
  }
  const selectTag = (n: number) => {
    const element = tagsRef.current[n].current;
    if (element?.classList.contains("info-tag--selected")) {
      element.classList.remove("info-tag--selected");
      onSelectTag("");
    } else {
      tagsRef.current.forEach((e) =>
        e.current?.classList.remove("info-tag--selected")
      );
      element?.classList.add("info-tag--selected");
      if (element?.textContent) {
        onSelectTag(element?.textContent);
      }
    }
  };
  return (
    <div className={`${blockName}__info-tags-wrapper info-tags-wrapper`}>
      <span
        className={`${blockName}__info-tag info-tag info-tag--health ${
          healthTagSelected ? "info-tag--selected" : ""
        }`}
        ref={tagsRef.current[0]}
        onClick={() => {
          selectTag(0);
        }}
      >
        health
      </span>
      <span
        className={`${blockName}__info-tag info-tag info-tag--work ${
          workTagSelected ? "info-tag--selected" : ""
        } `}
        ref={tagsRef.current[1]}
        onClick={() => {
          selectTag(1);
        }}
      >
        work
      </span>
      <span
        className={`${blockName}__info-tag info-tag info-tag--home ${
          homeTagSelected ? "info-tag--selected" : ""
        } `}
        ref={tagsRef.current[2]}
        onClick={() => {
          selectTag(2);
        }}
      >
        home
      </span>
      <span
        className={`${blockName}__info-tag info-tag info-tag--other ${
          otherTagSelected ? "info-tag--selected" : ""
        } `}
        ref={tagsRef.current[3]}
        onClick={() => {
          selectTag(3);
        }}
      >
        other
      </span>
    </div>
  );
};

export { Tags };
