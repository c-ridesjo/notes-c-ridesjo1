import { toggleEditMode, saveUpdatedDocument } from "./editDocument.js";
import { updateDocumentList } from "./printDocuments.js";

document.getElementById("saveBtn").addEventListener("click", function(e) {
  e.preventDefault();

  let user = localStorage.getItem("username");
  console.log(user);

  function removeHtmlTags(content) {
    const regex = /(<([^>]+)>)/gi;
    return content.replace(regex, "");
  }
  
  let newDocument = {
    itemName: document.getElementById("editTitle").value,
    documentContent: removeHtmlTags(tinymce.activeEditor.getContent()),
  };

  console.log(newDocument);

  fetch("http://localhost:3000/documents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDocument),
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    let updatedDoc = {
      itemId: data.itemId,
      itemName: newDocument.itemName,
      itemContent: newDocument.documentContent
    };

    console.log('Before updateDocumentList in addDocument.js', updatedDoc);
    
    if (updatedDoc.itemId !== document.getElementById("editTitle").dataset.itemId) {
      updateDocumentList(updatedDoc, true);
    }

    document.getElementById("textResult").innerHTML = newDocument.documentContent; 
    toggleEditMode(updatedDoc); 
    alert("Document successfully saved!");
  })
    
    .catch((error) => {
      console.log("An error occurred while saving the document:", error);
  });
});

document.getElementById("updateBtn").addEventListener("click", function(e) {
  e.preventDefault();

  let user = localStorage.getItem("username");
  console.log(user);

  function removeHtmlTags(content) {
    const regex = /(<([^>]+)>)/gi;
    return content.replace(regex, "")
      .replace(/&nbsp;/g, ' ')
      .replace(/&aring;/g, 'å')
      .replace(/&auml;/g, 'ä')
      .replace(/&ouml;/g, 'ö')
      .replace(/&Aring;/g, 'Å')
      .replace(/&Auml;/g, 'Ä')
      .replace(/&Ouml;/g, 'Ö');
  }

  let documentId = document.getElementById("editTitle").dataset.itemId;
  let newDocument = {
    itemName: document.getElementById("editTitle").value,
    documentContent: removeHtmlTags(tinymce.activeEditor.getContent()),
  };

  if (documentId) {
    saveUpdatedDocument(newDocument.documentContent, newDocument.itemName, documentId)
      .then(() => {
        document.getElementById("textResult").innerHTML = newDocument.documentContent; 
      });
  }
  
});

document.getElementById("newDocButton").addEventListener("click", function() {
  clearDocumentFields();
});

function clearDocumentFields() {
  const editTitle = document.getElementById("editTitle");
  const editor = tinymce.get("editor");
  const textResult = document.getElementById("textResult");

  const saveButton = document.getElementById("saveBtn");
  const updateButton = document.getElementById("updateBtn");

  editTitle.value = "";
  delete editTitle.dataset.itemId;  
  editor.setContent("");
  textResult.innerHTML = ""; 

  saveButton.style.display = "block";  
  updateButton.style.display = "none"; 
}


document.addEventListener("DOMContentLoaded", function () {
  const createEditContainer = document.getElementById("createEditContainer");
  const documentItems = document.getElementById("documentItems");

  documentItems.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      return;
    }

    createEditContainer.style.display = "block";
  });

  newDocButton.addEventListener("click", function () {
    createEditContainer.style.display = "block";
  });
});
