const { Router } = require('express');
const { getAllJokes, addJoke, getRandomLocalJoke } = require('../services/jokeStore');
const { fetchExternalJoke } = require('../services/externalApi');

const router = Router();

router.get('/', (_req, res) => {
  res.json({ success: true, data: { status: 'ok', message: 'Dad Jokes API is running' } });
});

router.get('/jokes', async (_req, res, next) => {
  try {
    const jokes = await getAllJokes();
    res.json({ success: true, data: { count: jokes.length, jokes } });
  } catch (err) {
    next(err);
  }
});

router.get('/joke/external', async (_req, res, next) => {
  try {
    const joke = await fetchExternalJoke();
    res.json({ success: true, data: joke });
  } catch (err) {
    res.status(502).json({ success: false, error: err.message });
  }
});

router.get('/joke', async (req, res, next) => {
  try {
    const { source } = req.query;
    let joke;

    if (source === 'local' || (!source && Math.random() > 0.5)) {
      joke = await getRandomLocalJoke();
    } else {
      try {
        joke = await fetchExternalJoke();
      } catch {
        joke = await getRandomLocalJoke();
      }
    }

    res.json({ success: true, data: joke });
  } catch (err) {
    next(err);
  }
});

router.post('/jokes', async (req, res, next) => {
  try {
    const { joke } = req.body || {};
    if (!joke || typeof joke !== 'string' || !joke.trim()) {
      return res.status(400).json({
        success: false,
        error: 'joke field is required and must be a non-empty string',
      });
    }
    const newJoke = await addJoke(joke.trim());
    res.status(201).json({ success: true, data: newJoke });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
