const express = require("express")
const jwt = require("jsonwebtoken")
const cors = require("cors")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const User = require('./models/user.models')
const cookieParser = require("cookie-parser")
const session = require("express-session")
const Razorpay = require("razorpay")
const crypto = require("crypto")
const store = new session.MemoryStore();
const app = express();
// const bcrypt = require("bcryptjs")
const productdb = require('./models/product.models');
const categorydb = require('./models/category.models');
const subcategorydb = require('./models/sub_category.models');
const branddb = require('./models/brand.models');
const cartdb = require('./models/cart.models');
const multer = require('multer')
const bcrypt=require("bcrypt")
const fs = require('fs')
const addressdb = require("./models/address.model")
const { application } = require("express")
const Skey = "soelshaikhshaikhsoelshaikhsoelab"
const razorpay_key_id = "rzp_test_2TuO5NUvU21p95"
const razorpay_secret_key = "S0A6zi0OqqbyF4MF5PYI04Cz"


app.use(cors());
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json());

const razorpayInstance = new Razorpay({
  
    // Replace with your key_id
    key_id: "rzp_test_2TuO5NUvU21p95",
  
    // Replace with your key_secret
    key_secret: "S0A6zi0OqqbyF4MF5PYI04Cz"
});

app.use(
    session({
        resave : true,
        saveUninitialized : true,
        store : store,
        secret : "secret123"})
);

app.use("/productImages",express.static("./productImages"));



mongoose.connect('mongodb://localhost:27017/clore')

async function comparePassword(plaintextPassword, hash) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
}

//var storage = 

const multerStorage = multer.diskStorage({
    destination : function (req, file, callback) {
        var dir = "./productImages";
        callback(null, dir);
    },

    filename : function(req, file, callback){
        callback(null, file.originalname);
    }
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.endsWith("image")) {
      cb(null, true);
    } else {
      cb("Please upload only images.", false);
    }
  };    

//var uploadImage = multer({storage : storage});

const upload = multer({
    storage: multerStorage
    //fileFilter: multerFilter
  });

//const uploadFiles = upload.single("images");
app.post('/api/register', async (req, res) => {
    console.log(req.body);
    let encPass=""
    try {
    await bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(req.body.password,salt,function(err,hash){
            encPass=hash
            console.log(encPass)

            User.create({
                first_name : req.body.fname,
                last_name  : req.body.lname,
                phone : req.body.phone,
                email : req.body.email,
                password : encPass,
                created_at : new Date(),
                updated_at : new Date(),
                street : null,
                city : null,
                state : null,
                pincode : null,
            })
            
        })
    })
        return res.json({status : 'ok'})
    } 
    catch (err) {
        console.log(err)
        return res.json({status : 'error'})
    }
    return res.json({status : 'ok'});
})

app.post('/api/login', async (req, res) => {
    
    const user1 = await User.findOne({
        email : req.body.email, 
        // password : req.body.password, 
    })
    passwordMatch=await comparePassword( req.body.password,user1.password)
    
    if(user1 && passwordMatch) {
        const token = jwt.sign({
            // name : user.name,
            _id : user1._id,
            
        }, Skey,
        {expiresIn : "1d"});


        
        user1.tokens = user1.tokens.concat({token:token})
        await user1.save()
        
    
        return res.json({ status : 'ok', user : token})
    }else {
        return res.json({ status : 'error', user : false})
    }
    
})

app.get("/api/user", async (req, res) => {
    
    try{
        const token =  req.headers.authorization;
        console.log(token)
        const verifytoken = jwt.verify(token, Skey)
        //console.log(verifytoken);
        const rootUser = await User.findOne({_id:verifytoken._id})
        console.log(rootUser);
        if(!rootUser){
            throw new Error("user not found")
        }
        return res.status(201).json(rootUser);
    } catch (err) {
        console.log(err)
        res.status(422).json("Error Found")
    }

    
});

app.get("/api/getuserid/:id", async (req, res) => {
    try{
        const {id} = req.params
        const user = await User.findById({_id : id});

        if(user){
            return res.status(201).json(user)
        }else{
            return res.status(422)
        }
    } catch(err){
        console.log(err)
        return res.status(422)
    }
});

