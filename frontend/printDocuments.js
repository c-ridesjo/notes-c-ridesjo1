export function fetchAndPrintDocuments() {
  fetch("http://localhost:3000/documents/items")
    .then(response => response.json())
    .then(data => {
      const documentList = document.getElementById('documentItems');
      documentList.innerHTML = '';

      data.forEach(doc => { // Rename the parameter to 'doc'
        const listItem = document.createElement('li');
        listItem.textContent = doc.itemName; // Update references to 'doc'
        listItem.addEventListener('click', () => {
          displayDocument(doc); // Update the parameter passed to 'displayDocument'
        });
        documentList.appendChild(listItem);
      });
    })
    .catch(error => console.error(error));
}

export function displayDocument(document) {
  const documentTitle = document.getElementById('documentTitle');
  const documentContent = document.getElementById('documentContent');

  documentTitle.textContent = document.itemName;
  documentContent.textContent = document.itemContent;
}
