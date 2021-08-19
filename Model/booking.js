const mongoose=require("mongoose");
// const { DB_LINK } = require("../secrets/secrets");


const DB_LINK=process.env.DB_LINK;
mongoose.connect(DB_LINK,
              {userNewURLParser:true, useUnifiedTopology:true}
              )
              .then((db)=>{
                            console.log(db);
              });
              const bookingProductSchema=new mongoose.Schema({
                            prodId:{
                                          type:String,
                                          require:true
                            },
                            prodName:{
                                          type:String,
                                          require:true
                            },
                            currentPrice:{
                                          
                                          type:String,
                                          require:true
                            },
                            bookedOn:{
                                          type:String,
                                          default:Date.now()
                            }
              })

              const bookingSchema=new mongoose.Schema({
                            userId:{
                                          type:String,
                                          require:true
                            },
                            bookedProd:{
                                          type:[],
                                          require:true
                            }
              })

          
const bookingModel=mongoose.model("bookingCollection",bookingSchema);
module.exports=bookingModel;