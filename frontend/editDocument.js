import { fetchAndPrintDocuments } from "./printDocuments.js";

export function toggleEditMode(document) {
  const documentDisplay = document.getElementById("documentDisplay");
  const documentEditor = document.getElementById("documentEditor");

  if (documentDisplay && documentEditor) {
    const editTitle = document.getElementById("editTitle");
    const editor = tinymce.get("editor");
    const saveButton = document.getElementById("saveBtn");

    documentDisplay.style.display = "none";
    documentEditor.style.display = "block";

    editTitle.value = document.itemName;
    editor.setContent(document.itemContent);

    // Remove existing event listener before adding it again
    saveButton.removeEventListener("click", saveUpdatedDocument);

    saveButton.addEventListener("click", () => {
      saveUpdatedDocument(document.itemId);
    });
  }
}

function saveUpdatedDocument(itemContent, itemName) {
  let content = {
    updatedContent: itemContent.value,
    updatedTitle: itemName.value
  };

  console.log(content);

  fetch("http://localhost:3000/documents/items/${itemId}", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      alert("Changes applied!")
    });
}

const addDocumentForm = document.getElementById("addDocumentForm");

if (addDocumentForm) {
  addDocumentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const documentTitleInput = document.getElementById("documentTitle");
    const documentContentInput = tinymce.get("editor").getContent();

    if (documentTitleInput && documentContentInput) {
      const documentTitle = documentTitleInput.value;
      const documentContent = documentContentInput;

      console.log("Creating new document...");
      console.log("Document title:", documentTitle);
      console.log("Document content:", documentContent);

      fetch("http://localhost:3000/documents/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemName: documentTitle,
          itemContent: documentContent,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Create response:", data);
          documentTitleInput.value = "";
        })
    }
  })
}
