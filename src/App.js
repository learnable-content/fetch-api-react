import React,  { useEffect, useState } from 'react';
import './App.css';
import Chuck from './chuck.jpg';
import axios from 'axios';

function App() {

  const [state, setState] = useState({
    joke: '',
    searchKeyword: '',
    searchUrl: 'https://api.chucknorris.io/jokes/search?query='
  })


  useEffect( () => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    const result = await axios.get('https://api.chucknorris.io/jokes/random');
    console.log(result.data.value);
    setState({
      ...state,
      joke: result.data.value
    });
  }

  const searchJoke = (event) => {
    console.log(event.target.value);
    setState({
      ...state,
      searchKeyword: event.target.value
    })
  }

  const fetchMyJoke = async () => {
    const result = await axios.get(state.searchUrl + state.searchKeyword);
    console.log(result.data.result);

    const jokePosition = Math.floor(Math.random()*result.data.result.length + 1);
    console.log( jokePosition );
    setState({
      ...state,
      joke: result.data.result[jokePosition].value
    })
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h1 className="title">Chuck Norris API</h1>
          <img src={Chuck} alt="Chuck Norris"/>
        </div>

        <div className="col-6 searchJokeCol">
          <div className="card">
            <div className="card-header">
              Search for a word
            </div>
            <div className="card-body">
              <input type="text" onChange={searchJoke} />
            </div>
          </div>

          <div>
            <button onClick={fetchMyJoke} className="btn btn-warning btn-lg">Generate Joke</button>
          </div>

        </div>

      </div>

      <h2 className="subTitle">Here is the Joke</h2>
      <h4>{state.joke}</h4>
      
    </div>
  );
}

export default App;
