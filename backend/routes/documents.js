var express = require("express");
var router = express.Router();

/*************************************************************** */
/*************************Documents****************************/
/**************************************************************** */

// Hämtar ALLA dokument från items"
router.get("/items", (req, res) => {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log("err", err);
    }

    let sql = `SELECT * FROM items `;

    req.app.locals.con.query(sql, (err, data) => {
      if (err) {
        console.log("err", err);
      }

      console.log("Dokument", data);

      res.json(data);
    });
  });
});

// Hämtar ETT specifikt dokument från items med itemName
router.get("/items/:itemName", (req, res) => {
  let itemName = req.params.itemName;

  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    let sql = `SELECT * FROM items WHERE itemName = ?`;

    req.app.locals.con.query(sql, [itemName], function (err, data) {
      if (err) {
        console.log(err);
      }

      console.log("dokument", data);

      res.json(data);
    });
  });
});

// Hämtar ETT specifikt dokument med itemId
router.get("/items/:itemId", function (req, res) {
  let itemId = req.params.itemId;

  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    let sql = `SELECT * FROM items WHERE itemId = ?`;

    req.app.locals.con.query(sql, [itemId], function (err, data) {
      if (err) {
        console.log(err);
      }

      console.log("data", data);

      res.json(data);
    });
  });
});

// Lägger till ett dokument under items"
router.post("/", function (req, res) {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    //let saveName = "Nytt dokument";         Ändrat här!!!
    let itemName = req.body.documentTitle;
    let itemContent = req.body.documentContent;

    let sql = `INSERT INTO items (itemName, itemContent) VALUES ('${itemName}', '${itemContent}')`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).json("Error occurred while saving the document.");
        return;
      }

      console.log("result", result);

      // Retrieve the updated list of documents from the database
      const updatedDocumentList = getUpdatedDocumentList();

      // Send the updated list back to the client
      res.json(updatedDocumentList);
    });
  });

  res.json("Dokument sparat!");
});

// Raderar ett dokument med itemId
router.delete("/items/:itemId", function (req, res) {
  let itemId = req.params.itemId;

  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    let sql = `DELETE FROM items WHERE itemId = ?`;

    req.app.locals.con.query(sql, [itemId], function (err, result) {
      if (err) {
        console.log(err);
      }

      console.log("Dokumentet har raderats.");

      res.json(result);
    });
  });
});

//Redigera/uppdatera ett dokument
router.put("/items/:itemId", function (req, res) {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    const { itemId, itemName, itemContent } = req.body;

    let sql = `UPDATE items SET itemName = ?, itemContent = ? WHERE itemId = ?`;

    req.app.locals.con.query(sql, [itemName, itemContent, itemId], function (err, result) {
      if (err) {
        console.log(err);
      }

      console.log("Dokumentet har uppdaterats.");

      res.json(result);
    });
  });
});

module.exports = router;
