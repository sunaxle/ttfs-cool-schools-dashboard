/**
 * Document Viewer Logic.
 * Fetches Markdown files dynamically from the local file system using `marked.js`
 * and renders them in the browser. Handles missing params and fetching errors.
 */
const urlParams = new URLSearchParams(window.location.search);
const docPath = urlParams.get('doc');
const contentDiv = document.getElementById('content');
const errorMsg = document.getElementById('errorMsg');

if (!docPath) {
    contentDiv.style.display = 'none';
    errorMsg.textContent = "No document specified in the URL.";
} else {
    fetch(docPath)
    .then(response => {
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
    .then(markdown => {
        contentDiv.innerHTML = marked.parse(markdown);
    })
    .catch(error => {
        contentDiv.style.display = 'none';
        errorMsg.textContent = `Error loading document: ${docPath}. (${error.message}). Note: Browsers may block local file fetching due to CORS. You may need to run a local web server.`;
    });
}
