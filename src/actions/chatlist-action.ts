'use server'

import { deleteFileFromPinecone } from "@/lib/pinecone/pinecone"
import { deleteChat } from "@/lib/supabase/supabase-chats"
import { deleteFileFromBucket } from "@/lib/supabase/supabase-storage"
import { revalidatePath } from "next/cache"

interface RemoveChat {
    success?: boolean
}
export const removeChat = async ({ id, fileName }: { id: number, fileName: string }): Promise<RemoveChat> => {
    try {
        console.log('removeChat', id, fileName)
        let success: boolean = false
        // Remove from storage
        success = await deleteFileFromBucket(fileName)

        // Remove chat from database
        success = await deleteChat(id)

        // Remove from  pinecone
        success = await deleteFileFromPinecone(fileName)

        // if (success) revalidatePath(`/chat/${id}`)
        return { success }
    } catch (error) {
        console.error('Unexpected Error deleting chat: ', error);
        return { success: false }
    }

}