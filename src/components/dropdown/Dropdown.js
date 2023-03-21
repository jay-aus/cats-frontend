import React, { useState } from "react";
import Select from "react-select";
import fetchData from "../../service/service";
import Table from "../table/Table";
import "./dropdown.css";
//TO DO move this to a secure/configurable place
const baseUrl = 'https://57ea44tl64.execute-api.us-east-1.amazonaws.com/dev/top-five-cats';

function Dropdown() {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedLabel, setLabelValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let [responseValid, setResponseValue] = useState(true);
  const [data, setData] = useState(null);
  async function handleDropdownChange(selectedOption) {
    console.log(selectedOption);
    if (!responseValid) setResponseValue(true);
    setSelectedOption(selectedOption);
    setLabelValue(selectedOption.label);
    setData(null); // Clear the table
    setIsLoading(true);
    const finalUrl = `${baseUrl}?breed_type=${selectedOption.value}`;
    const result = await fetchData(finalUrl);
    if (!result || result.status !== 200) {
      setResponseValue(false);
    } else if (result && result.status === 200) {
      setData(result.data.input);
      setIsLoading(false);
    }
  }

  const options = [
    { value: "child_friendly", label: "Child Friendly" },
    { value: "stranger_friendly", label: "Stranger Friendly" },
    { value: "dog_friendly", label: "Dog Friendly" },
    { value: "all", label: "ALL" },
  ];

  return (
    <div className="dropdown-comp">
      <Select
        id="myDropdown"
        name="myDropdown"
        placeholder="Select an option"
        options={options}
        value={selectedOption}
        onChange={handleDropdownChange}
        isClearable={true}
        className="select"
        classNamePrefix="select"
      />
      <div>{isLoading && <div>Loading...</div>}
       {!isLoading && selectedOption && selectedOption.value === 'all'?
          <h3>Below are the top 5 cats which are Child Friendly, Stranger Friendly and Dog Friendly.</h3> : selectedOption && !isLoading? <h3>Below are the top five {selectedLabel} cat breeds we have found</h3> : ''
        }
      </div>
      
      <div>
        {!responseValid ? <p>Oops! Seems the field selected in the dropdown is not valid. Email jay.kapadia2020@gmail.com for more information.</p> : null}
      </div>
      {data && (
        <div className="table-container">
          <Table data={data} headers={[{ header: "Name", dataKey: "name" }, { header: "Description", dataKey: "description" }, { header: "Country", dataKey: "origin" }]} />
        </div>
      )}
    </div>
  );
}

export default Dropdown;
