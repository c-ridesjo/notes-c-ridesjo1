import { fetchAndPrintDocuments, displayDocument } from './printDocuments.js';

// Function to toggle between display and edit mode
function toggleEditMode() {
    const documentDisplay = document.getElementById('documentDisplay');
    const documentEditor = document.getElementById('documentEditor');
    const editTitle = document.getElementById('editTitle');
    const editContent = document.getElementById('editContent');
  
    // Toggle the visibility of the display and editor sections
    documentDisplay.style.display = 'none';
    documentEditor.style.display = 'block';
  
    // Set the editor fields with the current document's data
    editTitle.value = documentTitle.textContent;
    editContent.value = documentContent.textContent;
  }
  
  // Function to save the edited document
  function saveDocument() {
    const editTitle = document.getElementById('editTitle');
    const editContent = document.getElementById('editContent');
  
    // Make a PUT request to update the document on the backend
    fetch(`"http://localhost:3000/documents/items"/${document.itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        itemId: document.itemId,
        itemName: editTitle.value,
        itemContent: editContent.value
      })
    })
      .then(response => response.json())
      .then(data => {
        // Update the document's data and display it
        document.itemName = data.itemName;
        document.itemContent = data.itemContent;
        displayDocument(document);
      })
      .catch(error => console.error(error));
  }
  
  // Attach event listeners to the edit and save buttons
  const editButton = document.getElementById('editButton');
  const saveButton = document.getElementById('saveButton');
  editButton.addEventListener('click', toggleEditMode);
  saveButton.addEventListener('click', saveDocument);