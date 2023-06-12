import { displayDocument } from './printDocuments.js';
import { deleteDocument } from './removeDocument.js';

// Initialize TinyMCE editor on the textarea
tinymce.init({
  selector: '#editContent',
  height: 300,
  plugins: 'autoresize',
  toolbar: 'bold italic underline | alignleft aligncenter alignright | bullist numlist',
  autoresize_bottom_margin: 16
});

// Function to toggle between display and edit mode
export function toggleEditMode() {
  console.log('toggleEditMode called');
    const documentDisplay = document.getElementById('documentDisplay');
    const documentEditor = document.getElementById('documentEditor');

    if (documentDisplay && documentEditor) {
      const editTitle = document.getElementById('editTitle');
      const editContent = tinymce.get('editor').getContent({ format: 'text' });
    
      // Toggle the visibility of the display and editor sections
      documentDisplay.style.display = 'none';
      documentEditor.style.display = 'block';
    
      // Set the editor fields with the current document's data
      editTitle.value = documentTitle.textContent;
      editContent.value = documentContent.textContent;
    }
  }
  
  // Function to save the edited document
  export function saveDocument() {
    const editTitle = document.getElementById('editTitle');
    const editContent = tinymce.get('editor').getContent();

    if (editTitle && editContent) {     
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
  }
  
  // Attach event listeners to the edit and save buttons
  const editButton = document.getElementById('editButton');

  editButton.addEventListener('click', editDocument);
  const saveButton = document.getElementById('saveButton');

  if (editButton && saveButton) {
    editButton.addEventListener('click', toggleEditMode);
    console.log('Edit button clicked');
    saveButton.addEventListener('click', saveDocument);
  }

  
// Function to edit the document
export function editDocument() {
  const editTitle = document.getElementById('editTitle');
  const editContent = tinymce.get('editor').getContent();

  if (editTitle && editContent) {
    // Update the document's data
    document.itemName = editTitle.value;
    document.itemContent = editContent.value;

    // Display the updated document
    displayDocument(document);
  }
}

