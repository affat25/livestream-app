"use client"

import { useEffect, useState} from 'react'
import { Channel, StreamChat, TokenOrProvider, User} from 'stream-chat'


interface UseClientProps {
    user: User
    hostIdentity: string
    streamId: string
    // tokenOrProvider: TokenOrProvider
}

export const useClient = ({
    user,
    hostIdentity,
    streamId,
}:UseClientProps) => {

    const [chatClient, setChatClient] = useState<any>()
    const [chatChannel, setChatChannel] = useState<any>()

    useEffect(()=>{
        const client = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY!)
                
        let didUserConnectInterrupt = false

        const connectionPromise = client
        .connectUser(user,client.devToken(user.id))
        .then(()=>{
            if(!didUserConnectInterrupt){
                // const channel = client.channel('livestream',streamId,{
                //     members:[hostIdentity]
                // })
                // channel.watch().then(()=>{setChatChannel(channel)})
                setChatClient(client)
            }
        })

        const channel = client.channel('livestream',streamId,{
                members:[hostIdentity]
        })
        channel.watch().then(()=>{setChatChannel(channel)})
        
        return ()=> {
            didUserConnectInterrupt = true
            setChatChannel(undefined)
            setChatClient(undefined)
            connectionPromise.then(() => client.disconnectUser())
        }

    },[user.id,hostIdentity,streamId])

    return [chatClient,chatChannel]

}