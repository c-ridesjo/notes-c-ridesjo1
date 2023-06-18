export function toggleEditMode(doc) {
  const documentDisplay = document.getElementById("documentDisplay");
  const documentEditor = document.getElementById("documentEditor");

  if (documentDisplay && documentEditor) {
    const editTitle = document.getElementById("editTitle");
    const editor = tinymce.get("editor");
    const saveButton = document.getElementById("saveBtn");

    documentDisplay.style.display = "block";
    documentEditor.style.display = "block";

    editTitle.value = doc.itemName;
    editor.setContent(doc.itemContent);

    // Remove existing event listener before adding it again
    saveButton.removeEventListener("click", saveUpdatedDocument);

    saveButton.addEventListener("click", () => {
      saveUpdatedDocument(doc.itemContent, doc.itemName, doc.itemId);
    });
  }
}



function saveUpdatedDocument(itemContent, itemName, itemId) {
  let content = {
    updatedContent: itemContent,
    updatedTitle: itemName
  };

  console.log(content);

  fetch(`http://localhost:3000/documents/items/${itemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data); 
    });
}

