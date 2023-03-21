import React from "react";
import "./table.css";

function Table(props) {
  const { data, headers } = props;

  const headerCells = headers.map(({ header }) => (
    <th key={header}>{header}</th>
  ));

  const rows = data.map((item) => {
    const cells = headers.map(({ dataKey }) => (
      <td key={dataKey}>{item[dataKey]}</td>
    ));
    return <tr key={item.id}>{cells}</tr>;
  });

  return (
    <table className="table">
      <thead>
        <tr>{headerCells}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default Table;
