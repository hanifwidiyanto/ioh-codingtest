import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import ProtectedRoute from './ProtectedRoute';
import Cart from './components/Cart';
import Item from './pages/Item';
import ViewCart from './pages/ViewCart';
import InvoiceDetail from './pages/InvoiceDetail';
import AllInvoice from './pages/AllInvoice';
import InvoiceUpdate from './pages/InvoiceUpdate';

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({ loggedIn: false, items: [] })
  const isAuth = async () => {
    await axios.get('http://localhost:5000/api/users/check', { withCredentials: true })
      .then(res => {
        if (res.data.users) setUser({ loggedIn: true })
      }).catch(err => {
        console.log(err)
      })

  }

  useEffect(() => {
    isAuth()
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/login" element={
            <>
              <Navbar />
              <Login />
            </>
          } />
          <>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={
                <>
                  <Navbar />
                  <Home />
                  <Cart />
                </>
              } />
              <Route path="/item/:id" element={
                <>
                  <Navbar />
                  <Item />
                  <Cart />
                </>
              } />
              <Route path="/cart" element={
                <>
                  <Navbar />
                  <ViewCart />

                </>
              } />
              <Route path="/invoice" element={
                <>
                  <Navbar />
                  <AllInvoice />

                </>
              } />
           
              <Route path="/invoice/:id" element={
                <>
                  <Navbar />
                  <InvoiceDetail />
                </>
              } />
                 <Route path="/invoice/update/:id" element={
                <>
                  <Navbar />
                  <InvoiceUpdate />

                </>
              } />


            </Route>

          </>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
