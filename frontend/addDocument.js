document.getElementById("saveBtn").addEventListener("click", function(e) {
  e.preventDefault();

  let user = localStorage.getItem("username");
  console.log(user);

  let newDocument = {
      newDocumentTitle: document.getElementById("title").value,
      newDocumentContent: tinymce.activeEditor.getContent()
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
