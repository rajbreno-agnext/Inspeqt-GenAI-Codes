import React from 'react';
import {
  ChakraProvider,
  Box,
} from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
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
        <Box bg="gray.50" minHeight="100vh">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/create-job" element={<CreateJobPage />} />
            <Route path="/sidebar" element={<SidebarPreviewPage />} />
            <Route path="/form-builder" element={<FormBuilderPage />} />
            <Route path="/custom-code" element={<BulkLocationUploadModal />} />
            <Route path="/notification" element={<NotificationPage />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
