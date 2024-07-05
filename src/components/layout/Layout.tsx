import React from "react";
import SideBar from "./Sidebar";
import Content from "./Content";

type LayoutProps = {
    children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="layout">
            <SideBar />
            <Content>
                {children}
            </Content>
        </div>
    )
}

export default Layout;