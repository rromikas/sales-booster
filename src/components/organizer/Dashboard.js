import React, { useState } from "react";
import Menu from "./Menu";
import Overview from "./Overview";
import AddShowForm from "./ShowForm";
import SimpleBar from "simplebar-react";
import { ReactComponent as Logo } from "icons/logo.svg";
import { ReactComponent as MenuIcon } from "icons/menu.svg";
import Drawer from "@material-ui/core/Drawer";
import Shows from "./Shows";

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const GetPage = (pageIndex) => {
    switch (pageIndex) {
      case 0:
        return <Overview setPage={setPage}></Overview>;
      case 1:
        return <Shows setPage={setPage}></Shows>;
      case 11:
        return <AddShowForm setPage={setPage}></AddShowForm>;
    }
  };
  return (
    <div className="fixed left-0 top-0 bg-white w-full h-full flex flex-col">
      <div
        className="bg-gray-500 flex-shrink-0 flex items-center justify-between px-9"
        style={{ height: 50 }}
      >
        <Logo></Logo>
        <a href="/client">Client dashboard</a>
        <MenuIcon onClick={() => setIsMenuOpened(true)} className="block md:hidden"></MenuIcon>
      </div>
      <div className="flex-grow bg-white flex h-0">
        <SimpleBar className="px-10 w-64 bg-gray-400 hidden md:block">
          <div className="pt-14 pb-10 font-bold">Dashboard</div>
          <Menu setPage={setPage} page={page}></Menu>
          <Drawer anchor="right" open={isMenuOpened} onClose={() => setIsMenuOpened(false)}>
            <div className="h-full bg-gray-400 px-16 py-4">
              <div className="font-bold pt-10 pb-10">Dashboard</div>
              <Menu></Menu>
            </div>
          </Drawer>
        </SimpleBar>
        <SimpleBar className="flex-grow p-14">{GetPage(page)}</SimpleBar>
      </div>
    </div>
  );
};

export default Dashboard;
