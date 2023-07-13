import { toggleEditMode } from "./editDocument.js";
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
      alert("Document successfully saved!");

      const updatedDoc = { itemId: data.itemId, itemName: newDocument.itemName };
      updateDocumentList(updatedDoc);

      toggleEditMode(data);
    })
    .catch((error) => {
      console.log("An error occurred while saving the document:", error);
  });
  });

document.getElementById("newDocButton").addEventListener("click", function() {
  clearDocumentFields();
});

function clearDocumentFields() {
  const editTitle = document.getElementById("editTitle");
  const editor = tinymce.get("editor");
  const textResult = document.getElementById("textResult");

  editTitle.value = "";
  editor.setContent("");
  textResult.innerHTML = ""; 
}

document.addEventListener("DOMContentLoaded", function () {
  const createEditContainer = document.getElementById("createEditContainer");
  const documentItems = document.getElementById("documentItems");

  documentItems.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      // Clicked on the row, do nothing
      return;
    }

    createEditContainer.style.display = "block";
  });

  newDocButton.addEventListener("click", function () {
    createEditContainer.style.display = "block";
  });
});