app.post("/api/addtocart/:productId", async (req, res)=>{
    try{
        const {productId} = req.params
        console.log(productId)
        const token =  req.headers.authorization;
        console.log(token)
        const verifytoken = jwt.verify(token, Skey)
        
        const rootUser = await User.findOne({_id:verifytoken._id})
       
        const rootProduct = await productdb.findOne({_id:productId})
       
        const currentCart = await cartdb.findOne({product_id : productId, user_id : rootUser._id});

        if(!currentCart){
            const addToCart = await cartdb.create({
                product_id : productId,
                user_id : rootUser._id,
                qty : 1,
                total_amount : rootProduct.price
            })

            console.log(addToCart)
            console.log("Product Added to Cart Successfully")
            return res.status(201).json(addToCart)
        } else {
            const updateCart = await cartdb.updateOne({product_id : productId, user_id : rootUser._id},
                {qty : currentCart.qty+1, total_amount : (currentCart.qty+1)*rootProduct.price});

            console.log(updateCart)
            console.log("Product Updated in Cart Successfully")
            return res.status(201).json(updateCart)
        }
        
        
        
        
    } catch (err){
        console.log(err)
    }
});

app.get("/api/getcartitems", async (req, res)=>{
    try{
        const token =  req.headers.authorization;
        
        const verifytoken = jwt.verify(token, Skey)
        
        const rootUser = await User.findOne({_id:verifytoken._id})

        const cartItems = await cartdb.find({user_id : rootUser._id}).populate('product_id user_id')

        console.log(cartItems.length)

        res.status(201).json(cartItems)

    }catch(err){
        console.log(err)
        res.status(401).json(err)
    }
})

app.get("/api/getaddress", async (req, res)=>{
    try{
        const token =  req.headers.authorization;
        
        const verifytoken = jwt.verify(token, Skey)
        
        const rootUser = await User.findOne({_id:verifytoken._id})

        console.log(rootUser.first_name)

        const userAddress = await addressdb.find({user_id : rootUser._id})

        console.log(userAddress)

        res.status(201).json(userAddress)

    }catch(err){
        console.log(err)
        res.status(401).json(err)
    }
})

app.get("/api/getaddressid/:id", async (req, res)=>{
    try{
        const {id} =  req.params;

        const userAddress = await addressdb.findById(id)

        console.log(userAddress)

        res.status(201).json(userAddress)

    }catch(err){
        console.log(err)
        res.status(401).json(err)
    }
})

app.post('/api/addaddress', async (req, res) => {
   
    try {
       
        const token =  req.headers.authorization;
        
        const verifytoken = jwt.verify(token, Skey)
        
        const rootUser = await User.findOne({_id:verifytoken._id})

        console.log(rootUser.first_name)

        const addAddress = await addressdb.create({
            user_id : rootUser._id,
            phone : req.body.phone,
            street : req.body.street,
            city : req.body.city,
            state : req.body.state,
            pincode : req.body.pincode,
        })
        console.log(addAddress)
        console.log("Address Added Successfully")
        res.status(201).json(addAddress)
    } 
    catch (err) {
        console.log(err)
        res.status(422).json("Error Found")
    }
})

app.delete("/api/deleteaddress/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deleteAddress = await addressdb.findByIdAndDelete({ _id: id })
        // console.log(deletcategory);
        res.status(201).json(deleteAddress);

    } catch (error) {
        res.status(422).json(error);
    }
})

app.delete("/api/deletefromcart/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletecart = await cartdb.findByIdAndDelete({ _id: id })
        // console.log(deletcategory);
        res.status(201).json(deletecart);

    } catch (error) {
        res.status(422).json(error);
    }
})

app.post('/api/minuscartitem/:id', async (req, res) => { 
    try {
       
        const {id} = req.params

        console.log(id)

        const currentCart = await cartdb.findById(id);

        if(currentCart.qty!==1){

            const cartQtyUpdate = await cartdb.findByIdAndUpdate(id, {qty : (currentCart.qty-1), total_amount : currentCart.total_amount-(currentCart.total_amount/currentCart.qty)}, {
                new : true
            });
        
            res.status(201).json(cartQtyUpdate)
        } else {
            res.status(401).json("Error Found")
        }
    } 
    catch (err) {
        console.log(err)
        res.status(401).json("Error Found")
    }
})

app.post('/api/pluscartitem/:id', async (req, res) => { 
    try {
        const {id} = req.params

        console.log(id)

        const currentCart = await cartdb.findById(id);

        const cartQtyUpdate = await cartdb.findByIdAndUpdate(id, {qty : (currentCart.qty+1), total_amount : currentCart.total_amount+(currentCart.total_amount/currentCart.qty)}, {
            new : true
        });

        res.status(201).json(cartQtyUpdate)
    } 
    catch (err) {
        console.log(err)
        res.status(401).json("Error Found")
    }
})

