function downloadInstagram() {
    const instagramUrl = document.getElementById('instagramUrl').value;
    const apiUrl = 'https://lexica.qewertyy.dev/downloaders/instagram?url=' + encodeURIComponent(instagramUrl);
    const loadingBar = document.getElementById('loadingBar');
    const downloadResult = document.getElementById('downloadResult');

    loadingBar.style.width = '0%';

    fetch(apiUrl, { method: 'POST', headers: { 'accept': 'application/json' } })
        .then(response => response.json())
        .then(data => {
            if (data.code === 2) {
                loadingBar.style.width = '100%';
                setTimeout(() => {
                    downloadResult.innerHTML = `<video controls>
                                                    <source src="${data.content[0].url}" type="video/mp4">
                                                </video>`;
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
