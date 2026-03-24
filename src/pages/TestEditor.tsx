import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react";

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
}

const TestEditor = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, text: "", options: ["", "", "", ""], correct: 0 },
  ]);

  const addQuestion = () => {
    setQuestions(prev => [
      ...prev,
      { id: prev.length + 1, text: "", options: ["", "", "", ""], correct: 0 },
    ]);
  };

  const updateQuestion = (idx: number, field: string, value: string) => {
    setQuestions(prev =>
      prev.map((q, i) => (i === idx ? { ...q, [field]: value } : q))
    );
  };

  const updateOption = (qIdx: number, oIdx: number, value: string) => {
    setQuestions(prev =>
      prev.map((q, i) =>
        i === qIdx
          ? { ...q, options: q.options.map((o, j) => (j === oIdx ? value : o)) }
          : q
      )
    );
  };

  const removeQuestion = (idx: number) => {
    setQuestions(prev => prev.filter((_, i) => i !== idx));
  };

  const handleExit = () => {
    setShowExitDialog(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-6 py-4 flex items-center justify-between sticky top-0 bg-background z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleExit}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Test Title..."
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="text-lg font-heading font-bold border-none shadow-none focus-visible:ring-0 w-64"
          />
        </div>
        <Button className="gap-2" onClick={() => navigate("/dashboard")}>
          <Save className="h-4 w-4" /> Save
        </Button>
      </header>

      <main className="max-w-2xl mx-auto p-6 space-y-6">
        {questions.map((q, qIdx) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border bg-card p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-muted-foreground">
                Question {qIdx + 1}
              </span>
              {questions.length > 1 && (
                <Button variant="ghost" size="icon" onClick={() => removeQuestion(qIdx)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              )}
            </div>

            <Textarea
              placeholder="Enter your question..."
              value={q.text}
              onChange={e => updateQuestion(qIdx, "text", e.target.value)}
              rows={2}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {q.options.map((opt, oIdx) => (
                <div key={oIdx} className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setQuestions(prev =>
                        prev.map((qq, i) =>
                          i === qIdx ? { ...qq, correct: oIdx } : qq
                        )
                      )
                    }
                    className={`h-8 w-8 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                      q.correct === oIdx
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {String.fromCharCode(65 + oIdx)}
                  </button>
                  <Input
                    placeholder={`Option ${String.fromCharCode(65 + oIdx)}`}
                    value={opt}
                    onChange={e => updateOption(qIdx, oIdx, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        <Button variant="outline" className="w-full gap-2" onClick={addQuestion}>
          <Plus className="h-4 w-4" /> Add Question
        </Button>
      </main>

      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save changes?</AlertDialogTitle>
            <AlertDialogDescription>
              Would you like to save your test before leaving?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => navigate("/dashboard")}>
              Discard
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => navigate("/dashboard")}>
              Save
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TestEditor;
