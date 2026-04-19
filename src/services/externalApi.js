async function fetchExternalJoke() {
  const response = await fetch('https://icanhazdadjoke.com/', {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`External API responded with ${response.status}`);
  }
  const data = await response.json();
  return { joke: data.joke, source: 'icanhazdadjoke.com' };
}

module.exports = { fetchExternalJoke };
