import { displayDocument } from "./printDocuments.js";

tinymce.init({
  selector: "#editContent",
  height: 300,
  plugins: "autoresize",
  toolbar:
    "bold italic underline | alignleft aligncenter alignright | bullist numlist",
  autoresize_bottom_margin: 16,
});

// Function to toggle between display and edit mode
export function toggleEditMode() {
  console.log("toggleEditMode called");
  const documentDisplay = document.getElementById("documentDisplay");
  const documentEditor = document.getElementById("documentEditor");

  if (documentDisplay && documentEditor) {
    const editTitle = document.getElementById("editTitle");
    const editContent = tinymce.get("editor").getContent({ format: "text" });

    documentDisplay.style.display = "none";
    documentEditor.style.display = "block";

    editTitle.value = documentTitle.textContent;
    editContent.value = documentContent.textContent;
  }
}

// Function to save the edited document
export function saveDocument() {
  const editTitle = document.getElementById("editTitle");
  const editContent = tinymce.get("editor").getContent();

  if (editTitle && editContent) {
    fetch(`"http://localhost:3000/documents/items"/${document.itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemId: document.itemId,
        itemName: editTitle.value,
        itemContent: editContent.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        document.itemName = data.itemName;
        document.itemContent = data.itemContent;
        displayDocument(document);
      })
      .catch((error) => console.error(error));
  }
}

const editButton = document.getElementById("editButton");

editButton.addEventListener("click", editDocument);
const saveButton = document.getElementById("saveButton");

if (editButton && saveButton) {
  editButton.addEventListener("click", toggleEditMode);
  console.log("Edit button clicked");
  saveButton.addEventListener("click", saveDocument);
}

// Function to edit the document
export function editDocument() {
  const editTitle = document.getElementById("editTitle");
  const editContent = tinymce.get("editor").getContent();

  if (editTitle && editContent) {
    document.itemName = editTitle.value;
    document.itemContent = editContent.value;

    displayDocument(document);
  }
}