app.patch("/api/updateaddress/:id", async (req, res) => {
    try {

        const { id } = req.params

        console.log(id)
    
        const updateAddress = await addressdb.findByIdAndUpdate(id, {phone : req.body.phone, street : req.body.street, city : req.body.city, state : req.body.state, pincode : req.body.pincode}, {
            new: true
        })
        // console.log("243 =>"+updateBrand);
        res.status(201).json(updateAddress)
    } catch (error) {
        res.status(401).json(error)
    }
})

app.get("/api/logout", (req, res) => {
    req.session.destroy();
    return res.json({status : 'ok'})
});

app.post('/api/addproduct', upload.single("image_path"), async (req, res) => {
    console.log("Items",req.body); 
    const {filename} = req.file;
    //console.log("Images",req.files[0]);
    // uploadFiles(req, res, err => {
    //     if (err instanceof multer.MulterError) { // A Multer error occurred when uploading.
    //       if (err.code === "LIMIT_UNEXPECTED_FILE") { // Too many images exceeding the allowed limit
    //         console.log(err);
    //       }
    //     } else if (err) {
    //       console.log(err);
    //     }
    
    //     // Everything is ok.
    //   });
    // // console.log("FileName");
    // console.log(req.files[0]);
    
    //const { product_name, category_id, sub_category_id, brand_id, price, small_desc, long_desc, image1, color, size, qty} = req.body
    try {
       
        const addProduct = await productdb.create({
            product_name : req.body.pname,
            category_id : req.body.category_id,
            sub_category_id : req.body.sub_category_id,
            brand_id : req.body.brand_id,
            price : req.body.price,
            small_desc : req.body.small_desc,
            long_desc : req.body.long_desc,
            image1 : filename,
            /*image2 : req.body.image2,
            image3 : req.body.image3,
            image4 : req.body.image4,*/
            color : req.body.color,
            qty : req.body.qty,
            size : req.body.size
        })
        console.log(addProduct)
        console.log("Product Added Successfully")
        res.status(201).json(addProduct)
    } 
    catch (err) {
        console.log(err)
        res.status(422).json("Error Found")
    }
})

app.post('/api/addbrand', upload.single("image_path"),async (req, res) => {
    console.log("In Add Brand",req.body); 
    const {filename} = req.file;
    console.log(filename);
    
    try {
       
        const addBrand = await branddb.create({
            brand_name : req.body.brand_name,
            image_path : filename, 
        })
        
        console.log("Brand Added Successfully")
        res.status(201).json(addBrand)
    } 
    catch (err) {
        console.log(err)
        res.status(422).json("Error Found")
    }
})

