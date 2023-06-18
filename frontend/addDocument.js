document.getElementById("saveBtn").addEventListener("click", function(e) {
  e.preventDefault();

  let user = localStorage.getItem("username");
  console.log(user);

  function removeHtmlTags(content) {
    const regex = /(<([^>]+)>)/gi;
    return content.replace(regex, "");
  }
  
  let newDocument = {
    documentTitle: document.getElementById("editTitle").value,
    documentContent: removeHtmlTags(tinymce.activeEditor.getContent()),
  }

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
  });
})

document.getElementById("newDocButton").addEventListener("click", function() {
  clearDocumentFields();
});

function clearDocumentFields() {
  const editTitle = document.getElementById("editTitle");
  const editor = tinymce.get("editor");
  const textResult = document.getElementById("textResult");

  editTitle.value = "";
  editor.setContent("");
  textResult.innerHTML = ""; // Clear the content of textResult
}

// Add an event listener to show the createEditContainer when needed
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
