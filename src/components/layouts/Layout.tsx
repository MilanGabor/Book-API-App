import { ReactNode } from "react";
// import components
import { Header } from "../Header";
import { Footer } from "../Footer";

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
 return (
  <>
    <Header/>
      <main>{children}</main>
    <Footer/>
  </>
 )
};