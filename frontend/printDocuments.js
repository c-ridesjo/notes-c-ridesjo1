import { deleteDocument } from "./removeDocument.js";
import { toggleEditMode } from "./editDocument.js";

export function fetchAndPrintDocuments() {
  fetch("http://localhost:3000/documents/items")
    .then((response) => response.json())
    .then((data) => {
      const documentList = document.getElementById("documentItems");
      documentList.innerHTML = "";

      data.forEach((doc) => {
        console.log('Printing document:', doc);
        const listItem = document.createElement("li");
        listItem.id = doc.itemId;

        const documentName = document.createElement("span");
        documentName.textContent = doc.itemName; 
        documentName.addEventListener("click", () => {
          toggleEditMode(doc);
        });

        listItem.appendChild(documentName);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", (event) => {
          event.stopPropagation();
          deleteDocument(doc.itemId);
        });

        listItem.appendChild(deleteButton);

        listItem.setAttribute("data-id", doc.itemId); 

        documentList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.log("An error occurred while fetching documents:", error);
    });
}

export function updateDocumentList(doc) {
  console.log('updateDocumentList called with:', doc);
  const documentList = document.getElementById("documentItems");

  let listItem = documentList.querySelector(`li[data-id="${doc.itemId}"]`);

  if (listItem) { 
    const documentName = listItem.querySelector("span");
    documentName.textContent = doc.itemName;
  } else { 
    listItem = document.createElement("li");
    listItem.setAttribute("data-id", doc.itemId);

    const documentName = document.createElement("span");
    documentName.textContent = doc.itemName;
    documentName.addEventListener("click", () => {
      toggleEditMode(doc);
    });

    listItem.appendChild(documentName);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteDocument(doc.itemId);
    });

    listItem.appendChild(deleteButton);

    documentList.appendChild(listItem);
  }
}
