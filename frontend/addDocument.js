const addDocumentForm = document.getElementById("addDocumentForm");

if (addDocumentForm) {
  addDocumentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const documentTitleInput = document.getElementById("documentTitle");
    const documentContentInput = tinymce.get("editor").getContent();

    if (documentTitleInput && documentContentInput) {
      const documentTitle = documentTitleInput.value;
      const documentContent = documentContentInput;

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

          // Call fetchAndPrintDocuments to update the document list
          fetchAndPrintDocuments();
        })
        .catch((error) => console.error(error));
    }
  });
}
