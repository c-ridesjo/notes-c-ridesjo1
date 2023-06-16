import { displayDocument } from "./printDocuments.js";

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
    saveButton.removeEventListener("click", saveDocument);

    saveButton.addEventListener("click", () => {
      saveDocument(document.itemId);
    });
  }
}


export function saveDocument(itemId) {
  const editTitle = document.getElementById("editTitle");
  const editor = tinymce.get("editor");
  const editContent = editor.getContent();

  if (editTitle && editor && editContent) {
    fetch(`http://localhost:3000/documents/items/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemId: itemId,
        itemName: editTitle.value,
        itemContent: editContent,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Save document response:", data);
        document.itemName = data.itemName;
        document.itemContent = data.itemContent;
        displayDocument(document);

        // Check if the saved document is already in the documentList
        const listItem = document.querySelector(`li[data-id="${itemId}"]`);
        if (listItem) {
          // Update the text content
          listItem.textContent = data.itemName;
        } else {
          // Create a new list item and add it to the documentList
          const listItem = document.createElement("li");
          listItem.textContent = data.itemName;
          listItem.setAttribute("data-id", data.itemId);

          const editButton = document.createElement("button");
          editButton.textContent = "Edit";
          editButton.addEventListener("click", () => {
            toggleEditMode(data);
          });

          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.addEventListener("click", () => {
            deleteDocument(data.itemId);
          });

          listItem.appendChild(editButton);
          listItem.appendChild(deleteButton);

          document.getElementById("documentItems").appendChild(listItem);
        }
      })
      .catch((error) => console.error(error));
  }
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
