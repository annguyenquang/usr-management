import { NavLink } from "react-router-dom";

type SideBarProps = {
}

const SideBar: React.FC<SideBarProps> = () => {
    return (
        <aside className="sidebar">
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/setting">Setting</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">About</NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default SideBar;