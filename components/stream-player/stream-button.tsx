"use cleint"

import { updateStream } from "@/actions/stream"
import { useTransition } from "react"
import { toast } from "sonner"
import { Button } from "../ui/button"


interface StreamButtonProps {
    isLive: boolean
}

export const StreamButton = ({
    isLive
    }:StreamButtonProps) =>{
         const [isPending, startTransition] = useTransition()
    
         const handleStartStream = () => {
             startTransition(() =>{
                updateStream( {isLive:true})
                 .then(() => toast.success("You are now Live!"))
                 .catch(()=> toast.error("Something went wrong"));
             })
         }
     
         const handleEndStream = () => {
             startTransition(() =>{
                updateStream( {isLive:false})
                 .then((data) => toast.success("You are offline"))
                 .catch(()=> toast.error("Something went wrong"));
             })
         }
         
         const onClick = () => {
             if(isLive){
                 handleEndStream();
             }else{
                 handleStartStream();
             }
         }   
    return (
        <div className="space-y-2 pl-3 pt-3">
             <Button 
            disabled= {isPending} 
            onClick={onClick} 
            variant="primary"
            >
                {!isLive ? "Start Streaming":"End Stream"}
            </Button>
        </div>
    )
}