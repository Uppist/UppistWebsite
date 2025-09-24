// Admin/Table.jsx
import React, { useState, useMemo } from "react";
import Buttons from "./Dashboard/Transaction/Buttons";

const TableComponent = ({ data, type }) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // ✅ Always sort by date DESC so newest comes first
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => new Date(b.time) - new Date(a.time));
  }, [data]);

  // ✅ Slice for pagination
  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedData, page]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  return (
    <div>
      <table className="custom-table">
        <thead>
          <tr>
            {type === "whatsapp" ? (
              <>
                <th>Phone Number</th>
                <th>Prompt</th>
                <th>Response</th>
                <th>Time</th>
              </>
            ) : (
              <>
                <th>Email</th>
                <th>Prompt</th>
                <th>Response</th>
                <th>Time</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, idx) => (
            <tr key={idx}>
              {type === "whatsapp" ? (
                <>
                  <td>{row.phone}</td>
                  <td>{row.prompt}</td>
                  <td>{row.response}</td>
                  <td>{new Date(row.time).toLocaleString()}</td>
                </>
              ) : (
                <>
                  <td>{row.email}</td>
                  <td>{row.prompt}</td>
                  <td>{row.response}</td>
                  <td>{new Date(row.time).toLocaleString()}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Pagination buttons */}
      <Buttons page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default TableComponent;
