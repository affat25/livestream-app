"use server"

import {v4} from "uuid"

import { getSelf } from "@/lib/auth-service"
import { getUserById } from "@/lib/user-service"

export const getViewer = async (hostIdentity: string) => {
    let self

    try {
        self = await getSelf()
    }catch{
        const id = v4()
        const username = `guest#${Math.floor(Math.random() *1000)}`

        self = {id, username};
    }

    const host = await getUserById(hostIdentity)

    if(!host){
        throw new Error("User not found")
    }

    const isHost = self.id === host.id

    return self

}