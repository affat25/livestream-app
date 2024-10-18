"use client"

import { useState, useEffect} from "react"
import { StreamChat} from  "stream-chat"
import './chat.css'

import { 
    Chat,
    Channel,
    Window,
    MessageList,
    MessageInput,
    Thread,
    LoadingIndicator,
 } from "stream-chat-react"

interface ChatProps {
    hostName: string
    hostIdentity: string
    viewerName: string
    viewerId: string
    isLive: boolean
    streamId: string
}

export const LiveChat = ({
    hostName,
    hostIdentity,
    isLive,
    streamId,
    viewerId,
    viewerName
}:ChatProps) => {

    const [client,setClient] = useState<any>()
    const [channel,setChannel] = useState<any>()

    const isHost = hostIdentity === viewerId

    const user = {
        id: isHost ? hostIdentity : viewerId,
        name: isHost ? hostName : viewerName,
        role: isHost ? 'admin' : 'user'
    }

    // const [chatClient, chatChannel] = useClient({
    //     user, 
    //     hostIdentity,
    //     streamId,
    // })

    useEffect(() =>{
        if (!user?.id) return 

        async function init() {
            const chatClient = new StreamChat(process.env.NEXT_PUBLIC_STREAM_API_KEY!)
                
            // const {token} = await fetch('/api/webhooks/stream',{
            //     method:'POST',
            //     body: JSON.stringify({
            //         id:user.id
            //     })
            // }).then(r=>r.json())
            
            await chatClient.connectUser(user,chatClient.devToken(user.id))
            
            const channel = chatClient.channel('livestream',streamId,{
                members:[hostIdentity]
            })

                await channel.watch()
                setChannel(channel)
                setClient(chatClient)
        }


        init()

        if(client) return () => client.disconnectUser()
    }, [user.id])

    if((!channel || !client) && isLive) return <LoadingIndicator/>

  return (
    <div className="flex flex-col bg-background border-l border-b border-[#4e4c4c77] pt-0 h-[calc(100vh-80px)]">
       {isLive &&(
         <Chat client={client} theme="str-chat__theme-dark">
            <Channel channel={channel}>
                <Window >
                    <MessageList />
                    <MessageInput />
                </Window>
                <Thread/>
            </Channel>
        </Chat>
       )}
       {!isLive && (
            <div className="h-full flex space-y-4 pt-3 justify-center text-muted-foreground">
                Chat is disabled when host is offline
            </div>
       )}
    </div>
  )
}
