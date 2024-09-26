import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Props {
    message: string;
    confirm: () => void;
    cancel: () => void;
}
export function ConfirmDelete({ message, confirm, cancel }: Props) {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Atenção</DialogTitle>
            </DialogHeader>

            <p className="text-black">{message}</p>

            <DialogFooter>
                <button
                    className={`font-bold text-white w-[120px] h-10 bg-gray-500 rounded-md`}
                    onClick={cancel}
                >
                    Cancelar
                </button>

                <button
                    className={`font-bold text-white w-[120px] h-10 bg-red-500 rounded-md`}
                    onClick={confirm}
                >
                    Excluir
                </button>
            </DialogFooter>
        </DialogContent>
    )
}