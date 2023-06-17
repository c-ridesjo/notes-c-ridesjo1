// Function to delete a document
export function deleteDocument(itemId) {
  fetch(`http://localhost:3000/documents/items/${itemId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      const documentList = document.getElementById("documentItems");
      const listItem = documentList.querySelector(`li[data-id="${itemId}"]`);

      if (listItem) {
        listItem.remove();
      }

      const documentTitle = document.getElementById("documentTitle");
      const documentContent = document.getElementById("documentContent");
      documentTitle.textContent = "";
      documentContent.textContent = "";
    })
    .catch((error) => console.error(error));
}

const deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener("click", () => {
  // Retrieve the itemId from the document element or wherever it is stored
  const itemId = document.getElementById("itemId").value;
  deleteDocument(itemId);
});
