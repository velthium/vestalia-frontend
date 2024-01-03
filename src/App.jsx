import Header from './Header.jsx'
import Footer from './Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import './App.css';

function App() {
  return(
    <div className="App">
      <Header />
      <h1>Welcome to Vestalia!</h1>
      <HomePage />
      <Footer />
    </div>
  )
}

export default App;
