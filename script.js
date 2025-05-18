let chartInstance = null;

async function searchBooks() {
  const query = document.getElementById('searchInput').value;
  const resultsContainer = document.getElementById('resultsContainer');
  const chartCanvas = document.getElementById('authorChart');

  resultsContainer.innerHTML = "Searching...";

  try {
    const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    resultsContainer.innerHTML = "";
    const authorCount = {};
    const topBooks = data.docs.slice(0, 10);

    topBooks.forEach(book => {
      const author = book.author_name?.[0] || "Unknown";
      authorCount[author] = (authorCount[author] || 0) + 1;

      const workKey = book.key;
      const bookDiv = document.createElement('div');
      bookDiv.classList.add('book');

      bookDiv.innerHTML = `
        <h3>
          <a href="#" onclick="showBookDetails('${workKey}')">${book.title}</a>
          <span style="cursor:pointer; float:right;" onclick='saveToFavorites(${JSON.stringify({
            title: book.title,
            author: author,
            key: book.key
          })})'>🔖</span>
        </h3>
        <p>Author: ${author}</p>
        <p>First published: ${book.first_publish_year || 'N/A'}</p>
        <div id="details-${workKey.replaceAll('/', '')}" class="book-details" style="display: none;"></div>
      `;

      resultsContainer.appendChild(bookDiv);
    });

    const topAuthors = Object.entries(authorCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const labels = topAuthors.map(a => a[0]);
    const counts = topAuthors.map(a => a[1]);

    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(chartCanvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Top Authors in Results',
          data: counts,
          backgroundColor: 'rgba(54, 162, 235, 0.7)'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            precision: 0
          }
        }
      }
    });

  } catch (error) {
    resultsContainer.innerHTML = "An error occurred. Please try again.";
    console.error(error);
  }
}

async function showBookDetails(workKey) {
  const detailDiv = document.getElementById(`details-${workKey.replaceAll('/', '')}`);
  if (!detailDiv) return;

  if (detailDiv.style.display === 'block') {
    detailDiv.style.display = 'none';
    return;
  }

  try {
    const res = await fetch(`https://openlibrary.org${workKey}.json`);
    const data = await res.json();

    detailDiv.innerHTML = `
      <p><strong>Description:</strong> ${data.description?.value || data.description || 'No description available.'}</p>
      ${data.subjects ? `<p><strong>Subjects:</strong> ${data.subjects.slice(0, 5).join(', ')}</p>` : ''}
    `;
    detailDiv.style.display = 'block';
  } catch (error) {
    detailDiv.innerHTML = `<p>Details could not be loaded.</p>`;
    detailDiv.style.display = 'block';
    console.error(error);
  }
}

function saveToFavorites(book) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (!favorites.find(b => b.key === book.key)) {
    favorites.push(book);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert(`🔖 "${book.title}" added to favorites!`);
  } else {
    alert(`⚠️ "${book.title}" is already in favorites.`);
  }
}