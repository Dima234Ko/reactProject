export function Select({ id, options, value, onChange }) {
  return (
    <select className="some-input" id={id} value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export function SelectSSID({ value, onChange }) {
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
  return (
    <Select
      id="selectSSID2_4"
      options={options}
      value={value}
      onChange={onChange}
    />
  );
}

export function SelectSSID5({ value, onChange }) {
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
  return (
    <Select
      id="selectSSID5"
      options={options}
      value={value}
      onChange={onChange}
    />
  );
}
