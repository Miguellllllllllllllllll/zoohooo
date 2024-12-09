import "./App.css";
import ResponsiveAppBar from "./Navbar";
import ResponsiveAppList from "./List";
import Modal from "./Modal";
import { useState } from "react";

function App() {
  const [isOpenModal, setOpenModal] = useState(false);
  return (
    <>
      <ResponsiveAppBar />
      <ResponsiveAppList setOpenModal={setOpenModal}/>
      <Modal isOpenModal={isOpenModal} setOpenModal={setOpenModal}></Modal>
    </>
  );
}

export default App;
