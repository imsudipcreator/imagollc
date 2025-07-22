import { toast } from "sonner"

export const copyTextToClipboard = async (text: string, successMsg? : string, errorMsg?: string) => {
    try {
        await navigator.clipboard.writeText(text)
        if(successMsg) toast.success(successMsg)
    } catch {
        toast.error(errorMsg ?? "Could not copy text to clipboard")
    }
}