import { toggleEditMode } from "./editDocument.js";
import { deleteDocument } from "./removeDocument.js";

//  Function to fetch and print documents
export function fetchAndPrintDocuments() {
  fetch("http://localhost:3000/documents/items")
    .then((response) => response.json())
    .then((data) => {
      const documentList = document.getElementById("documentItems");
      documentList.innerHTML = "";

      data.forEach((doc) => {
        const listItem = document.createElement("li");
        listItem.textContent = doc.itemName;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
          toggleEditMode(doc);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
          deleteDocument(doc.itemId);
        });

        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        documentList.appendChild(listItem);
      });
    })
    .catch((error) => console.error(error));
}

export function displayDocument() {
  const documentTitle = document.getElementById("documentTitle");
  const documentContent = document.getElementById("documentContent");

  documentTitle.textContent = document.itemName;
  documentContent.textContent = document.itemContent;
}