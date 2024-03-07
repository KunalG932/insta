function downloadInstagram() {
    const instagramUrl = document.getElementById('instagramUrl').value;
    const apiUrl = 'https://lexica.qewertyy.dev/downloaders/instagram?url=' + encodeURIComponent(instagramUrl);

    fetch(apiUrl, { method: 'POST', headers: { 'accept': 'application/json' } })
        .then(response => response.json())
        .then(data => {
            if (data.code === 2) {
                const downloadResult = document.getElementById('downloadResult');
                downloadResult.innerHTML = `<p>Download: <a href="${data.content[0].url}" target="_blank">Click here</a></p>`;
            } else {
                alert('Error downloading content. Please check the URL.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
}
