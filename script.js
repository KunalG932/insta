function downloadInstagramVideo() {
  const apiUrl = 'https://lexica.qewertyy.dev/downloaders/instagram?url=';
  const instagramUrl = prompt('Enter Instagram URL:');

  if (instagramUrl) {
    fetch(apiUrl + encodeURIComponent(instagramUrl))
      .then(response => response.json())
      .then(data => {
        if (data.code === 2 && data.content.length > 0) {
          const videoUrl = data.content[0].url;
          displayVideo(videoUrl);
        } else {
          alert('Failed to fetch Instagram video. Please check the URL and try again.');
        }
      })
      .catch(error => {
        console.error('Error fetching Instagram video:', error);
        alert('An error occurred while fetching Instagram video. Please try again later.');
      });
  }
}

function displayVideo(videoUrl) {
  const resultContainer = document.getElementById('result');
  resultContainer.innerHTML = `<video controls width="100%" src="${videoUrl}" type="video/mp4"></video>`;
}
