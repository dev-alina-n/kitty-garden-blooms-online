import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ChatKitty } from "./ChatKitty";

interface ChatDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ChatDialog({ isOpen, onClose }: ChatDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl h-[80vh]">
                <DialogHeader>
                    <DialogTitle>Чат с Китти</DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-hidden">
                    <ChatKitty />
                </div>
            </DialogContent>
        </Dialog>
    );
} 