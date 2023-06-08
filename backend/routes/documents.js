var express = require('express');
var router = express.Router();

/*************************************************************** */
/*************************Documents****************************/
/**************************************************************** */

// Hämtar ALLA dokument från items"                                     Fungerar
      router.get('/items', (req, res) => { 

  req.app.locals.con.connect(function(err){
    if (err) {
      console.log('err', err);
    }
    
    let sql = `SELECT * FROM items `   
  
    req.app.locals.con.query(sql, (err, data) => {
      if (err) {
        console.log('err', err);
      }

      console.log('Dokument', data);

      res.json(data);                                                

    })
  })
});


// Hämtar ETT specifikt dokument från items med itemName                Fungerar
  router.get('/items/:itemName', (req, res) => {
    let itemName = req.params.itemName

  req.app.locals.con.connect(function(err){
    if (err) {
      console.log(err);
    }
    
    let sql = `SELECT * FROM items WHERE itemName = ?`     

    req.app.locals.con.query(sql, [itemName], function(err, data) {
      if (err) {
        console.log(err);
      }

      console.log('dokument', data);

      res.json(data);                                                

    })
  })
});  

// Hämtar ETT specifikt dokument med itemId             // Visar bara [] i localhost
router.get('/items/:itemId', function(req, res) {    // Fungerar när jag kör SQL direkt i databasen

  let itemId = req.params.itemId;

  req.app.locals.con.connect(function(err){
    if (err) {
      console.log(err);
    }
    
    let sql = `SELECT * FROM items WHERE itemId = ?`;          

    req.app.locals.con.query(sql, [itemId], function (err, data) {
        if (err) {
          console.log(err);
        }

        console.log('data', data);

        res.json(data);

      })
  })
}); 


// Lägger till ett dokument under items"                             Fungerar  
 router.post('/', function(req, res) {

  req.app.locals.con.connect(function(err){
    if (err) {
      console.log(err);
    }

    let saveName = 'Nytt dokument';
   
    let sql = `INSERT INTO items (itemName) VALUES ('${saveName}')`    

    req.app.locals.con.query(sql, function(err, result){
      if (err) {
        console.log(err);
      }

      console.log('result', result);
    })
  })

  res.json('Dokument sparat!');                                    
});


// Raderar ett dokument med itemId                                    Fungerar 
router.delete('/items/:itemId', function(req, res) {
  let itemId = req.params.itemId;

  req.app.locals.con.connect(function(err){
    if (err) {
      console.log(err);
    }
    
    let sql = `DELETE FROM items WHERE itemId = ?`;       

    req.app.locals.con.query(sql, [itemId], function(err, result) {
        if (err) {
          console.log(err);
        }

        console.log('Dokumentet har raderats.');      

        res.json(result);

      })
  })
});  


//Redigera/uppdatera ett dokument                                      Fungerar
 router.put('/items/:itemId', function(req, res) {

  req.app.locals.con.connect(function(err){
    if (err) {
      console.log(err);
    }

    const {itemId, itemName} = req.body;
    
    let sql = `UPDATE items SET itemName = ? WHERE itemId = ?`;

    req.app.locals.con.query(sql, [itemName, itemId], function (err, result) {
        if (err) {
          console.log(err);
        }
      
        console.log('Dokumentet har uppdaterats.');  

        res.json(result);

      })
  })
});

/*********************************************** */
/****************LISTS************************* */
/*********************************************** */

// Hämtar alla listor från lists                        Fungerar 
/*  router.get("/lists", (req, res) => {

  req.app.locals.con.connect(function(err){
      if (err) {
          console.log("err", err);
      }

      req.app.locals.con.query("SELECT * FROM lists" , (err, data) => {
          if (err) {
              console.log("err", err);
          }

          console.log("Listor", data);
          res.json(data)
      })
  })
}) */


/* // Hämtar alla dokument (som tillhör en särskild lista) med listId      // Kolla igen, samma route som nedan
router.get('/lists/:listId', function(req, res) {

  let listId = req.params.listId;

  req.app.locals.con.connect(function(err){
    if (err) {
      console.log(err);
    }
    
    let sql = `SELECT * FROM items WHERE listId = ` + listId          

    req.app.locals.con.query(sql, function (err, result) {
        if (err) {
          console.log(err);
        }

        console.log('result', result);

        res.json(result);

      })
  })
}); */  


/* // Hämtar en specifik lista med listId                     Fungerar
router.get('/lists/:listId', function(req, res) {

  let listId = req.params.listId;

  req.app.locals.con.connect(function(err){
    if (err) {
      console.log(err);
    }
    
    let sql = `SELECT * FROM lists WHERE listId = ` + listId          

    req.app.locals.con.query(sql, function (err, data) {
        if (err) {
          console.log(err);
        }

        console.log('data', data);

        res.json(data);

      })
  })
});  


// Hämtar en specifik lista med listName            // Fungerar????
router.get('/lists/:listName', function(req, res) {

  let listName = req.params.listName;

  req.app.locals.con.connect(function(err){
    if (err) {
      console.log(err);
    }
    
    let sql = `SELECT * FROM lists WHERE listName = ${listName}`          

    req.app.locals.con.query(sql, function (err, data) {
        if (err) {
          console.log(err);
        }

        console.log('data', data);

        res.json(data);

      })
  })
});  


// Lägger till en ny lista under lists                Fungerar
  router.post('/lists', function(req, res) {

  req.app.locals.con.connect(function(err){
    if (err) {
      console.log(err);
    }

    let saveName = 'Öppenvård';
   
    let sql = `INSERT INTO lists (listName) VALUES ('${saveName}')`    

    req.app.locals.con.query(sql, function(err, data){
      if (err) {
        console.log(err);
      }

      console.log('data', data);
    })
  })

  res.json('Lista sparad!');                                    
}); 


// Raderar en lista med listId        XXX      // Fungerar 
router.delete('/lists/:listId', function(req, res) {

  req.app.locals.con.connect(function(err){
    if (err) {
      console.log(err);
    }
    
    let sql = `DELETE FROM lists WHERE listId = ${listId} `       

    req.app.locals.con.query(sql, function (err, data) {
        if (err) {
          console.log(err);
        }

        console.log('Listan har raderats.');      

        res.json(data);

      })
  })
});  

//Redigera/uppdatera en lista med listId              XXX      Fungerar!
 router.put('/lists/:listId', function(req, res) {

  req.app.locals.con.connect(function(err){
    if (err) {
      console.log(err);
    }

    const {listId, listName} = req.body
    
    let sql = `UPDATE items SET listName = ? WHERE listId = ?`+ [listName, listId]   

    req.app.locals.con.query(sql, function (err, data) {
        if (err) {
          console.log(err);
        }
      
        console.log('Listan har uppdaterats.');  

        res.json(data);

      })
  })
});  
 */

module.exports = router;  
