export function fetchAndPrintDocuments() {
    fetch("http://localhost:3000/documents/items")
      .then(response => response.json())
      .then(data => {
        const documentList = document.getElementById('documentItems');
        documentList.innerHTML = ''; // Clear the existing document list
  
        // Display the document items in the list
        data.forEach(document => {
          const listItem = document.createElement('li');
          listItem.textContent = document.itemName;
          listItem.addEventListener('click', () => {
            // Display the selected document
            displayDocument(document);
          });
          documentList.appendChild(listItem);
        });
      })
      .catch(error => console.error(error));
  }
  
  export function displayDocument(document) {
    const documentTitle = document.getElementById('documentTitle');
    const documentContent = document.getElementById('documentContent');
  
    // Update the document title and content
    documentTitle.textContent = document.itemName;
    documentContent.textContent = document.itemContent;
  }
  