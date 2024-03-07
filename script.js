function downloadInstagram() {
    const instagramUrl = document.getElementById('instagramUrl').value.trim();
    const loadingBar = document.getElementById('loadingBar');
    const downloadResult = document.getElementById('downloadResult');

    // Check if the URL is empty
    if (instagramUrl === '') {
        alert('Please enter a valid Instagram URL.');
        return;
    }

    const apiUrl = 'https://lexica.qewertyy.dev/downloaders/instagram?url=' + encodeURIComponent(instagramUrl);

    loadingBar.style.width = '0%';

    fetch(apiUrl, { method: 'POST', headers: { 'Accept': 'application/json' } })
        .then(response => response.json())
        .then(data => {
            if (data.code === 2 && data.content.length > 0) {
                const videoUrl = data.content[0].url;

                loadingBar.style.width = '100%';

                downloadResult.innerHTML = `
    <div class="video-container">
        <video controls>
            <source src="${videoUrl}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>
    <div class="controls">
        <button onclick="downloadVideo('${videoUrl}')">Download</button>
    </div>`;

                loadingBar.style.width = '0%';
            } else {
                alert('Error downloading content. Please check the URL.');
                loadingBar.style.width = '0%';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
            loadingBar.style.width = '0%';
        });
}

function downloadVideo(videoUrl) {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = 'downloaded_video.mp4';
    link.click();
}
