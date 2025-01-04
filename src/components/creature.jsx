import React, { useEffect, useState } from "react";
import "./creature.css";

export const Creature = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all"); // Default filter

  const fetchCharacters = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${pageNumber}`
      );
      const data = await response.json();
      if (pageNumber === 1) {
        setCharacters(data.results.slice(0, 20)); // Загружаем только первые 20 элементов
      } else {
        setCharacters((prevCharacters) => [
          ...prevCharacters,
          ...data.results.slice(0, 20),
        ]); // Добавляем следующие 20 элементов
      }
    } catch (error) {
      console.error("Error fetching characters:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters(page);
  }, [page]);

  const loadMoreCharacters = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Alive":
        return "status-alive";
      case "Dead":
        return "status-dead";
      case "unknown":
        return "status-unknown";
      default:
        return "";
    }
  };

  // фильтр по типу персонажа

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredCharacters = characters.filter((character) => {
    if (filter === "all") {
      return true;
    }
    return character.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <>
      <div className="filter-container">
        <label>Filter by status</label>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="Unknown">Unknown</option>
        </select>
      </div>

      <div className="wrapper">
        {filteredCharacters.map((character) => (
          <div key={character.id} className="card">
            <img
              className="card-image-wrapper"
              src={character.image}
              alt={character.name}
            />
            <div className="card-description">
              <h3>{character.name}</h3>

              <div>
                <div className="status-container">
                  <p>Status: {character.status}</p>
                  <div
                    className={`status-dot ${getStatusClass(character.status)}`}
                  />
                </div>

                <p>Species: {character.species}</p>
                {characters.map((character, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", margin: "20px" }}>
        <button id="next20" onClick={loadMoreCharacters} disabled={loading}>
          {loading ? "Loading..." : "Next 20"}
        </button>
      </div>
    </>
  );
};
