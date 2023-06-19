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
    if (doc.itemContent) {
      editor.setContent(doc.itemContent);
    }

    saveButton.removeEventListener("click", saveUpdatedDocument);

    saveButton.addEventListener("click", () => {
      saveUpdatedDocument(editor.getContent(), editTitle.value, doc.itemId);
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