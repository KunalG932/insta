function downloadInstagramContent() {
  const apiUrl = 'https://lexica.qewertyy.dev/downloaders/instagram?url=';
  const instagramUrlInput = document.getElementById('instagramUrl');
  const instagramUrl = instagramUrlInput.value.trim();

  if (instagramUrl) {
    fetch(apiUrl + encodeURIComponent(instagramUrl))
      .then(response => response.json())
      .then(data => {
        if (data.code === 2 && data.content.length > 0) {
          const content = data.content[0];
          if (content.type === 'image') {
            displayImage(content.url);
            downloadLink(content.url, 'Download Image', 'instagram_image.jpg');
          } else if (content.type === 'video') {
            displayVideo(content.url);
            downloadLink(content.url, 'Download Video', 'instagram_video.mp4');
          } else {
            alert('Unsupported content type.');
          }
        } else {
          alert('Failed to fetch Instagram content. Please check the URL and try again.');
        }
      })
      .catch(error => {
        console.error('Error fetching Instagram content:', error);
        alert('An error occurred while fetching Instagram content. Please try again later.');
      });
  } else {
    alert('Please enter a valid Instagram URL.');
  }
}

function displayImage(imageUrl) {
  const resultContainer = document.getElementById('result');
  resultContainer.innerHTML = `<img src="${imageUrl}" alt="Instagram Image">`;
}

function displayVideo(videoUrl) {
  const resultContainer = document.getElementById('result');
  resultContainer.innerHTML = `<video controls width="100%" src="${videoUrl}" type="video/mp4"></video>`;
}

function downloadLink(url, text, filename) {
  const resultContainer = document.getElementById('result');
  const downloadButton = document.createElement('a');
  downloadButton.href = url;
  downloadButton.download = filename;
  downloadButton.innerText = text;
  resultContainer.appendChild(downloadButton);
}
