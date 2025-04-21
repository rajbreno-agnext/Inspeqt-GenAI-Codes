import React from 'react';
import {
  ChakraProvider,
  Box,
} from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import OtpPage from './pages/OtpPage';
import NewPasswordPage from './pages/NewPasswordPage';
import AccountPage from './pages/AccountPage';
import DashboardPage from './pages/DashboardPage';
import CreateJobPage from './pages/CreateJobPage';
import SidebarPreviewPage from './pages/SidebarPreviewPage';
import FormBuilderPage from './pages/FormBuilderPage';
import BulkLocationUploadModal from './pages/BulkLocationUploadModal';
import NotificationPage from './pages/notification';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box minHeight="100vh">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/create-job" element={<CreateJobPage />} />
            <Route path="/sidebar" element={<SidebarPreviewPage />} />
            <Route path="/form-builder" element={<FormBuilderPage />} />
            <Route path="/custom-code" element={<BulkLocationUploadModal />} />
            <Route path="/notification" element={<NotificationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/otp" element={<OtpPage />} />
            <Route path="/new-password" element={<NewPasswordPage />} />
            <Route path="/accounts" element={<AccountPage />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
