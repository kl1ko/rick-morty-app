import React, { useEffect, useState } from "react";
import "./creature.css";

export function Creature() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://rickandmortyapi.com/api/character",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <div className="wrapper">
        {data.results.map((character) => (
          <div className="card" key={character.id}>
            <div className="card-image-wrapper">
              <img src={character.image} alt={character.name} />
            </div>
            <div className="card-description">
              <h2>{character.name}</h2>
              <p className="status">Status: {character.status}</p>
              <p>Species: {character.species}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
