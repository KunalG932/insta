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
                    // Create the video element
                    const video = document.createElement('video');
                    video.controls = true;
                    video.src = data.content[0].url;

                    // Append the video element to downloadResult
                    downloadResult.innerHTML = '';
                    downloadResult.appendChild(video);

                    // Attach event listeners for play and download
                    video.addEventListener('click', () => playVideo(video));
                    video.addEventListener('contextmenu', (event) => downloadVideo(event, video));

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

function playVideo(video) {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function downloadVideo(event, video) {
    event.preventDefault(); // Prevent default context menu

    const source = video.querySelector('source');
    const videoUrl = source.src;

    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = 'downloaded_video.mp4';
    link.click();
}
