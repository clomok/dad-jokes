const { readFile, writeFile } = require('fs/promises');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data/jokes.json');

async function readStore() {
  const raw = await readFile(DATA_PATH, 'utf8');
  return JSON.parse(raw);
}

async function writeStore(store) {
  await writeFile(DATA_PATH, JSON.stringify(store, null, 2));
}

async function getAllJokes() {
  const store = await readStore();
  return store.jokes;
}

async function addJoke(text) {
  const store = await readStore();
  const joke = { id: store.nextId, joke: text };
  store.jokes.push(joke);
  store.nextId += 1;
  await writeStore(store);
  return joke;
}

async function getRandomLocalJoke() {
  const jokes = await getAllJokes();
  return jokes[Math.floor(Math.random() * jokes.length)];
}

module.exports = { getAllJokes, addJoke, getRandomLocalJoke };
