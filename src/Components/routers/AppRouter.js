import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { LoginScreen } from '../auth/LoginScreen';
import { CalendarScreen } from '../Calendar/CalendarScreen';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      {/* exact /login */}
      {/* exact /calendar */}
      <Routes>
        <Route path='/login' exact element={<LoginScreen />} />
        <Route path='/' exact element={<CalendarScreen />} />
        <Route path='/*' element={<Navigate to='/login' replace />} />
      </Routes>
    </BrowserRouter>
  );
};
