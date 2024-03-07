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
          if (content.type === 'image' || content.type === 'video') {
            downloadFile(content.url, content.type === 'image' ? 'instagram_image.jpg' : 'instagram_video.mp4');
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

function downloadFile(url, filename) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
