import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import StudentLogin from "./pages/StudentLogin";
import TeacherLogin from "./pages/TeacherLogin";
import TestCode from "./pages/TestCode";
import Dashboard from "./pages/Dashboard";
import CreateAccount from "./pages/CreateAccount";
import Profile from "./pages/Profile";
import TestEditor from "./pages/TestEditor";
import TestPreview from "./pages/TestPreview";
import TakeTest from "./pages/TakeTest";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login/student" element={<StudentLogin />} />
          <Route path="/login/teacher" element={<TeacherLogin />} />
          <Route path="/test-code" element={<TestCode />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/test-editor" element={<TestEditor />} />
          <Route path="/test-preview" element={<TestPreview />} />
          <Route path="/take-test" element={<TakeTest />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
