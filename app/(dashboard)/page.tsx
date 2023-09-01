import CollectionCard from "@/components/CollectionCard";
import CreateCollectionBtn from "@/components/CreateCollectionBtn";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { prisma } from "@/lib/primsa";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser()
  if (!user) return null;

  const collections = await prisma.collection.findMany({
    include: {
      tasks: true
    },
    where: {
      userId: user?.id
    }
  });

  return (
    <div className="flex w-full flex-col gap-5">
      <h1 className="text-4xl font-bold mb-5">Welcome, {user.firstName} {user.lastName}</h1>
      {collections.length === 0 && (
        <div className="flex flex-col gap-5">
          <Alert>
            <AlertTitle>There are no collections yet!</AlertTitle>
            <AlertDescription>Create a collection to get started</AlertDescription>
          </Alert>
          <CreateCollectionBtn />
        </div>
      )}
      {collections.length >= 1 && (
        <>
          <CreateCollectionBtn />
          <div className="flex flex-col gap-4 mt-6">
            {collections.map(collection => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </>
       )}
    </div>
  )
}