import { updateDocumentList } from "./printDocuments.js";

export function toggleEditMode(doc) {
  const documentDisplay = document.getElementById("documentDisplay");
  const documentEditor = document.getElementById("documentEditor");

  if (documentDisplay && documentEditor) {
    const editTitle = document.getElementById("editTitle");
    const editor = tinymce.get("editor");
    const saveButton = document.getElementById("saveBtn");
    const updateButton = document.getElementById("updateBtn");

    documentDisplay.style.display = "block";
    documentEditor.style.display = "block";

    if (doc.itemName) {
      editTitle.value = doc.itemName;
      editTitle.dataset.itemId = doc.itemId;
    } else {
      editTitle.value = ""; 
      delete editTitle.dataset.itemId;  
    }

    if (doc.itemContent) {
      editor.setContent(doc.itemContent);
      document.getElementById("textResult").innerHTML = doc.itemContent || "";  
    } else {
      editor.setContent(""); 
    }

    if (doc.itemId) {
      saveButton.style.display = "none";
      updateButton.style.display = "block";
    } else {
      saveButton.style.display = "block";
      updateButton.style.display = "none";
    }
  }
}


export function saveUpdatedDocument(itemContent, itemName, itemId) {
  return new Promise((resolve, reject) => {
let content = {
  updatedContent: itemContent.replace(/&nbsp;/g, ' ')
    .replace(/&aring;/g, 'å')
    .replace(/&auml;/g, 'ä')
    .replace(/&ouml;/g, 'ö')
    .replace(/&Aring;/g, 'Å')
    .replace(/&Auml;/g, 'Ä')
    .replace(/&Ouml;/g, 'Ö'),
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
      if (data.affectedRows === 1) {
        const updatedDocument = {
          itemId: itemId,
          itemName: itemName,
          itemContent: itemContent
        };

        const editor = tinymce.get("editor");
        editor.setContent(itemContent);  
        document.getElementById("textResult").innerHTML = itemContent;  

        updateDocumentList(updatedDocument, false);
        resolve("Document successfully saved!");
      } else {
        reject("Failed to save the document.");
      }
    })
    .catch((error) => {
        reject("An error occurred while saving the document: " + error);
    });
  });
}
