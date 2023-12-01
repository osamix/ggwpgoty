import React from "react"
import './Game.css'

export interface GameProps {
    id: number
    name: string
    points: number
}

export interface GameComponentProps extends GameProps {
    index: number
    isLoading: boolean
    onNameChange: (id: number, value: string) => void
    onPointsChange: (id: number, value: number) => void
    removeGame: (value: number) => void
}

export const Game = ({ id, name, points, index, isLoading, onNameChange, onPointsChange, removeGame }: GameComponentProps) => {
    
    const minusPoints = () => {
        if (points === 1) return
        onPointsChange(id, points - 1)
    }
    const plusPoints = () => {
        if (points === 7) return
        onPointsChange(id, points + 1)
    }
    
    return (
        <div className="Game">
            <span>{index + 1}</span>
            <input
                disabled={isLoading}
                name={`game${index + 1}`}
                className="input"
                placeholder="Add title ..."
                type="text"
                value={name}
                onChange={e => onNameChange(id, e.currentTarget.value)}
                required
            />
            <button
                disabled={isLoading}
                type="button"
                onClick={minusPoints}
                className="points"
            >-</button>
            <span>{points}</span>
            <input className="pointsInput" name={`score${index + 1}`} value={points} readOnly required/>
            <button
                disabled={isLoading}
                type="button"
                onClick={plusPoints}
                className="points">+</button>
            <button
                disabled={isLoading}
                type="button"
                onClick={() => removeGame(id)}
                className="removeButton">X</button>
        </div>
    )
}