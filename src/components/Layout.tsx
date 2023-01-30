import { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from '@/styles/Layout.module.css';


const Layout = ({children}: PropsWithChildren<{}> ) => {
    return (
        <>
        <Header />
        <main>
            {children}
        </main>
        <Footer />
        </>
    )
}

export default Layout;