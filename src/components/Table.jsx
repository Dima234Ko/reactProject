import React from "react";

export function Table({ columns, className, id, children }) {
  return (
    <table className={className} id={id}>
      <thead>
        <tr>
          {id !== "logTable" && <th></th>}
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
