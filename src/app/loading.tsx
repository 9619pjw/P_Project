import { Skeleton } from '@/components/skeleton';


export default function Loading() {

    return 
    <>
        <Skeleton className="h-8 w-full bg-gray-400 my-4" />
        <Skeleton className="h-8 w-full bg-gray-400 my-4" />
        <Skeleton className="h-8 w-full bg-gray-400 my-4" />
        <Skeleton className="h-8 w-full bg-gray-400 my-4" />
    </>
}