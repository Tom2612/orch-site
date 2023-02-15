import React, { useEffect, useState } from 'react'

export default function Groups() {

    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAllGroups = async() => {
            const response = await fetch('http://localhost:4000/api/groups/');
            const json = await response.json();

            setGroups(json);
            setLoading(false);
        }
        getAllGroups();

    }, []);

  return (
    <div>
      {!loading && groups.map(group => (
        <p>{group._id} {group.name} {group.location}</p>
      ))}
      {!loading && groups[0].concerts.map(concert => {
        return <p>{concert.location}</p>
      })}
    </div>
  )
}
