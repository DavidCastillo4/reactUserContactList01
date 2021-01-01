import React, { useState } from 'react';
import './App.css';

let App = () => {
  let [users, setUsers] = useState([]);

  let fetchData = () => {
    fetch('https://randomuser.me/api?results=25')
      .then(res => res.json())
      .then(data => data.results.map(user => (
        {
          name: `${user.name.first} ${user.name.last}`,
          phone: user.phone,
          email: user.email,
          pic: user.picture.thumbnail
        }
      )))
      .then(contacts => setUsers(contacts))
      .catch(error => console.log('errr', error))
  };

  let toggle = (e, id) => {
    e.preventDefault();
    let info = document.getElementById(id);
    let classCurrent = info.className;
    let classNew = classCurrent == 'Show' ? 'Hide' : 'Show';
    info.className = classNew;
    e.target.innerHTML = classCurrent;
  };

  let Toggle = (props) => {
    return (
      <button className={"btn"} onClick={(e) => toggle(e, props.id)}>Show</button>
    )
  };

  window.onload = function () {
    fetchData();
  };

  return (
    <div>
      <ul>
        {users.map((user, i) => (
          <li key={i}>
            <div id="fullName">
              <img src={user.pic} alt={"avitar"}></img>
              {user.name}
              <Toggle id={i} />
            </div>
            <div id={i} className={"Hide"}>
              <div className={"detail"}>{user.phone}</div>
              <div className={"detail"}>{user.email}</div>
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

