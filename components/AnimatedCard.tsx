import { StyledView } from "./StyledView"


interface CardProps {
    children: React.ReactNode
    color?: string
    onClick?: () => void
}
const Card = ({ children, color , onClick }: CardProps) => {

    const colors = {
        blue: "bg-blue-500",
        red: "bg-red-500",
        green: "bg-green-500",
    }

    return (
        <StyledView className={`w-auto h-auto ${colors[color as keyof typeof colors]}
        rounded-lg
        text-white grid grid-cols-2 grid-rows-2 gap-1 overflow-visible`}>

            <StyledView className="border-2 
            rounded-lg
            w-100 h-100 flex flex-col justify-center items-center">
                {children}

            </StyledView>

        </StyledView>
    )
}

export default Card