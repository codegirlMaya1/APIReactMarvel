import React, { useEffect, useState } from 'react';
import getMarvelCharacters from './api/marvelApi';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const data = await getMarvelCharacters();
      setCharacters(data);
    };
    fetchCharacters();
  }, []);

  return (
    <div>
      <h1>Marvel Characters</h1>
      <ol>
        {characters.slice(0, 3).map(character => (
          <li key={character.id}>
            <h2>{character.name}</h2>
            <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
            <p>{character.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default CharacterList;