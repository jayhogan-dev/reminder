"use client"

import { Collection } from "@prisma/client"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { useState } from "react"
import { Button } from "./ui/button"
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons"
import { Progress } from "./ui/progress"

interface CollectionCardProps {
    collection: Collection
}

const tasks: string[] = ["Clean the bathroom", "Wash the dishes"];

const CollectionCard = ({ collection }: CollectionCardProps) => {
    const [isOpen, setIsOpen] = useState(true)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
            <Button 
                variant="ghost" 
                className="w-full flex justify-between p-6 bg-cyan-400"
            >
                <span className="text-white font-bold">{collection.name}</span>
                {!isOpen && <CaretDownIcon className="h-6 w-6" />}
                {isOpen && <CaretUpIcon className="h-6 w-6" />}
            </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex rounded-b-md flex-col dark:bg-neutral-900 shadow-lg">
            {tasks.length === 0 && <div>No tasks</div>}
            {tasks.length > 0 && (
                <>
                    <Progress className="rounded-none" value={4} />
                    <div>
                        {tasks.map((task) => (
                            <div key={task}>{task}</div>
                        ))}
                    </div>
                </>
            )}
        </CollapsibleContent>
    </Collapsible>
  )
}

export default CollectionCard