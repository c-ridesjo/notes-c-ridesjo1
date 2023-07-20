export function toggleEditMode(doc) {
  const documentDisplay = document.getElementById("documentDisplay");
  const documentEditor = document.getElementById("documentEditor");

  if (documentDisplay && documentEditor) {
    const editTitle = document.getElementById("editTitle");
    const editor = tinymce.get("editor");
    const saveButton = document.getElementById("saveBtn");

    documentDisplay.style.display = "block";
    documentEditor.style.display = "block";

    // Check if doc has itemName and itemContent properties before setting them
    if (doc.itemName) {
      editTitle.value = doc.itemName;
    } else {
      editTitle.value = ""; // Clear the title field if itemName is not present
    }

    if (doc.itemContent) {
      editor.setContent(doc.itemContent);
    } else {
      editor.setContent(""); // Clear the content field if itemContent is not present
    }

    // Rest of the function remains the same
    saveButton.removeEventListener("click", saveUpdatedDocument);

    saveButton.addEventListener("click", () => {
      saveUpdatedDocument(editor.getContent(), editTitle.value, doc.itemId);
    });
  }
}


export function saveUpdatedDocument(itemContent, itemName, itemId) {
  return new Promise((resolve, reject) => {
    let content = {
      updatedContent: itemContent,
      updatedTitle: itemName,
    };

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
        if (data === "Dokumentet har uppdaterats.") {
          resolve("Document successfully saved!");
        } else {
          reject("Failed to save the document.");
        }

          updateDocumentList({ itemId: itemId, itemName: itemName });

      })
      .catch((error) => {
        reject("An error occurred while saving the document: " + error);
      });
  });
}
