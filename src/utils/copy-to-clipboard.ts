import { toast } from "sonner"

export const copyTextToClipboard = async (text: string, errorMsg?: string) => {
    try {
        await navigator.clipboard.writeText(text)
    } catch {
        toast.error(errorMsg ?? "Could not copy text to clipboard")
    }
}