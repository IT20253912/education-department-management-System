const StudentModel = require("../model/StudentModel");


const addResult = (req, res) => {

    const {sid,olsubject1,olresult1,olsubject2,olresult2,olsubject3,olresult3,olsubject4,olresult4,olsubject5,olresult5,olsubject6,olresult6,olsubject7,olresult7,olsubject8,olresult8,olsubject9,olresult9,olsubject10,olresult10,alsubject1,alresult1,alsubject2,alresult2,alsubject3,alresult3,alsubject4,alresult4,alsubject5,alresult5,unisubject1,uniresult1,unisubject2,uniresult2,unisubject3,uniresult3,unisubject4,uniresul4,olschool,alschool,sclershipschool,olindex,alindex,sclershipindex,uniname,degreename,degreeclass,fullname,nic,gender,bod} = req.body;

    const addresult = new StudentModel({
        sid,
        olsubject1,
        olresult1,
        olsubject2,
        olresult2,
        olsubject3,
        olresult3,
        olsubject4,
        olresult4,
        olsubject5,
        olresult5,
        olsubject6,
        olresult6,
        olsubject7,
        olresult7,
        olsubject8,
        olresult8,
        olsubject9,
        olresult9,
        olsubject10,
        olresult10,
        alsubject1,
        alresult1,
        alsubject2,
        alresult2,
        alsubject3,
        alresult3,
        alsubject4,
        alresult4,
        alsubject5,
        alresult5,
        unisubject1,
        uniresult1,
        unisubject2,
        uniresult2,
        unisubject3,
        uniresult3,
        unisubject4,
        uniresul4,
        olschool,
        alschool,
        sclershipschool,
        olindex,
        alindex,
        sclershipindex,
        uniname,
        degreename,
        degreeclass,
        fullname,
        nic,
        gender,
        bod,
        

        
    });

//addResult
    addresult.save().then((makeresult)=>{
        res.json(makeresult);
    }).catch((err)=>{
        console.log(console.error);     
    });
};

//getallresults
const getResult = async (req, res, next) => {
  

    // try{
    //   const cors = await StudentModel.find();
    //   res.json(cors);
  
    // }catch(error){
    //   res.status(400).json(error);
    // }

    StudentModel.find(function (err,citizendata) {
      if(!err) {
        res.send(citizendata);
      }
    })


  }

//updateResult
  const UpdateResult = async (req, res) => {
    const ResultID = req.params.id;
  
    try {
      const cRs = await StudentModel.findById(ResultID);
  
      if(!cRs){
        return res.status(404).json("There is a no ResultID");
      }
  
      const {sid,olsubject1,olresult1,olsubject2,olresult2,olsubject3,olresult3,olsubject4,olresult4,olsubject5,olresult5,olsubject6,olresult6,olsubject7,olresult7,olsubject8,olresult8,olsubject9,olresult9,olsubject10,olresult10,alsubject1,alresult1,alsubject2,alresult2,alsubject3,alresult3,alsubject4,alresult4,alsubject5,alresult5,unisubject1,uniresult1,unisubject2,uniresult2,unisubject3,uniresult3,unisubject4,uniresul4,olschool,alschool,sclershipschool,olindex,alindex,sclershipindex,uniname,degreename,degreeclass,fullname,nic,gender,bod} = req.body;
      
      const cor = await StudentModel.findByIdAndUpdate(ResultID, {sid,olsubject1,olresult1,olsubject2,olresult2,olsubject3,olresult3,olsubject4,olresult4,olsubject5,olresult5,olsubject6,olresult6,olsubject7,olresult7,olsubject8,olresult8,olsubject9,olresult9,olsubject10,olresult10,alsubject1,alresult1,alsubject2,alresult2,alsubject3,alresult3,alsubject4,alresult4,alsubject5,alresult5,unisubject1,uniresult1,unisubject2,uniresult2,unisubject3,uniresult3,unisubject4,uniresul4,olschool,alschool,sclershipschool,olindex,alindex,sclershipindex,uniname,degreename,degreeclass,fullname,nic,gender,bod});
  
    } catch (error) { 
      res.status(400).json(error.message);
    }
  }

  //deleteResult
  const removerResult = async (req,res) => {
    const ResultID = req.params.id;
  
    try{
      const crs = await StudentModel.findById(ResultID);
      if(!crs){
        return res.status(404).json("There is no Student Result to remove");
      }
  
      const removerResult = await StudentModel.findByIdAndDelete(ResultID);
      res.status(200).json(removerResult)
    }catch(error){
      res.status(400).json(error.message);
  
    }
  }


  //get spesific


/*
  const getSpec = async (req,res) => {

    let ResultID = req.params.id;
    const user = await  StudentModel.findById(ResultID)
        .then((user) => {

            res.status(200).send({status: "search success",user})

        }).catch(() => {

            console.log(err.message);
            res.status(500).send({status: "Error ", error: err.message});

        })

}

*/



const getSpec = async (req, res) => {
  try {
    const id = req.params.id;
    const couRse = await StudentModel.findById(id);
    res.status(200).json(couRse);
  } catch (error) {
    res.status(400).json(error);
    }
  };






  module.exports ={
    addResult,
    getResult,
    UpdateResult,
    removerResult,
    getSpec,
    
  }