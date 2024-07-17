'use client'

import { client } from "@/libs/hono"
import { useQuery } from "@/libs/hono/hooks"

export const ClientComp = () => {
    const {data} = useQuery(client.hello, {query: {name: 'You'}})
    
    if (!data){
        return <></>
    }

    
    return (<>Hello {data.message}</>)
}