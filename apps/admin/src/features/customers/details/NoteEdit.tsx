import { useEffect, useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Pencil } from "lucide-react"
import { useApiWithStore } from "@/hooks/use-api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type NoteDialogueProps = {
    id: string;
    note: string;
    setNote: React.Dispatch<React.SetStateAction<string>>;
};

export const NoteEditDialouge = ({ id, note, setNote }: NoteDialogueProps) => {
    const api = useApiWithStore();
    const [draftNote, setDraftNote] = useState(note);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    // Reset draft when dialog opens again
    useEffect(() => {
        setDraftNote(note);
    }, [note]);

    const isChanged = draftNote !== note;

    const handleSave = () => {
        setSaving(true);
        api.put(`/customers/update/${id}`, { note: draftNote }).then(res => {
            toast.success("Note updated successfully");
            navigate(`/customers/${id}`);
            setNote(draftNote);
        }).catch(err => {
            toast.error("Failed to update note");
        }).finally(() => {
            setSaving(false);
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="icon-sm"
                    className=" shadow-none"
                >
                    <Pencil className="" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] md:max-w-[500px]  p-0 gap-0 overflow-hidden">
                <DialogHeader className="border-b px-3 py-3">
                    <DialogTitle>
                        <p className="text-sm font-semibold">Edit Note</p>
                    </DialogTitle>
                </DialogHeader>

                <div className="p-3">
                    <Textarea
                        id="note"
                        className="w-full h-24 font-light text-xs"
                        value={draftNote}
                        onChange={(e) => setDraftNote(e.target.value)}
                    />
                </div>

                <DialogFooter className="p-3 border-t">
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-xs shadow-none"
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            size="sm"
                            className="text-xs"
                            disabled={!isChanged}
                            onClick={handleSave}
                        >
                            {saving ? "Saving..." : "Save changes"}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
