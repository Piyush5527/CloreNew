import React, { Fragment, useEffect, useState } from 'react'
import AdminDashboardCard from './AdminDashboardCard';
import AdminNavbar from './AdminNavbar';
import styles from "../../CSS/Admin/AdminHomePage.module.css";
const AdminHomePage = () => {
  const [userCnt, setUserCnt] = useState("");
  const [productCnt, setProductCnt] = useState("");
  const [orderCnt, setOrderCnt] = useState("");
  const [compOrderCnt,setCompOrderCnt]=useState("");
  const [totalSales,setTotalSales]=useState("");
  const [thisMonthSales,setThisMonthSales]=useState("");
  const [unitSelled,setUnitSelled]=useState("");
  const getUserCnt = async () => {
    const res = await fetch("http://localhost:1337/api/getusercnt", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }

    });
    const userCntData = await res.json()
    // console.log(userCntData);
    if (res.status === 422 || !userCntData) {
      console.log("error in retrieving user count");
    }
    else {
      setUserCnt(userCntData);
      // console.log("hello");
    }
  }

  const getproductCnt = async () => {
    const res = await fetch("http://localhost:1337/api/getproductcnt", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const productCntData = await res.json();
    if (res.status === 422 || !productCntData) {
      console.log("error in retrieving product cnt count");
    }
    else {
      // console.log()
      setProductCnt(productCntData);
      // console.log("hello");
    }
  }

  const getOrdercount = async () =>{
    const res = await fetch("http://localhost:1337/api/getordercount", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const orderCntData = await res.json();
    if (res.status === 422) {
      console.log(orderCntData);
    }
    else {
       setOrderCnt(orderCntData);
    }
  }

  const getCompletedOrdercount = async () =>{
    const res = await fetch("http://localhost:1337/api/getcompletedordercount", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const compOrderCountData = await res.json();
    if (res.status === 422) {
      console.log(compOrderCountData);
    }
    else {
      setCompOrderCnt(compOrderCountData);
    }
      
  }
  const getTotalSales = async () =>{
    const res = await fetch("http://localhost:1337/api/getotalsales", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const getTotalSalesData = await res.json();
    if (res.status === 422) {
      console.log(getTotalSalesData);
    }
    else {
      setTotalSales(getTotalSalesData);
    }
      
  }

  const getThisMonthSales=async () =>{
    const res = await fetch("http://localhost:1337/api/getthismonthsales", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const thisMonthSalesData = await res.json();
    if(res.status === 422)
    {
      console.log("error in this month sales");
    }
    else{
      setThisMonthSales(thisMonthSalesData);
    }
  }
  const getUnitSelled = async () =>{
    const res = await fetch("http://localhost:1337/api/getunitselled", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const unitSelledData = await res.json();
    if(res.status === 422)
    {
    }
    else{
      setUnitSelled(unitSelledData);
    }
  }
  useEffect(() => {
    getUserCnt()
    getproductCnt()
    getOrdercount();
    getCompletedOrdercount();
    getTotalSales();
    getThisMonthSales();
  }, [])


  return (
    <Fragment>
      <AdminNavbar />
      <div className={styles.main_container}>
        <AdminDashboardCard header='User Count' value={userCnt} />
        <AdminDashboardCard header='Product Count' value={productCnt} />
        <AdminDashboardCard header='Order Count' value={orderCnt} />
        <AdminDashboardCard header='Orders Completed' value={compOrderCnt} />
        <AdminDashboardCard header='Total Sales' value={totalSales+" Rs"} />
        <AdminDashboardCard header='This Month Sales' value={thisMonthSales+" Rs"} />
        <AdminDashboardCard header='Unit Selled' value='testing' />
        <AdminDashboardCard header='Low Stock(<10)' value='testing' />
        <div className={styles.container_center}>
          <AdminDashboardCard header='Brands Count' value='testing' />
          <AdminDashboardCard header='Category Count' value='testing' />
          <AdminDashboardCard header='Sub Category Count' value='testing' />
        </div>
      </div>
    </Fragment>
  )
}

export default AdminHomePage