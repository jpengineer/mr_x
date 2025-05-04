import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@/styles/index.css'
import MrX from "@/components/MrX.jsx";
import Layout from "@/components/Layout.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<MrX />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
