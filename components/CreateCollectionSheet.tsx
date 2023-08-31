import { useForm } from "react-hook-form";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { createCollectionSchema, createCollectionSchemaType } from "@/schema/createCollection";
import {zodResolver} from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { CollectionColor, CollectionColors } from "@/constants";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { createCollection } from "@/actions/collection";
import { toast } from "./ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

interface CreateCollectionSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const CreateCollectionSheet = ({ open, onOpenChange }: CreateCollectionSheetProps) => {
    const form = useForm<createCollectionSchemaType>({
        resolver: zodResolver(createCollectionSchema),
        defaultValues: {},
    })

    const router = useRouter()

    const onSubmit = async (data: createCollectionSchemaType) => {
        try {
            await createCollection(data)

            openChangeWrapper(false)
            router.refresh()

            toast({
                title: "Success!",
                description: "Collection created successfully",
            })
        } catch (error: any) {
            toast({
                title: "Error...",
                description: "Something went wrong",
                variant: "destructive"
            })
        }
    }

    const openChangeWrapper = (open: boolean) => {
        form.reset();
        onOpenChange(open)
    }

  return (
    <Sheet open={open} onOpenChange={openChangeWrapper}>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Add new collection</SheetTitle>
                <SheetDescription>
                    Collections are a way to group your tasks
                </SheetDescription>
            </SheetHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col mt-4">
                    <FormField 
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Personal" {...field} />
                                </FormControl>
                                <FormDescription>Collection name</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name="color"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Color</FormLabel>
                                <FormControl>
                                    <Select onValueChange={(color) => field.onChange(color)}>
                                        <SelectTrigger
                                            className={cn(
                                            "w-full h-8 text-white",
                                            CollectionColors[field.value as CollectionColor]
                                            )}
                                        >
                                            <SelectValue
                                            placeholder="Color"
                                            className="w-full h-8"
                                            />
                                        </SelectTrigger>
                                        <SelectContent className="w-full">
                                            {Object.keys(CollectionColors).map(color => (
                                            <SelectItem
                                                key={color}
                                                value={color}
                                                className={cn(
                                                `w-full h-8 rounded-md my-1 text-white focus:text-white focus:font-bold focus:ring-2 ring-neutral-600 focus:ring-inset dark:focus:ring-white focus:px-8 cursor-pointer`,
                                                CollectionColors[color as CollectionColor]
                                                )}
                                            >
                                                {color}
                                            </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription>Set a color for your collection</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
            <div className="flex flex-col gap-3 mt-4">
                <Separator />
                    <Button
                    disabled={form.formState.isSubmitting}
                    className="bg-gradient-to-r from-blue-500 via-cyan-500 to-lime-400"
                    onClick={form.handleSubmit(onSubmit)}
                    >
                        {form.formState.isSubmitting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                        Confirm
                    </Button>
            </div>
        </SheetContent>
    </Sheet>
  )
}

export default CreateCollectionSheet