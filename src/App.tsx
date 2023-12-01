import React, { useState, useEffect, FormEvent } from 'react';
import { Game, GameProps } from './Game'
import './App.css';
import unicorn from "./unicorn-sparkles.gif"

const MAX_STARTING_POINTS_TO_USE = 12

function App() {
  const [pointsUsed, setPointsUsed] = useState(1)
  const [pointsToUse, setPointsToUse] = useState(MAX_STARTING_POINTS_TO_USE)
  const [username, setUsername] = useState("")
  const [gamesList, setGamesList] = useState<GameProps[]>([{
    id: Math.random(),
    name: "",
    points: 1
  }])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let points = 0
    gamesList.forEach(game => {
      points = points + game.points
    })
    setPointsUsed(points)
    let games = gamesList.length
    setPointsToUse(Math.max(MAX_STARTING_POINTS_TO_USE, MAX_STARTING_POINTS_TO_USE + games - 3))
  }, [gamesList])

  const resetState = () => {
    setUsername("")
    setGamesList([{
      id: Math.random(),
      name: "",
      points: 1
    }])
  }

  const handleNameChange = (id: number, value: string) => {
    setGamesList(prevState => {
      const games = [...prevState]
      const game = games.find(g => g.id === id)
      if (game) {
        game.name = value
      }
      return games
    })
  }

  const handlePointsChange = async (id: number, value: number) => {
    setGamesList(prevState => {
      const games = [...prevState]
      const game = games.find(g => g.id === id)
      if (game) {
        game.points = value
      }
      return games
    })
  }

  const addNewGame = () => {
    if (gamesList.length >= 10) {
      alert("Dobra, dobra, wystarczy, nikt nie będzie tego czytał.")
      return;
    }
    const game = {
      id: Math.random(),
      name: "",
      points: 1,
    }
    setGamesList(prevState => [...prevState, game])
  }

  const removeGame = (id: number) => {
    if (gamesList.length === 1) {
      alert("Nie no, jedną chociaż zostaw")
      return
    }
    setGamesList(prevState => {
      const newGames = prevState.filter(game => game.id !== id)
      return newGames
    })
  }

  const submitForm = (formData: FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    formData.preventDefault()
    if (!username.length) {
      alert("To nie obywatelski donos, żeby był anonimowy")
      setIsLoading(false)
      return
    }
    if (pointsUsed > pointsToUse) {
      alert("Na bogato, jeszcze więcej punktów daj! Co za koleś")
      setIsLoading(false)
      return
    }
    if (gamesList.some(game => game.name === "")) {
      alert("Gra bez tytułu? Jakiś no name z bazaru?")
      setIsLoading(false)
      return
    }
    fetch("https://script.google.com/macros/s/AKfycbzmO9NG-D5_mbui1avgdDLoWV9TXlm38TwdkISa3bCQxzpzB0cAdR7tPCf0if2wGM_WAg/exec", {
      method: 'POST',
      body: new FormData(formData.currentTarget),
    })
    .then(() => {
      alert("Dziękować! Zapraszam na kanał cycki na zasłużoną nagrodę.");
      resetState()
    })
    .catch((err) => alert("AJ WAJ, coś się zesrało!"))
    .finally(() => setIsLoading(false))
  }

  return (
    <div className="App">
      <form
        id="form"
        onSubmit={submitForm}
        className="container"
      >
        <header className="header">
        <img className="image" src={unicorn} />
          <span className="c1">G</span>
          <span className="c2">G</span>
          <span className="c3">W</span>
          <span className="c4">P</span>
          <span className="c4"> </span>
          <span className="c4">G</span>
          <span className="c5">O</span>
          <span className="c6">T</span>
          <span className="c7">Y</span>
          <img className="image2" src={unicorn} />
        </header>
        <input
          disabled={isLoading}
          name="who"
          className="nameInput"
          placeholder="Who dis?"
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
          required
        />
        <div className="counter">
          Points used: <span className={pointsUsed <= pointsToUse ? "ok" : "err"}>{pointsUsed}</span>/{pointsToUse}
        </div>
        {gamesList.map((game, index) => (
          <Game
            key={game.id}
            id={game.id}
            name={game.name}
            points={game.points}
            index={index}
            onNameChange={handleNameChange}
            onPointsChange={handlePointsChange}
            removeGame={removeGame}
            isLoading={isLoading}
          />
          ))}
        <button
          disabled={isLoading || gamesList.length === 10}
          type="button"
          className="addButton"
          onClick={addNewGame}
        >Add new game</button>
        <button
          disabled={isLoading || pointsUsed > pointsToUse}
          type="submit"
          className="submitButton"
        >
          {
            isLoading ? "⏳" : "SUBMIT 📨"
          }
        </button>
      </form>
    </div>
  );
}

export default App;
