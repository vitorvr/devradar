import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

const App = () => {
  const [devs, setDevs] = useState([]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [github_username, setGithubusername] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      err => {
        console.log(err);
      },
      { timeout: 30000 }
    );
  }, []);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      if (response.data) {
        setDevs(response.data);
      }
    }
    loadDevs();
  }, []);

  async function handleAddDev(e) {
    e.preventDefault();

    const response = await api.post('/devs', {
      github_username,
      techs,
      latitude,
      longitude
    });
    setDevs([...devs, response.data]);
    setGithubusername('');
    setTechs('');
  }

  return (
    <div id="app">
      <aside>
        <strong>Register</strong>
        <form onSubmit={handleAddDev}>
          <div className="input-block">
            <label htmlFor="github_username">Github username</label>
            <input
              name="github_username"
              id="github_username"
              required
              value={github_username}
              onChange={e => setGithubusername(e.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="techs">Technologies</label>
            <input
              name="techs"
              id="techs"
              required
              value={techs}
              onChange={e => setTechs(e.target.value)}
            />
          </div>
          <div className="input-group">
            <div className="input-block">
              <label htmlFor="Latitude">Latitude</label>
              <input
                type="number"
                name="latitude"
                id="latitude"
                required
                value={latitude}
                onChange={e => setLatitude(e.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="Longitude">Longitude</label>
              <input
                type="number"
                name="longitude"
                id="longitude"
                required
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
              />
            </div>
          </div>
          <button type="submit">Save</button>
        </form>
      </aside>
      <main>
        <ul>
          {devs.map(dev => {
            return (
              <li key={dev._id} className="dev-item">
                <header>
                  <img src={dev.avatar_url} alt={dev.github_username} />
                  <div className="user-info">
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span>
                  </div>
                </header>
                <p>{dev.bio}</p>
                <a href={`https://github.com/${dev.github_username}`}>
                  Access Github
                </a>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
};

export default App;
