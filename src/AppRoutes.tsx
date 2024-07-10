import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/pages/dashboard/Dashboard";
import Setting from "./components/pages/setting/Setting";
import About from "./components/pages/about/About";
import { Theme, ThemePanel } from "@radix-ui/themes";
import React from "react";

const AppRoutes: React.FC<{}> = () => {
    return (<>
        <BrowserRouter>
            <Theme appearance="dark">
                <Layout>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/setting" element={<Setting />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </Layout>
            </Theme>

        </BrowserRouter>
    </>)
}

export default AppRoutes;