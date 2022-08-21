import './App.css';
import { useEffect, useReducer } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Vote from './pages/Vote';
import Login from './pages/Login';
import Navbar from './components/Navbar/Navbar';
import Dishes from './pages/Dishes';
import Ranking from './pages/Ranking';
import { pollContext } from './context/pollContext';
import RequireAuth from './components/utils/RequireAuth';
import { AuthProvider } from './components/utils/loginAuth';
import pollReducer from './helper/pollReducer';
import { LOAD__INITIAL__DATA } from './helper/actions.type';
import { RANKING, DISHES, LOGIN, VOTE } from './routes';

const data = require('./api/data.json');
const users = require('./api/users.json');

function App() {
  const [state, dispatch] = useReducer(pollReducer, {
    data: [],
    data_map: new Map(),
    users_map: new Map(),
  });

  // Load initial data
  const loadInitialData = (data) => {
    dispatch({ type: LOAD__INITIAL__DATA, payload: { data, users } });
  }

  useEffect(() => {
    loadInitialData(data);
  }, []);

  return (
    <div className='main-container'>
      <pollContext.Provider value={{
        state, dispatch
      }}>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path={DISHES} element={<Dishes />} />
            <Route path={RANKING} element={<Ranking />} />
            <Route path={LOGIN} element={<Login />} />
            <Route path={VOTE} element={<RequireAuth><Vote /></RequireAuth>} />
          </Routes>
        </AuthProvider>
      </pollContext.Provider>
    </div>
  );
}

export default App;
