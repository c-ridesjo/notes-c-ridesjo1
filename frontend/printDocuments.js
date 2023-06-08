import { toggleEditMode } from './editDocument.js';
import { deleteDocument } from './removeDocument.js';

export function fetchAndPrintDocuments() {
  fetch("http://localhost:3000/documents/items")
    .then(response => response.json())
    .then(data => {
      const documentList = document.getElementById('documentItems');
      documentList.innerHTML = '';

      data.forEach(doc => {
        const listItem = document.createElement('li');
        listItem.textContent = doc.itemName;

        // Create edit and delete buttons
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
          toggleEditMode(doc);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
          deleteDocument(doc);
        });

        // Append the edit and delete buttons to the list item
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        // Add the list item to the document list
        documentList.appendChild(listItem);
      });
    })
    .catch(error => console.error(error));
}

export function displayDocument(doc) {
  const documentTitle = document.getElementById('documentTitle');
  const documentContent = document.getElementById('documentContent');

  documentTitle.textContent = document.itemName;
  documentContent.textContent = document.itemContent;
}