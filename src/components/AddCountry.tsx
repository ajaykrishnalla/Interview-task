import React from "react";

interface Props {
  searchedCountry: string;
  isAdmin: boolean;
  handleAddCountry: (countryName: string) => void;
}

export const AddCountry: React.FC<Props> = ({
  searchedCountry,
  isAdmin,
  handleAddCountry,
}) => {
  return (
    <div className="addCountryContainer">
      <span className="addCountryText">{searchedCountry} not found</span>
      {isAdmin && (
        <button onClick={() => handleAddCountry(searchedCountry)}>
          Add and select
        </button>
      )}
    </div>
  );
};
