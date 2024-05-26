import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components';
import { Authentication, Game, Navigation, Scores } from './routes';
import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={
          <ProtectedRoute>
            <Game />
          </ProtectedRoute>
        } />
        <Route path='/auth' element={<Authentication />} />
        <Route path='/scores' element={
          <ProtectedRoute>
            <Scores />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
}

export default App;
