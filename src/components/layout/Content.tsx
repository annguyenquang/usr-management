type ContentProps = {
    children: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => {
    return (
        <main className="content h-screen">
            {children}
        </main>
    )
}

export default Content;