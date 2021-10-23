/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import React from 'react'
import userService from '../../src/services/users'
const User = (props) => (
  <tr key = {props.key}>
    <th>{props.user.name}</th>
    <th>{props.user.blogs.length}</th>
  </tr>)

const Users = async () => {
  const users = await userService.getAll()
  console.log(users)
  return (
    <div>
      <table>
        {users.map( a => <User key = {a.id} user={a}/>)}
      </table>
    </div>
  )
}

export default Users