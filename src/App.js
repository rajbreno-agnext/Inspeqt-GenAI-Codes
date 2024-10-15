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
import theme from './theme'; // Import your custom theme

function App() {
  return (
    <ChakraProvider theme={theme}> {/* Apply your custom theme here */}
      <Router>
        <Box bg="gray.50" minHeight="100vh">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/create-job" element={<CreateJobPage />} />
            <Route path="/sidebar" element={<SidebarPreviewPage />} />
            <Route path="/form-builder" element={<FormBuilderPage />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
