import { BrowserRouter as Router, Routes, Route } from "react-router-dom" 
import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import Subjects from "./pages/Subjects"
import Tasks from "./pages/Tasks"
import Timer from "./pages/Timer"
import Statistics from "./pages/Statistics"

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />

        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Subjects" element={<Subjects />} />
            <Route path="/Tasks" element={<Tasks />} />
            <Route path="/Timer" element={<Timer />} />
            <Route path="/Statistics" element={<Statistics />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App