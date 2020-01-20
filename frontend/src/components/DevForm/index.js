import React, { useState, useEffect } from 'react';

import './styles.css';

const DevForm = ({ onSubmit }) => {
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

  async function handleSubmit(e) {
    e.preventDefault();
    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude
    });
    setGithubusername('');
    setTechs('');
  }

  return (
    <form onSubmit={handleSubmit}>
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
  );
};

export default DevForm;
