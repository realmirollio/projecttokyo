import React from "react"
import { Navbar, Footer, Welcome, ContactForm } from "./components" 
const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
        <ContactForm />
        <Footer />
      </div>
    </div>
  )
}

export default App
