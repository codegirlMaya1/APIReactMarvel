import axios from 'axios';
import md5 from 'md5';

const PUBLIC_KEY = '873b1f26475c000e2ba08a5ec1a2e774';
const PRIVATE_KEY = 'fe3265bd8088738de372303135694bbaba873677';
const BASE_URL = 'https://gateway.marvel.com/v1/public/characters';

const getMarvelCharacters = async () => {
  const ts = new Date().getTime();
  const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);
  const response = await axios.get(BASE_URL, {
    params: {
      ts,
      apikey: PUBLIC_KEY,
      hash,
    },
  });
  return response.data.data.results;
};

const getCharacterStoryline = async (characterId) => {
  const ts = new Date().getTime();
  const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);
  const response = await axios.get(`${BASE_URL}/${characterId}/stories`, {
    params: {
      ts,
      apikey: PUBLIC_KEY,
      hash,
    },
  });
  return response.data.data.results.map(story => story.title).join(', ');
};

const displayCharacterDetails = async (character) => {
  const details = document.getElementById('character-details');
  const storyline = await getCharacterStoryline(character.id);
  details.innerHTML = `
    <h2>${character.name}</h2>
    <p>${character.description || 'No description available'}</p>
    <p>Storyline: ${storyline || 'No storyline available'}</p>
    <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}" />
  `;
  details.style.transform = 'scale(1.2)';  // Enlarge details text
  details.style.transition = 'transform 0.3s ease';  // Add transition
};

const renderCharacters = async () => {
  const characters = await getMarvelCharacters();
  const container = document.getElementById('character-container');
  container.innerHTML = '';

  characters.forEach(character => {
    const charDiv = document.createElement('div');
    charDiv.style.position = 'relative';
    charDiv.style.display = 'inline-block';
    charDiv.style.margin = '10px';

    const img = document.createElement('img');
    img.src = `${character.thumbnail.path}.${character.thumbnail.extension}`;
    img.alt = character.name;
    img.style.width = '200px';
    img.style.height = 'auto';

    const nameOverlay = document.createElement('div');
    nameOverlay.textContent = character.name;
    nameOverlay.style.position = 'absolute';
    nameOverlay.style.bottom = '10px';
    nameOverlay.style.left = '10px';
    nameOverlay.style.color = 'white';
    nameOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    nameOverlay.style.padding = '5px';

    const button = document.createElement('button');
    button.textContent = 'Click for Details';
    button.addEventListener('click', () => displayCharacterDetails(character));
    button.style.position = 'absolute';
    button.style.bottom = '10px';
    button.style.right = '10px';
    button.style.padding = '5px 10px';

    charDiv.appendChild(img);
    charDiv.appendChild(nameOverlay);
    charDiv.appendChild(button);
    container.appendChild(charDiv);
  });
};

const loadMoreCharacters = () => {
  renderCharacters();
};

document.addEventListener('DOMContentLoaded', () => {
  const loadButton = document.createElement('button');
  loadButton.textContent = 'Load Characters';
  loadButton.addEventListener('click', loadMoreCharacters);
  document.body.appendChild(loadButton);

  const container = document.createElement('div');
  container.id = 'character-container';
  document.body.appendChild(container);

  const details = document.createElement('div');
  details.id = 'character-details';
  details.style.position = 'fixed';
  details.style.top = '10px';
  details.style.right = '10px';
  details.style.backgroundColor = 'white';
  details.style.border = '1px solid #ddd';
  details.style.padding = '10px';
  details.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
  details.style.maxWidth = '300px';
  document.body.appendChild(details);
});

export default getMarvelCharacters;
