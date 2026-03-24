import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Archive, Users, Bookmark, Plus, User, Menu, ChevronLeft, FileText } from "lucide-react";

const MOCK_TESTS = [
  { id: 1, title: "Math Quiz", subtitle: "Chapter 3 – Algebra" },
  { id: 2, title: "Science Test", subtitle: "Unit 5 – Forces" },
  { id: 3, title: "History Exam", subtitle: "World War II" },
  { id: 4, title: "English Quiz", subtitle: "Grammar Basics" },
];

const NAV_ITEMS = [
  { icon: Archive, label: "Archive" },
  { icon: Users, label: "Students" },
  { icon: Bookmark, label: "Bookmark" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Archive");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`${sidebarOpen ? "w-60" : "w-0 overflow-hidden"} shrink-0 bg-sidebar text-sidebar-foreground transition-all duration-300 flex flex-col`}
      >
        <div className="p-5 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-sidebar-accent flex items-center justify-center">
            <User className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm truncate">Teacher Name</p>
            <p className="text-xs text-sidebar-foreground/60 truncate">teacher@school.com</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map(item => (
            <button
              key={item.label}
              onClick={() => setActiveNav(item.label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                activeNav === item.label
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>
      </motion.aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-4 border-b">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-muted-foreground hover:text-foreground">
            {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="flex items-center gap-2">
            <Button size="sm" className="gap-2" onClick={() => navigate("/create-account")}>
              <Plus className="h-4 w-4" /> New Test
            </Button>
            <Button size="icon" variant="ghost">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Content grid */}
        <main className="flex-1 p-6">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Your Tests</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MOCK_TESTS.map((test, i) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="group cursor-pointer rounded-xl border bg-card p-5 hover:shadow-lg hover:border-primary/30 transition-all"
              >
                <div className="aspect-[4/3] rounded-lg bg-muted flex items-center justify-center mb-4">
                  <FileText className="h-10 w-10 text-muted-foreground/40" />
                </div>
                <h3 className="font-semibold text-card-foreground">{test.title}</h3>
                <p className="text-sm text-muted-foreground">{test.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
