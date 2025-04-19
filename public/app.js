document.addEventListener('DOMContentLoaded', () => {
    const randomJokeEl = document.getElementById('random-joke');
    const categoriesListEl = document.getElementById('categories-list');
    const jokesResultEl = document.getElementById('jokes-result');
  
    // Load a random joke on page load
    fetch('/jokebook/random')
      .then(res => res.json())
      .then(joke => {
        randomJokeEl.innerText = `${joke.setup} — ${joke.delivery}`;
      });
  
    // Load categories
    fetch('/jokebook/categories')
      .then(res => res.json())
      .then(categories => {
        categoriesListEl.innerHTML = ''; // Clear list
        categories.forEach(category => {
          const li = document.createElement('li');
          li.textContent = category;
          li.style.cursor = 'pointer';
          li.onclick = () => fetchCategory(category);
          categoriesListEl.appendChild(li);
        });
      });
  
    // Search by category
    document.getElementById('search-btn').onclick = () => {
      const cat = document.getElementById('search-category').value.trim();
      if (cat) fetchCategory(cat);
    };
  
    // Add a new joke
    document.getElementById('add-joke-form').onsubmit = (e) => {
      e.preventDefault();
      const category = document.getElementById('cat').value.trim();
      const setup = document.getElementById('setup').value.trim();
      const delivery = document.getElementById('delivery').value.trim();
  
      if (!category || !setup || !delivery) {
        alert('Please fill in all fields.');
        return;
      }
  
      fetch('/jokebook/joke/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, setup, delivery })
      })
      .then(res => res.json())
      .then(data => {
        alert('Joke added!');
        fetchCategory(category);
      });
    };
  
    // Helper function: Fetch jokes in a category
    function fetchCategory(category) {
      fetch(`/jokebook/joke/${category}`)
        .then(res => res.json())
        .then(jokes => {
          jokesResultEl.innerHTML = `<h3>Jokes in "${category}":</h3>`;
          jokes.forEach(j => {
            const li = document.createElement('li');
            li.textContent = `${j.setup} — ${j.delivery}`;
            jokesResultEl.appendChild(li);
          });
        })
        .catch(() => {
          jokesResultEl.innerHTML = `<p>No jokes found for "${category}".</p>`;
        });
    }
  });
  