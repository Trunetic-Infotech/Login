import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Homepage from "./component/pages/Homepage";
import Layout from "./component/layout/Layout";
import Register from "./component/pages/Register";
import Login from "./component/pages/Login";
import Records_deta from "./component/pages/Records_deta";
import AdminDashboard from "./component/Dashboard/AdminDashboard";
import PageNotFound from "./component/pages/PageNotFound";
// import UserPrivateRoute from "./component/PrivateRoutes/UserPrivateRoute";
// import AdminPrivateRoute from "./component/PrivateRoutes/AdminPrivateRoute";


const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/records-deta"   element={<><Records_deta/></>}/>
          <Route path="/dashboard"   element={ <> <AdminDashboard/> </> }/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        
        </Routes>
        <ToastContainer />
      </Layout>
    </>
  );
};

export default App;

