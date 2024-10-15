import { useEffect, useState } from 'react';
import styles from './Main.module.css';
import logo from '../../assets/logo.png'
import axios from 'axios';
//react-icons
import { FaSearch } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
function Main() {
  //state
  const [members, setMembers] = useState([])
  const [filteredMembers, setFilteredMembers] = useState([])
  // race filter
  const [whatToShow, setWhatToShow] = useState('all')
  //search
  const [searchText, setSearchText] = useState('')
  const [showSearchBar, setShowSearchBar] = useState(false)
  //адоптив
  const [showButtons, setShowButtons] = useState(false)
  //получение
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response1 = await axios.get('https://rickandmortyapi.com/api/character')
        const response = response1.data.results
        console.log(response)
        const updatedMembers = await Promise.all(response.map(async (member) => {
          const firstEpisodeUrl = member.episode[0]
          if (!firstEpisodeUrl) {
            return {...member, firstEpisode: "Unknown"}
          }
          try {
            const episodeResponse = await axios.get(firstEpisodeUrl)
            return {
              ...member,
              firstEpisode: episodeResponse.data.name,
            };
          } catch (episodeError) {
            console.error("Error fetching episode details:", episodeError)
            return { ...member, firstEpisode: "Error fetching episode" }
          }
        }));
        setMembers(updatedMembers)
        setFilteredMembers(updatedMembers)
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };
  
    fetchMembers()
  }, [])
  
  useEffect(() => {
    if (whatToShow === 'all') {
      setFilteredMembers(members)
    } 
    else if (whatToShow === 'humans') {
      setFilteredMembers(members.filter((member) => member.species === 'Human'))
    }
    else if (whatToShow === 'humanoids') {
      setFilteredMembers(members.filter((member) => member.species === 'Humanoid'))
    }
    else if (whatToShow === 'aliens') {
      setFilteredMembers(members.filter((member) => member.species === 'Alien'))
    }
    else if (whatToShow === 'robots') {
      setFilteredMembers(members.filter((member) => member.species === 'Robot'))
    }
    else if (whatToShow === 'animals') {
      setFilteredMembers(members.filter((member) => member.species === 'Animal'))
    }
    else if (whatToShow === 'alive') {
      setFilteredMembers(members.filter((member) => member.status === 'Alive'))
    }
    else if (whatToShow === 'dead') {
      setFilteredMembers(members.filter((member) => member.status === 'Dead'))
    }
    else if (whatToShow === 'unknown') {
      setFilteredMembers(members.filter((member) => member.status === 'unknown'))
    }
  }, [whatToShow, members])

  useEffect(() => {
    const filtered = members.filter((member) =>
      member.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredMembers(filtered);
  }, [searchText, members]);

 
  return (
    <div className={styles['main']}>
     <div className={styles['container']}>
      <div className={styles['title']}>
        <img onClick={() => {
        setShowButtons(true)
        }} src={logo} className={styles['logo']} alt="logo" />
      </div>
      <div className={styles['content']}>
      <div className={showButtons ? styles['buttons2'] : styles['buttons']}>
      {showSearchBar ? (
  <>
  <div className={styles['search-bar']}>
    <button className={styles['buttonSearch-close']} onClick={() => setShowSearchBar(false)}><ImCross /></button>
    <p>Search:</p>
    <input
      type="text"
      placeholder="Search..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      className={styles['search-input']}
    />
    {showButtons && (
      <button className={styles['buttonSearch-ok']} onClick={() => setShowButtons(false)}><FaCheck /></button>
    )}
    
    </div>
  </>
) : (
  <>
    <button className={styles['buttonSearch']} onClick={() => setShowSearchBar(true)}>Search <FaSearch /></button>
    <button className={styles['buttonAll']} onClick={() => {setWhatToShow('all'), setShowButtons(false)}}>All</button>
    <div className={styles['race-buttons-content']}>
      Races:
      <button className={styles['button']} onClick={() => {setWhatToShow('humans'), setShowButtons(false)}}>Humans</button>
      <button className={styles['button']} onClick={() => {setWhatToShow('humanoids'), setShowButtons(false)}}>Humanoids</button>
      <button className={styles['button']} onClick={() => {setWhatToShow('aliens'), setShowButtons(false)}}>Aliens</button>
      <button className={styles['button']} onClick={() => {setWhatToShow('robots'), setShowButtons(false)}}>Robots</button>
      <button className={styles['button']} onClick={() => {setWhatToShow('animals'), setShowButtons(false)}}>Animals</button>
    </div>
    <div className={styles['status-buttons-content']}>
      Status:
      <div className={styles['status-buttons-content2']}>
      <button className={styles['button2']} onClick={() => {setWhatToShow('alive'), setShowButtons(false)}}>Alive</button>
      <button className={styles['button2']} onClick={() => {setWhatToShow('dead'), setShowButtons(false)}}>Dead</button>
      <button className={styles['button2']} onClick={() => {setWhatToShow('unknown'), setShowButtons(false)}}>Unknown</button>
      </div>
    </div>
  </>
)}
      </div>
      <ul className={styles['list']}>
        {filteredMembers.map((member) => {
          return (
            <li className={styles['item']} key={member.id}>
              <img src={member.image} className={styles['image']} alt="image" />
              <div className={styles['info']}>
                <p className={styles['name']}>{member.name}</p>
                <p className={styles['gender']}> gender - {member.gender}</p>
                <div className={styles['content2']}>
                <p className={styles['status']}>status - {member.status}</p> 
                <div
                    className={
                      member.status === 'Dead'
                        ? styles['status-red']
                        : member.status === 'Alive'
                        ? styles['status-green']
                        : styles['status-grey']
                    }
                  ></div>
                  </div>
               <p className={styles['episode']}>first seen - {member.firstEpisode}</p>
              </div>
            </li>
          )
        })}
        </ul>
        </div>
     </div>
    </div>
  )
}
export default Main