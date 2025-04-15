import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/Users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <table class = "MovieTable">
        <thead>
          <tr>
            <th>UserID</th>
            <th>UserName</th>
            <th>UserPassword</th>
            <th>UserType</th>
            <th>MovieID</th>
            <th>UserReview</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.UserID}</td>
              <td>{user.UserName}</td>
              <td>{user.UserPassword}</td>
              <td>{user.UserType}</td>
              <td>{user.MovieID}</td>
              <td>{user.Review}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;