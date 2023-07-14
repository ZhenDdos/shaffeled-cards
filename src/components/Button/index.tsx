import styles from "./Button.module.scss"

interface ButtonProps extends React.PropsWithChildren {
    onClick(): void,
    isDisabled?: boolean
    className?: string
}

export const Button = ({children, onClick, isDisabled, className = ''}: ButtonProps) => {
    return (
        <button className={`${styles.Button} ${className}`} onClick={onClick} disabled={isDisabled}>
            {children}
        </button>
    )
}