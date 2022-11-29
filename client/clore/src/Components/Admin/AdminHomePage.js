import React, { Fragment } from 'react'
import AdminDashboardCard from './AdminDashboardCard';
import AdminNavbar from './AdminNavbar';
import styles from "../../CSS/Admin/AdminHomePage.module.css";
const AdminHomePage = () => {
  return (
    <Fragment>
      <AdminNavbar />
      <div className={styles.main_container}>
        <AdminDashboardCard header='User Count' value='testing' />
        <AdminDashboardCard header='Product Count' value='testing' />
        <AdminDashboardCard header='Order Count' value='testing' />
        <AdminDashboardCard header='Orders Completed' value='testing' />
        <AdminDashboardCard header='Total Sales' value='testing' />
        <AdminDashboardCard header='This Month Sales' value='testing' />
        <AdminDashboardCard header='Unit Selled' value='testing' />
        <AdminDashboardCard header='Low Stock Quantity' value='testing' />
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