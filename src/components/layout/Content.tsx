type ContentProps = {
    children: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => {
    return (
        <main className="content">
            {children}
        </main>
    )
}

export default Content;