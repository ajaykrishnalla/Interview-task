import "./style.css";
import React, { useEffect, useState } from "react";
import { Country } from "../utils/types";
import { AddCountry } from "./AddCountry";
import { ListItem } from "./ListItem";

interface Props {
  countries: Country[];
  isAdmin: boolean;
  handleSelectCountry: (countryName: string) => void;
  handleAddCountry: (countryName: string) => void;
  remainingCount: number;
  loadMore: () => void;
}

export const InputSearch: React.FC<Props> = ({
  countries,
  isAdmin,
  handleSelectCountry,
  handleAddCountry,
  remainingCount,
  loadMore,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Country[]>([]);

  useEffect(() => {
    const results = countries.filter(({ name }) =>
      name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(results);
  }, [searchQuery, countries]);

  return (
    <div className="containerWrapper">
      <div style={{ width: "200px" }}>
        <input
          type="text"
          placeholder="Search.."
          className="searchInput"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        {searchResults.length > 0 ? (
          searchResults.map((country) => (
            <ListItem
              key={country.id}
              country={country}
              handleSelectCountry={handleSelectCountry}
            />
          ))
        ) : (
          <AddCountry
            searchedCountry={searchQuery}
            isAdmin={isAdmin}
            handleAddCountry={handleAddCountry}
          />
        )}
      </div>
      {searchQuery.length > 0 ||
        (remainingCount > 0 && (
          <span style={{ alignSelf: "flex-end" }} onClick={loadMore}>
            {remainingCount} more...
          </span>
        ))}
    </div>
  );
};
