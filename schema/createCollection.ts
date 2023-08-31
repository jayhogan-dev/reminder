import { CollectionColors } from "@/constants";
import { z } from "zod";

export const createCollectionSchema = z.object({
  name: z.string().min(3, {
    message: "Collection name must be more than 3 characters",
  }),
  color: z
    .string()
    .refine((color) => Object.keys(CollectionColors).includes(color)),
});

export type createCollectionSchemaType = z.infer<typeof createCollectionSchema>;
