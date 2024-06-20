import React, { useEffect, useState } from 'react';
import axios from 'axios';
export const Likeunlike = ({likebyme,post_id,likes,setfeed}) => {
  const [liked, setLiked] = useState(likebyme);
  const [totallikes,settotallikes]= useState(likes)
  console.log(likebyme)
  
  
  const toggleLike = async () => {
    if(liked){
      const resp=await axios.post("http://localhost:3000/remove_like",{post_id:post_id},{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
      setLiked(false)
      settotallikes(totallikes-1)
    }
    else{
      const resp=await axios.post("http://localhost:3000/make_like",{post_id:post_id},{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
      
     setLiked(true)
     settotallikes(totallikes+1)
    }
    
    
  

  };

  return (
    <div className='pt-2 pb-2'>
    <button
      onClick={toggleLike}
      className={`flex items-center px-4 py-2 border rounded-lg focus:outline-none ${
        liked ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-blue-500 border-blue-500'
      }`}
    >
      {liked ? (
        <>
          <svg
            className="w-5 h-5 mr-2"
            fill="white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
          Unlike
        </>
      ) : (
        <>
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          Like
        </>
      )}
    </button>
    {totallikes?<div className='pt-3'>{totallikes}</div>:<div></div>}
    
    </div>
  );
};


