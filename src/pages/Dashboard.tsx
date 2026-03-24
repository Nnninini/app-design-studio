import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Archive,
  Users,
  Bookmark,
  Plus,
  User,
  Menu,
  ChevronLeft,
  FileText,
  Upload,
  LogOut,
  UserCircle,
  X,
  Trash2,
} from "lucide-react";

const MOCK_TESTS = [
  { id: 1, title: "Math Quiz", subtitle: "Chapter 3 – Algebra" },
  { id: 2, title: "Science Test", subtitle: "Unit 5 – Forces" },
  { id: 3, title: "History Exam", subtitle: "World War II" },
  { id: 4, title: "English Quiz", subtitle: "Grammar Basics" },
];

const NAV_ITEMS = [
  { icon: Archive, label: "Archive" },
  { icon: Users, label: "Students" },
  { icon: Bookmark, label: "Bookmarks" },
];

interface Student {
  id: number;
  name: string;
  email: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Archive");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Dialogs
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showAddStudentDialog, setShowAddStudentDialog] = useState(false);

  // Create test
  const [newTestTitle, setNewTestTitle] = useState("");
  const [newTestDesc, setNewTestDesc] = useState("");

  // Students
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "Alice Johnson", email: "alice@school.com" },
    { id: 2, name: "Bob Smith", email: "bob@school.com" },
    { id: 3, name: "Charlie Brown", email: "charlie@school.com" },
  ]);
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentEmail, setNewStudentEmail] = useState("");
  const [hoveredStudent, setHoveredStudent] = useState<number | null>(null);

  const handleCreateTest = () => {
    setShowCreateDialog(false);
    setNewTestTitle("");
    setNewTestDesc("");
    navigate("/test-editor");
  };

  const handleAddStudent = () => {
    if (newStudentName.trim()) {
      const newStudent: Student = {
        id: Date.now(),
        name: newStudentName.trim(),
        email: newStudentEmail.trim(),
      };
      setStudents(prev =>
        [...prev, newStudent].sort((a, b) => a.name.localeCompare(b.name))
      );
      setNewStudentName("");
      setNewStudentEmail("");
      setShowAddStudentDialog(false);
    }
  };

  const removeStudent = (id: number) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

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
            {/* New Test dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" /> New Test
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setShowCreateDialog(true)}>
                  <FileText className="h-4 w-4 mr-2" /> Create Test
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowUploadDialog(true)}>
                  <Upload className="h-4 w-4 mr-2" /> Upload Test
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <UserCircle className="h-4 w-4 mr-2" /> Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setShowLogoutDialog(true)}>
                  <LogOut className="h-4 w-4 mr-2" /> Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {activeNav === "Archive" && (
            <>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Your Tests</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {MOCK_TESTS.map((test, i) => (
                  <motion.div
                    key={test.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => navigate("/test-preview")}
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
            </>
          )}

          {activeNav === "Students" && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-2xl font-bold text-foreground">Students</h2>
                <Button size="sm" className="gap-2" onClick={() => setShowAddStudentDialog(true)}>
                  <Plus className="h-4 w-4" /> Add Student
                </Button>
              </div>
              <div className="space-y-2">
                {students.map(student => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between rounded-lg border bg-card px-4 py-3 group"
                    onMouseEnter={() => setHoveredStudent(student.id)}
                    onMouseLeave={() => setHoveredStudent(null)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-card-foreground">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                    <AnimatePresence>
                      {hoveredStudent === student.id && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <Button variant="ghost" size="icon" onClick={() => removeStudent(student.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {activeNav === "Bookmarks" && (
            <>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Bookmarks</h2>
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <Bookmark className="h-12 w-12 mb-4 text-muted-foreground/40" />
                <p>No bookmarked tests yet</p>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Logout confirmation */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Would you like to sign out?</AlertDialogTitle>
            <AlertDialogDescription>You'll need to log in again to access your dashboard.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction onClick={() => navigate("/")}>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Create test dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Test</DialogTitle>
            <DialogDescription>Enter a title and description for your test.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input placeholder="Test title..." value={newTestTitle} onChange={e => setNewTestTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input placeholder="Brief description..." value={newTestDesc} onChange={e => setNewTestDesc(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
            <Button onClick={handleCreateTest}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload test dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Test</DialogTitle>
            <DialogDescription>Drag and drop a file or click to browse.</DialogDescription>
          </DialogHeader>
          <div className="border-2 border-dashed border-border rounded-xl p-10 text-center cursor-pointer hover:border-primary/50 transition-colors">
            <Plus className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Click or drop files here</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUploadDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowUploadDialog(false)}>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add student dialog */}
      <Dialog open={showAddStudentDialog} onOpenChange={setShowAddStudentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Student</DialogTitle>
            <DialogDescription>Enter the student's credentials.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input placeholder="Student name..." value={newStudentName} onChange={e => setNewStudentName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input placeholder="Student email..." value={newStudentEmail} onChange={e => setNewStudentEmail(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddStudentDialog(false)}>Cancel</Button>
            <Button onClick={handleAddStudent}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
