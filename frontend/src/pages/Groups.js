import React, { useEffect, useState } from 'react'

export default function Groups() {

    const [groups, setGroups] = useState([]);
    useEffect(() => {
        const getAllGroups = async() => {
            const response = await fetch('http://localhost:4000/api/groups/');
            const json = await response.json();

            setGroups(json);
        }
        getAllGroups();
        console.log(groups);

    }, []);

  return (
    <div>
      {groups.map(group => (
        <p>{group._id} {group.name}a {group.location} {group.concerts[0].location}</p>
      ))}
    </div>
  )
}
