import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Grid2X2, Rows3 } from "lucide-react"

interface LayoutSelectProps {
    selectedColumn: string
    setSelectedColumn: React.Dispatch<React.SetStateAction<string>>
}

export const columns = [
    { icon: <Rows3 />, value: "column-1 lg:columns-2 2xl:columns-3", placeholder: "List" },
    { icon: <Grid2X2 />, value: "columns-2 lg:columns-3 2xl:columns-4", placeholder: "Grid" },
]

export const LayoutSelect = ({ selectedColumn, setSelectedColumn }: LayoutSelectProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'ghost'}>
                    {columns.find(c => c.value === selectedColumn)?.icon ?? <Grid2X2 />}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Layout</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={selectedColumn} onValueChange={setSelectedColumn}>
                    {
                        columns.map(column => (
                            <DropdownMenuRadioItem value={column.value} key={column.value}>
                                {column.icon}
                                <span>{column.placeholder}</span>
                            </DropdownMenuRadioItem>
                        ))
                    }
                </DropdownMenuRadioGroup>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}