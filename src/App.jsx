import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import UserList from './UserList.jsx';
import NotFound from './NotFound.jsx';
function App() {

  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  )
}
export default App;
