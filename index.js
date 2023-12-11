const express = require("express");
const { v4: uuidv4 } = require('uuid');


const app = express();

app.use(express.json());

app.use(express.urlencoded(
    {
        extended : true
    }
));

const productData = [];

app.listen(2000, () => {
     
    console.log("Connect to sever at 2000");
})

//update method

app.post("/api/update/:id" , (req,res)=> {


     let id = req.params.id*1;
     let productToUpdate = productData.find(p=>p.id === id);
     let index = productData.indexOf(productToUpdate);

     productData[index] =req.body;

     res.status(200).send({
        "status" : "success",
        'message' : "Product update"
     })
})

//delete method

app.post("/api/delete/:id",  (req,res)=> {

    let id= req.params.id*1;
    let productToUpdate= productData.find(p=>p.id === id);
    let index = productData.indexOf(productToUpdate);

    productData.splice(index,1);

    res.status(204).send({
        "status" : "success",
        "message" : "Product deleted"
    })
})


//post method 

app.post("/api/add_product" , (req, res)=>{
    console.log("Result", req.body);

    const pdata = {
        "id" :  productData.length+1 ,
        "pname" : req.body.pname,
        "pprice" : req.body.pprice,
        "pdesc" : req.body.pdesc,
    };

    productData.push(pdata);

    console.log("final" ,pdata);

    res.status(200).send({
        "status_code" : 200,
        "message" : "Product added successfully",
        "product" : pdata,
    });
});

//get method
app.get("/api/get_product", (req,res) => {

    if(productData.length > 0){
        res.status(200).send({
            "status_code" : 200,
            "product" : productData
        })
    }else{
        res.status(200).send({
            "status_code" : 200,
            "product" : []
        }
            
        )
    }
}

)