import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser()
  
  if (!user) return null;

  return (
    <div className="flex w-full">
      <h1 className="text-4xl font-bold">Welcome, {user.firstName} {user.lastName}</h1>
    </div>
  )
}