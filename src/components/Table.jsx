import React from "react";

export function Table({ columns, className, id, children, onCheckboxChange }) {
  return (
    <table className={className} id={id}>
      <thead>
        <tr>
          {onCheckboxChange && <th></th>}
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      {onCheckboxChange ? (
        <tbody>{children(onCheckboxChange)}</tbody>
      ) : (
        children && <tbody>{children}</tbody>
      )}
    </table>
  );
}
