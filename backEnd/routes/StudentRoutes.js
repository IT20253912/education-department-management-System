const express = require("express");
const router = express.Router();
const { 
  addResult,
    getResult,
    UpdateResult,
    removerResult,
    getSpec,

} = require("../controller/StudentController");

//addResult
router.post("/",addResult);
//getResult
router.get("/all",getResult);
//UpdateResult
router.put("/:id",UpdateResult);
//DeleteResult
router.delete("/:id",removerResult);
//getSpec
router.get("/:id",getSpec);


module.exports = router;