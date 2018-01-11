const YouTube_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25';

function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: YouTube_SEARCH_URL,
    data: {
      q: `${searchTerm} in:name`,
      key:'AIzaSyB6APhpvK4amaMjT8b6VwWkwyqZFBw43js',
      per_page: 5
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}

function renderResult(result) {
  return `
    <div>
      <h2>
      <a class="js-result-name" href="${result.snippet.thumbnails}" target="_blank">${result.snippet.title}</a> by <a class="js-user-name" href="${result.snippet.title}" target="_blank">${result.snippet.title}</a></h2>
      <p>Description: <span class="js-watchers-count">${result.snippet.description}</span></p>
      <p>Channel Title: <span class="js-issues-count">${result.snippet.channelTitle}</span></p>
      <img src="${result.snippet.thumbnails.high.url}" alt="Smiley face" height="${result.snippet.thumbnails.high.height}" width="${result.snippet.thumbnails.high.width}">
    </div>
  `;
}

function displayYouTubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);
