import Category from "./components/Category";
import Pages from "./pages/Pages";
import { BrowserRouter } from "react-router-dom";
import Search from "./components/Search";
import Navbar from "./components/Navbar";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
            <Navbar/>
                <Search />
                <Category />
                <Pages />
            </BrowserRouter>
        </div>
    );
}

export default App;
