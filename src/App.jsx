import { useState, useEffect, Fragment } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setQuotes(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
  }, []);

  return (
    <div className="container">
      <h1>Lista de Posts</h1>
      <div className="posts-container">
        {quotes.map((quotes) => (
          <div className="post-card" key={quotes.id}>
            <h3>{quotes.title}</h3>
            <p>{quotes.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App