app.get("/api/getproduct", async (req, res) => {
    try {
        const productdata = await productdb.find().populate('category_id sub_category_id brand_id');
        res.status(201).json(productdata)
        // console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

app.get("/api/getproductid/:id", async (req, res) => {
    try {
        const {id} = req.params; 
        const productDataId = await productdb.findById({_id: id});
        res.status(201).json(productDataId)
        // console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

app.delete("/api/deleteproduct/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deleteProduct = await productdb.findByIdAndDelete({ _id: id })
        // console.log(deletcategory);
        res.status(201).json(deleteProduct);

    } catch (error) {
        res.status(422).json(error);
    }
})

app.patch("/api/updateproduct/:id", upload.single("image_path"), async (req, res) => {
    try {
        const { id } = req.params
        const {filename} = req.file
        console.log(filename)
        console.log(req.body)
        const updateProduct = await productdb.findByIdAndUpdate(id, {product_name : req.body.pname,
            category_id : req.body.category_id,
            sub_category_id : req.body.sub_category_id,
            brand_id : req.body.brand_id,
            price : req.body.price,
            small_desc : req.body.small_desc,
            long_desc : req.body.long_desc,
            image1 : filename,
            color : req.body.color,
            qty : req.body.qty,
            size : req.body.size}, {
            new: true
        })
        // console.log("243 =>"+updateBrand);
        res.status(201).json(updateProduct)
    } catch (error) {
        res.status(422).json(error)
    }
})

app.get("/api/getbrand", async (req, res) => {
    try {
        const branddata = await branddb.find();
        res.status(201).json(branddata)
        // console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

app.get("/api/getbrandid/:id", async (req, res) => {
    try {
        const {id} = req.params; 
        const branddataid = await branddb.findById({_id: id});
        res.status(201).json(branddataid)
        // console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

app.delete("/api/deletebrand/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletebrand = await branddb.findByIdAndDelete({ _id: id })
        // console.log(deletcategory);
        res.status(201).json(deletebrand);

    } catch (error) {
        res.status(422).json(error);
    }
})

app.patch("/api/updatebrand/:id", upload.single("image_path"), async (req, res) => {
    try {

        const { id } = req.params
        const {filename} = req.file
        console.log(filename)
        const updateBrand = await branddb.findByIdAndUpdate(id, {brand_name : req.body.brand_name, image_path : filename}, {
            new: true
        })
        // console.log("243 =>"+updateBrand);
        res.status(201).json(updateBrand)
    } catch (error) {
        res.status(422).json(error)
    }
})

app.post('/api/addcategory', async (req, res) => {
    console.log(req.body); 

    try {
        const addCategory = await categorydb.create({
            category_name : req.body.category_name, 
        })
        
        console.log("Category Added Successfully")
        res.status(201).json(addCategory)
    } 
    catch (err) {
        console.log(err)
        res.status(422).json("Error Found")
    }
})

app.get("/api/getcategory", async (req, res) => {
    try {
        const categorydata = await categorydb.find();
        res.status(201).json(categorydata)
        // console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

app.get("/api/getcategoryid/:id", async (req, res) => {
    try {
        console.log("In Category ID")
        const {id} = req.params; 
        const categorydataid = await categorydb.findById({_id: id});
        res.status(201).json(categorydataid)
        
    } catch (error) {
        res.status(422).json(error);
    }
})

app.delete("/api/deletecategory/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletecategory = await categorydb.findByIdAndDelete({ _id: id })
      
        res.status(201).json(deletecategory);

    } catch (error) {
        res.status(422).json(error);
    }
})

app.patch("/api/updatecategory/:id", async (req, res) => {
    try {

        const { id } = req.params

        const updateCategory = await categorydb.findByIdAndUpdate(id, {category_name : req.body.category_name}, {
            new: true
        })
        // console.log("243 =>"+updateBrand);
        res.status(201).json(updateCategory)
    } catch (error) {
        res.status(422).json(error)
    }
})


app.post('/api/addsubcategory', async (req, res) => {
    console.log(req.body); 

    try {
        const addSubCategory = await subcategorydb.create({
            sub_category_name : req.body.sub_category_name, 
            category_id : req.body.category_id
        })
        
        console.log("Sub Category Added Successfully")
        res.status(201).json(addSubCategory)
    } 
    catch (err) {
        console.log(err)
        res.status(422).json("Error Found")
    }
})

app.delete("/api/deletesubcategory/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const subdeletecategory = await subcategorydb.findByIdAndDelete({ _id: id })
      
        res.status(201).json(subdeletecategory);

    } catch (error) {
        res.status(422).json(error);
    }
})

app.patch("/api/updatesubcategory/:id", async (req, res) => {
    try {
        console.log(req.body)
        const { id } = req.params

        const updateSubCategory = await subcategorydb.findByIdAndUpdate(id, {sub_category_name : req.body.sub_category_name, category_id : req.body.category_id}, {
            new: true
        })
        // console.log("243 =>"+updateBrand);
        res.status(201).json(updateSubCategory)
    } catch (error) {
        res.status(422).json(error)
    }
})

app.get("/api/getsubcategoryid/:id", async (req, res) => {
    try {
        console.log("In Sub Category ID")
        const {id} = req.params; 
        const subcategorydataid = await subcategorydb.findById({_id: id});
        res.status(201).json(subcategorydataid)
        
    } catch (error) {
        res.status(422).json(error);
    }
})

app.get("/api/getsubcategory", async (req, res) => {
    try {
        const subcategorydata = await subcategorydb.find();
        res.status(201).json(subcategorydata)
        // console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

app.get("/api/getsubcategorywithcategory", async (req, res) => {
    try {
        const subcategorydata = await subcategorydb.find().populate('category_id');
        res.status(201).json(subcategorydata)
        // console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

app.get("/api/getAddressCnt",async (req, res) => {
    try{
        const token =  req.headers.authorization;
        
        const verifytoken = jwt.verify(token, Skey)
        
        const rootUser = await User.findOne({_id:verifytoken._id})

        const getAddressesData= await addressdb.find({user_id:rootUser._id});

        console.log(getAddressesData.length);

        res.status(201).json(getAddressesData.length);
    }
    catch(error)
    {
        res.status(422).json(error); 
    }
});



app.listen(1337, ()=>{
	console.log("Server is Started...")
})