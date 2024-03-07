function downloadInstagram() {
    const instagramUrl = document.getElementById('instagramUrl').value.trim();
    const apiUrl = 'https://lexica.qewertyy.dev/downloaders/instagram?url=' + encodeURIComponent(instagramUrl);
    const loadingBar = document.getElementById('loadingBar');
    const downloadResult = document.getElementById('downloadResult');

    // Check if the URL is empty
    if (instagramUrl === '') {
        alert('Please enter a valid Instagram URL.');
        return;
    }

    loadingBar.style.width = '0%';

    fetch(apiUrl, { method: 'POST', headers: { 'accept': 'application/json' } })
        .then(response => response.json())
        .then(data => {
            if (data.code === 2) {
                loadingBar.style.width = '100%';
                setTimeout(() => {
                    downloadResult.innerHTML = `
                                                <div>
                                                    <button onclick="playVideo()">Play</button>
                                                    <button onclick="downloadVideo()">Download</button>
                                                </div>
                                                `;
                    loadingBar.style.width = '0%';
                }, 500);
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

function playVideo() {
    const video = document.getElementById('downloadedVideo');
    video.play();
}

function downloadVideo() {
    const video = document.getElementById('downloadedVideo');
    const source = video.querySelector('source');
    const videoUrl = source.src;

    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = 'downloaded_video.mp4';
    link.click();
}
