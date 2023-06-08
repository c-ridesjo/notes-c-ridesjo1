import { fetchAndPrintDocuments } from './printDocuments.js';

const addDocumentForm = document.getElementById('addDocumentForm');

if (addDocumentForm) {
  addDocumentForm.addEventListener('submit', event => {
    event.preventDefault();

    const documentTitleInput = document.getElementById('documentTitle');
    const documentContentInput = tinymce.get('editor').getContent();

    if (documentTitleInput && documentContentInput) {
      const documentTitle = documentTitleInput.value;
      const documentContent = documentContentInput.value;

      // Send a request to the backend API to add the new document
      fetch('http://localhost:3000/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          itemName: documentTitle,
          itemContent: documentContent
        })
      })
        .then(response => response.json())
        .then(data => {
          // Clear the form inputs
          documentTitleInput.value = '';
          documentContentInput.value = '';

          // Fetch and print the updated document list
          fetchAndPrintDocuments();
        })
        .catch(error => console.error(error));
    }
  });
}