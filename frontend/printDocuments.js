import { deleteDocument } from "./removeDocument.js";

export function fetchAndPrintDocuments() {
  fetch("http://localhost:3000/documents/items")
    .then((response) => response.json())
    .then((data) => {
      const documentList = document.getElementById("documentItems");
      documentList.innerHTML = "";

      data.forEach((doc) => {
        const listItem = document.createElement("li");
        listItem.textContent = doc.itemName;

        listItem.addEventListener("click", () => {
          const editTitle = document.getElementById("editTitle");
          const editor = tinymce.get("editor");

          editTitle.value = doc.itemName;
          editor.setContent(doc.itemContent);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
          deleteDocument(doc.itemId);
        });

        listItem.appendChild(deleteButton);

        documentList.appendChild(listItem);

        // Check if the document is the newly created document
        if (doc.isNewlyCreated) {
          document.itemName = doc.itemName;
          document.itemContent = doc.itemContent;
        }
      });
    })
    .catch((error) => {
      console.log("An error occurred while fetching documents:", error);
    });
}
