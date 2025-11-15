import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SnippetCreate from './pages/SnippetCreate';
import SnippetDetail from './pages/SnippetDetail';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(){
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<SnippetCreate />} />
        <Route path="/snippet/:id" element={<SnippetDetail />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;

