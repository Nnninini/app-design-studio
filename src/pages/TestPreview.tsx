import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Play, Pencil, Clock, Image as ImageIcon, FileText } from "lucide-react";

const TestPreview = () => {
  const navigate = useNavigate();
  const [timeLimit, setTimeLimit] = useState("00:30:00");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-heading text-xl font-bold text-foreground">Test Preview</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2" onClick={() => navigate("/test-editor")}>
            <Pencil className="h-4 w-4" /> Edit
          </Button>
          <Button className="gap-2">
            <Play className="h-4 w-4" /> Start
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: Settings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="rounded-xl border bg-card p-5 space-y-4">
              <h3 className="font-semibold text-card-foreground flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" /> Time Limit
              </h3>
              <Input
                value={timeLimit}
                onChange={e => setTimeLimit(e.target.value)}
                placeholder="HH:MM:SS"
                className="text-center text-2xl font-heading font-bold"
              />
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" className="flex-1" onClick={() => setTimeLimit("00:15:00")}>15m</Button>
                <Button variant="secondary" size="sm" className="flex-1" onClick={() => setTimeLimit("00:30:00")}>30m</Button>
                <Button variant="secondary" size="sm" className="flex-1" onClick={() => setTimeLimit("01:00:00")}>1h</Button>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-5 space-y-3">
              <h3 className="font-semibold text-card-foreground">Settings</h3>
              <Label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="rounded border-border" defaultChecked />
                <span className="text-sm">Auto-grade</span>
              </Label>
              <Label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-sm">Randomize questions</span>
              </Label>
            </div>
          </motion.div>

          {/* Center: Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-2 space-y-4"
          >
            <div className="rounded-xl border bg-card p-5 space-y-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-heading text-lg font-bold text-card-foreground">Math Quiz</h2>
                  <p className="text-sm text-muted-foreground">Chapter 3 – Algebra</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">4 questions • Multiple choice</p>
            </div>

            <div className="rounded-xl border bg-card overflow-hidden">
              <div className="aspect-[16/9] bg-muted flex items-center justify-center">
                <ImageIcon className="h-16 w-16 text-muted-foreground/30" />
              </div>
            </div>

            <div className="rounded-xl border bg-card p-5">
              <h3 className="font-semibold text-card-foreground mb-3">Question Preview</h3>
              <p className="text-foreground mb-4">1. What is the value of x in 2x + 4 = 10?</p>
              <div className="grid grid-cols-2 gap-2">
                {["A. 2", "B. 3", "C. 4", "D. 5"].map((opt, i) => (
                  <div
                    key={i}
                    className={`rounded-lg border p-3 text-sm ${
                      i === 1
                        ? "border-primary bg-primary/5 text-primary font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default TestPreview;
