import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import AboutUs from './Components/Aboutus/AboutUs';
import Login from './Components/Login/Login';
import ShopPage from './Components/Shop/ShopPage';
import Register from './Components/Register/Register';
import Contact from './Components/Contact/Contact';
import AddProduct from './Components/Admin/AddProduct';
import CartPage from './Components/Cart/CartPage';
import AccountPage from './Components/Account/AccountPage';
import AddBrand from './Components/Admin/AddBrand';
import ShowBrand from './Components/Admin/ShowBrand';
import EditBrand from './Components/Admin/EditBrand';
import ShowProduct from './Components/Admin/ShowProduct';
import EditProduct from './Components/Admin/EditProduct';
import AddCategory from './Components/Admin/AddCategory';
import AddSubCategory from './Components/Admin/AddSubCategory'
import ShowCategory from './Components/Admin/ShowCategory';
import EditCategory from './Components/Admin/EditCategory';
import ShowSubCategory from './Components/Admin/ShowSubCategory';
import EditSubCategory from './Components/Admin/EditSubCategory';
import ShowProductDetail from './Components/Shop/ShowProductDetail';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/About" element={<AboutUs></AboutUs>} />
      <Route path ="/Login" element={<Login></Login>} />
      <Route path ="/Account" element={<AccountPage></AccountPage>} />
      <Route path ="/Cart" element={<CartPage></CartPage>} />
      
      <Route path ="/AddProduct" element={<AddProduct />} />
      <Route path ="/ShowProduct" element={<ShowProduct />} />
      <Route path ="/EditProduct/:id" element={<EditProduct />} />
      
      <Route path ="/AddBrand" element={<AddBrand />} />
      <Route path ="/ShowBrand" element={<ShowBrand />} />
      <Route path ="/EditBrand/:id" element={<EditBrand />} />
      
      <Route path ="/AddCategory" element={<AddCategory />} />
      <Route path ="/ShowCategory" element={<ShowCategory />} />
      <Route path ="/EditCategory/:id" element={<EditCategory />} />
      
      <Route path ="/AddSubCategory" element={<AddSubCategory />} />
      <Route path ="/ShowSubCategory" element={<ShowSubCategory />} />
      <Route path ="/EditSubCategory/:id" element={<EditSubCategory />} />

      <Route path ="/Shop" element={<ShopPage />} />
      <Route path="/ShowProductDetail/:id" element={<ShowProductDetail />} />
      <Route path="/Register" element={<Register></Register>}/>
      <Route path ="/Contact" element={<Contact></Contact>}/>
    </Routes>
  </BrowserRouter>
  // <React.StrictMode>
  //   {/* <App /> */}
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
