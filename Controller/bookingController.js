const stripe = require("stripe");
const userModel=require("../Model/user");
const productModel=require("../Model/product");
const bookingModel=require("../Model/booking");

const stripeObj=stripe('sk_test_51JNa7BSEp71BuU6xZ0z1nCKtbkNrWN7X74N0aMDh3vDT9pYBDHnNJ8Ks9DZYjmL1Q9ahKRAGv2B9ztyBINy8jN3C00WPUcdj20');



async function createPaymentSession(req,res){
              try{
                  const userId=req.id;
                  const {productId}=req.body;
                //  console.log(productId);
                  const product=await productModel.findById(productId);
                 
                  const user=await userModel.findById(userId);
                  console.log(product);
                  console.log(user);
                  const session=await stripeObj.checkout.sessions.create({
                    payment_method_types: ['card'],
                    // customer:user.name,
                    customer_email:user.email,
                    line_items: [
                      {
                        price_data: {
                          currency: 'usd',
                          product_data: {
                            name: product.name,
                          },
                          unit_amount: product.price,
                        },
                        quantity: 1,
                      },
                    ],
                    mode: 'payment',
                    success_url: 'https://ecommerseee.herokuapp.com/',
                    cancel_url: 'https://ecommerseee.herokuapp.com/',
                  });
                  res.json({
                      session
                  })
              }
              catch(error){
                res.json({
                    message:"Failed to create payment session",
                    error
                })
              }
}
async function checkoutComplete(req,res){
  console.log("Checkout complete ran !!");
  console.log("Request object");
  conole.log(req);
}



module.exports.createPaymentSession=createPaymentSession;
module.exports.checkoutComplete=checkoutComplete;