import "./style.css";
import React, { useEffect, useState } from "react";
import down from "../assets/downCaret.png";
import { InputSearch } from "./InputSearch";
import axios from "axios";
import { Country } from "../utils/types";

export const DropDown: React.FC = () => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [limit, setLimit] = useState<number>(5);
  const [isAdmin] = useState<boolean>(true);
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const getCountries = async () => {
    try {
      const response = await axios.get("http://localhost:4000/countries");
      setCountries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  const handleSelectCountry = (countryName: string) => {
    setSelectedCountry(countryName);
    setShowDropDown(false);
  };

  const handleAddCountry = async (countryName: string) => {
    try {
      const response = await axios.post("http://localhost:4000/countries", {
        name: countryName,
      });
      setCountries(countries.concat([response.data]));
      setSelectedCountry(countryName);
      setShowDropDown(false);
      setLimit(5);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = () => {
    setLimit(limit + 5);
  };

  return (
    <>
      {selectedCountry.length > 0 && (
        <h1>Selected Country: {selectedCountry}</h1>
      )}
      <div
        className="dropdownContainer"
        onClick={() => setShowDropDown(!showDropDown)}
      >
        <h4>Select a location</h4>
        {/* only add one icon based on condition we can add one more */}
        <img src={down} alt="no" className="dropDownImage" />
      </div>
      {showDropDown && (
        <InputSearch // if we want we can give fixed height and make view scrollable
          countries={countries.slice(0, limit)}
          isAdmin={isAdmin}
          handleSelectCountry={handleSelectCountry}
          handleAddCountry={handleAddCountry}
          remainingCount={countries.length - limit}
          loadMore={loadMore}
        />
      )}
    </>
  );
};
