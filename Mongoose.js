const mongoose = require("mongoose");
//Conect to the server
mongoose.connect("mongodb://localhost:27017/personsBD", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const schema = mongoose.Schema;

//Create a person schema

const personSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: {
    type: [String],
    default: undefined,
  },
});

const person = mongoose.model("person", personSchema);

//Create and Save a Record of a Model

const newPerson = new person ({
    name : "Hamza",
    age : 28,
    favoriteFoods : ["ma9rouna","couscous","mlo5iya"]
})
newPerson.save(function(err, data) {
        if(err){
            console.log(err)
        }
        console.log(data);
  });

person.insertMany([
{
    name : "ABS",
    age : 31 ,
    favoriteFoods : ["ma9loub","baget farce","m7amssa"]
},
{
    name : "Mouna",
    age : 29 ,
    favoriteFoods : ["ma9loub","baget farce","hergma"]
}

], function (err,data){
    if(err){
        console.log(err);
    }
    console.log(data);
})

// Search My Database

person.find(function(err,result){
    if(err){
        console.log(err)
    }
    console.log(result)
})

//Use model.findOne() to Return a Single Matching Document from My Database

person.findOne({name : "ABS"},function(err,result){
  if(err){
      console.log(err)
  }
  console.log(result)
})

//Use model.findById() to Search My Database By _id ("Mouna")

person.findById("6102c28f3af2322af0e6ff1a", function (err, result) {
  if(err){
    console.log(err)
  }
  console.log(result)
});

//Classic Updates by Running Find, Edit, then Save


person.findOne({name: "Mouna"}, function (err, data) {
  data.name = "Kefi";
  data.age = data.age;
  data.favoriteFoods = data.favoriteFoods;

  data.save(function (err) {
      if(err) {
          console.error('ERROR!');
      }
      console.log("done")
  });
});

//New Updates on a Document Using model.findOneAndUpdate()

person.findOneAndUpdate({name: "Hamza"}, {$set:{age:29}}, {new: true}, (err, data) => {
  if (err) {
      console.log("Something wrong when updating data!");
  }

  console.log(data);
});

// Delete One Document Using model.findByIdAndRemove

person.findByIdAndRemove("6102c28f3af2322af0e6ff1a", (err,res)=>{
  if (err) {
    console.log("Person Not Found")
  } else {
    console.log("Person Removed")
  }
})


//Delete Many Documents with model.remove()

  const res = person.remove({ name: 'Hamza' },(err,res)=>{
    if (err) {
      console.log('this nam not found')
    } else {
      console.log("people removed : ", res.deletedCount)
    }
  });

  //Chain Search Query Helpers to Narrow Search Results

  person.find({favoriteFoods:"burritos"})                  
  .limit(10)                
  .sort({name: 1})    
  .select("-age") 
  .exec()                   
  .then(data => {
     console.log(data)
   })
  .catch(err => {
     console.error(err)
   })