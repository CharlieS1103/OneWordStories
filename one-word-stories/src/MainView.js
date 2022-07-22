
import './MainView.css';
import React, { useState, useEffect } from 'react';
import {Card} from './Components'
import { invoke } from '@tauri-apps/api/tauri'
function MainView() {
  const fetch_stories = async () => {
     let stories = await invoke('fetch_stories');
    return stories;
  }
  const post_stories = async (story) => {
    await invoke('post_stories', story);
  }
  const [stories, setStories] = useState([]);
 useEffect(() => { 
  fetch_stories().then(stories => setStories(stories));
  }, []);


  return (
    <div className="MainView">
      <div className='MainView-container'>
        <button className='add-story-button button' onClick={() => {
          
        }}>+</button>
        <div className='content-grid-container'>
          {stories.map((story) => {
            return <Card text={story.body.map((word) => {return word+" "})} title={story.title} />
          })}

          
          </div>
        </div>

        </div>
  );
}

export default MainView;
