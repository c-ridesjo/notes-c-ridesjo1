/* const txtArea = document.getElementById("textArea");

export default function printTextEditor() {
    txtArea.innerHTML = `        <label>Titel:</label><br>
    <input type="text" id="title" name="title"><br>
    <label>Beskrivning:</label><br>
    <input type="text" id="description" name="description"><br>
    <label>Innehåll:</label>
    <textarea id="textContent"></textarea>
    <button id="saveBtn">Spara</button>`

    document.getElementById("saveBtn").addEventListener("click", function(e) {
        e.preventDefault();
    
        let user = localStorage.getItem("username");
        console.log(user);
    
        let newDocument = {
            userName: user,
            newDocumentTitle: document.getElementById("title").value,
            newDocumentDescription: document.getElementById("description").value,
            newDocumentContent: tinymce.activeEditor.getContent()
        }
    
        console.log(newDocument);
    
        fetch("http://localhost:3000/documents/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newDocument),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            alert("Document successfully saved!")
          });
    })
} */