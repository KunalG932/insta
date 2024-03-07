function downloadInstagramVideo() {
  const apiUrl = 'https://lexica.qewertyy.dev/downloaders/instagram?url=';
  const instagramUrlInput = document.getElementById('instagramUrl');
  const instagramUrl = instagramUrlInput.value.trim();

  if (instagramUrl) {
    fetch(apiUrl + encodeURIComponent(instagramUrl))
      .then(response => response.json())
      .then(data => {
        if (data.code === 2 && data.content.length > 0) {
          const videoUrl = data.content[0].url;
          displayVideo(videoUrl);
          downloadLink(videoUrl);
        } else {
          alert('Failed to fetch Instagram video. Please check the URL and try again.');
        }
      })
      .catch(error => {
        console.error('Error fetching Instagram video:', error);
        alert('An error occurred while fetching Instagram video. Please try again later.');
      });
  } else {
    alert('Please enter a valid Instagram URL.');
  }
}

function displayVideo(videoUrl) {
  const resultContainer = document.getElementById('result');
  resultContainer.innerHTML = `<video controls width="100%" src="${videoUrl}" type="video/mp4"></video>`;
}

function downloadLink(videoUrl) {
  const resultContainer = document.getElementById('result');
  const downloadButton = document.createElement('a');
  downloadButton.href = videoUrl;
  downloadButton.download = 'instagram_video.mp4';
  downloadButton.innerText = 'Download Video';
  resultContainer.appendChild(downloadButton);
}
