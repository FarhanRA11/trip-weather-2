// pages/api/randomDog.js

export default async function handler(req, res) {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching random dog:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
