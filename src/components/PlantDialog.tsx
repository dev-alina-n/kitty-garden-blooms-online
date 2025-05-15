import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { PlantForm } from "./PlantForm";

interface PlantDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onPlantCreated: (plantData: { type: 'flower' | 'strawberry'; name: string; color: string }) => void;
}

export function PlantDialog({ isOpen, onClose, onPlantCreated }: PlantDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Посадить новое растение</DialogTitle>
                </DialogHeader>
                <PlantForm onAddPlant={onPlantCreated} />
            </DialogContent>
        </Dialog>
    );
} 