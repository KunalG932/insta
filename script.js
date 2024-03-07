document.addEventListener('DOMContentLoaded', () => {
    const player = new Plyr('#instagramVideo');
    applyTheme(); // Apply theme on page load
});

function applyTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
    } else {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.body.setAttribute('data-theme', prefersDarkMode ? 'dark' : 'light');
    }
}

function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

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
        <video id="instagramVideo" controls>
            <source src="${videoUrl}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>
    <div class="controls">
        <button onclick="downloadVideo('${videoUrl}')">Download</button>
    </div>`;

                loadingBar.style.width = '0%';

                // Re-initialize Plyr after adding the new video element
                const player = new Plyr('#instagramVideo');
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
