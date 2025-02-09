import React, { useState } from "react";

function Select({ id, options, defaultValue }) {
  const [selectedValue, setSelectedValue] = useState(defaultValue || "auto");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <select
      className="some-input"
      id={id}
      value={selectedValue}
      onChange={handleChange}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export function SelectSSID() {
  const options = [
    "auto",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
  ];
  return <Select id="selectSSID2_4" options={options} defaultValue="auto" />;
}

export function SelectSSID5() {
  const options = [
    "auto",
    "36",
    "40",
    "48",
    "44",
    "149",
    "153",
    "157",
    "161",
    "165",
  ];
  return <Select id="selectSSID5" options={options} defaultValue="auto" />;
}
