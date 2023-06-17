document.getElementById("saveBtn").addEventListener("click", function(e) {
  e.preventDefault();

  let user = localStorage.getItem("username");
  console.log(user);

  function removeHtmlTags(content) {
    const regex = /(<([^>]+)>)/gi;
    return content.replace(regex, "");
  }
  
  let newDocument = {
    documentTitle: document.getElementById("title").value,
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
