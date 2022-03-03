import React from "react";
import Contacts from "./Components/Contacts/Contacts";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import Menu from "./Components/Menu/Menu";
import Cart from "./Components/Cart/Cart";
import Modal from "./Components/Modal/Modal";
import Login from "./Components/Login/Login";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

function App() {
  let pageContent;
  const menuValue = useSelector((state: RootState) => state.menu);
  const modal = useSelector((state: RootState) => state.showModal);
  const modalValue = useSelector((state: RootState) => state.modal);

  switch (menuValue) {
    case "main":
      pageContent = <Main></Main>;
      break;
    case "menu":
      pageContent = <Menu></Menu>;
      break;
    case "contacts":
      pageContent = <Contacts></Contacts>;
      break;
    case "cart":
      pageContent = <Cart></Cart>;
      break;
    case "login":
      pageContent = <Login></Login>;
      break;
    default:
      pageContent = <Main></Main>;
  }
  return (
    <div className="App">
      <Header></Header>
      {pageContent}
      <Footer></Footer>
      {modal ? <Modal {...modalValue} /> : <></>}
    </div>
  );
}

export default App;
