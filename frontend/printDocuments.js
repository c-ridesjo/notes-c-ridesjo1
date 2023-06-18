import { deleteDocument } from "./removeDocument.js";
import { toggleEditMode } from "./editDocument.js";

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
          const textResult = document.getElementById("textResult");

          editTitle.value = doc.itemName;
          editor.setContent(doc.itemContent);
          textResult.innerHTML = doc.itemContent;

          toggleEditMode(doc); 

          document.getElementById("documentEditor").scrollIntoView({ behavior: "smooth" });
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
          deleteDocument(doc.itemId);
        });

        listItem.appendChild(deleteButton);

        documentList.appendChild(listItem);

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