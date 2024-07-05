import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/pages/dashboard/Dashboard";
import Setting from "./components/pages/setting/Setting";
import About from "./components/pages/about/About";

const AppRoutes: React.FC<{}> = () => {
    return (<>
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/setting" element={<Setting />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    </>)
}

export default AppRoutes;