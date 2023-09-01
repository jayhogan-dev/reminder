"use client"

import { Collection } from "@prisma/client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    collection: Collection;
}

const CreateTaskDialog = ({ open, collection, setOpen }: Props) => {
    const openChangeWrapper = (value: boolean) => {
        setOpen(value)
    }


  return (
    <Dialog open={open} onOpenChange={openChangeWrapper}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle className="flex gap-2">Add task to collection: 
                    <span className="bg-clip-text text-cyan-400">
                        {collection.name}
                    </span>
                </DialogTitle>
                <DialogDescription>Add a task to your collection. You can add as many tasks as you want</DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default CreateTaskDialog