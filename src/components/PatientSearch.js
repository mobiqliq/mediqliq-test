import React, { useState } from "react";

function PatientSearch({ onSelect }) {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchPatients = async (text) => {

    setQuery(text);

    if (text.length < 3) {
      setResults([]);
      return;
    }

    const result = await window.electronAPI.query(
      `SELECT id, first_name, last_name, phone 
       FROM patients
       WHERE phone LIKE ? OR first_name LIKE ?
       LIMIT 10`,
      [`%${text}%`, `%${text}%`]
    );

    setResults(result.data || []);
  };

  return (

    <div>

      <input
        placeholder="Search patient by phone or name"
        value={query}
        onChange={(e) => searchPatients(e.target.value)}
      />

      <div>

        {results.map(p => (

          <div
            key={p.id}
            style={{
              border: "1px solid #ccc",
              padding: 5,
              marginTop: 5,
              cursor: "pointer"
            }}
            onClick={() => onSelect(p)}
          >

            {p.first_name} {p.last_name} — {p.phone}

          </div>

        ))}

      </div>

    </div>

  );
}

export default PatientSearch;
