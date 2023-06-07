 // Function to delete a document
 export function deleteDocument() {
    // Make a DELETE request to remove the document from the backend
    fetch(`"http://localhost:3000/documents/items"/${document.itemId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        // Remove the document from the UI
        const documentList = document.getElementById('documentItems');
        const listItem = documentList.querySelector(`li[data-id="${document.itemId}"]`);
        listItem.remove();
  
        // Clear the document display
        documentTitle.textContent = '';
        documentContent.textContent = '';
      })
      .catch(error => console.error(error));
  }
  
  // Attach event listener to the delete button
  const deleteButton = document.getElementById('deleteButton');
  deleteButton.addEventListener('click', deleteDocument);
  