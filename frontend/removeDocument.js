// Function to delete a document
export function deleteDocument(itemId) {
  // Make a DELETE request to remove the document from the backend
  fetch(`http://localhost:3000/documents/items/${itemId}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => {
      // Remove the document from the UI
      const documentList = document.getElementById('documentItems');
      const listItem = documentList.querySelector(`li[data-id="${itemId}"]`);

      if (listItem) {
        listItem.remove();
      }

      // Clear the document display
      const documentTitle = document.getElementById('documentTitle');
      const documentContent = document.getElementById('documentContent');
      documentTitle.textContent = '';
      documentContent.textContent = '';
    })
    .catch(error => console.error(error));
}

// Attach event listener to the delete button
const deleteButton = document.getElementById('deleteButton');
deleteButton.addEventListener('click', () => deleteDocument(document.itemId));
