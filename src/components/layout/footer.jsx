const Footer = () => {
    return (
        <>
            <div
                className="footer"
                style={
                    {
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        padding: "5px",
                        width: "100%",
                        backgroundColor: "#fff",
                        textAlign: "center",
                        borderTop: "1px solid #cccccc50",
                        zIndex: 9999,
                        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
                    }
                }
            >
                <p>@STM - Copyright 2024</p>
            </div>
        </>
    )
}

export default Footer;