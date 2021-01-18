import "./style.css";
import React from "react";
import { Country } from "../utils/types";

interface Props {
  country: Country;
  handleSelectCountry: (countryName: string) => void;
}

export const ListItem: React.FC<Props> = ({
  country: { id, name },
  handleSelectCountry,
}) => {
  return (
    <li key={id} className="listItem" onClick={() => handleSelectCountry(name)}>
      {name}
    </li>
  );
};
