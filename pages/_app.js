import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";

const App = ({ Component, pageProps }) => {
    return (
        <ThemeProvider>
            <Component {...pageProps} />
        </ThemeProvider>
    );
};

export default App;
