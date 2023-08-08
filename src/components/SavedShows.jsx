import React from 'react'
import { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { updateDoc, onSnapshot,doc } from 'firebase/firestore';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import requests from '../Requests';
import {AiOutlineClose} from 'react-icons/ai'

const SavedShows = () => {

    const [movies, setMovies] = useState([]);

    const {user} = UserAuth();

    useEffect(() =>{
        onSnapshot(doc(db,'users',`${user?.email}`), (doc) =>{
            setMovies(doc.data()?.savedShows);
        })

    },[user?.email]);

    const slideLeft = () =>{
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 500;
    };

    const slideRight = () =>{
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 500;
    };

    const movieRef = doc(db, 'users', `${user?.email}`);

    const deleteShow = async (itemid) => {
        try{
            const results = movies.filter((item) => item.id !== itemid);
            await updateDoc(movieRef,{
                savedShows : results
            })
            
        }catch(error){
            console.log(error);
        }
    }

  return (
    <div className='relative flex items-center group'>
    <MdChevronLeft onClick={slideLeft} size={40}
        className='bg-white left-0 rounded-full z-10 absolute opacity-50 hover:opacity-100 cursor-pointer hidden group-hover:block' />
    <div id={'slider'}
        className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
        { movies.map((item,id) => (
        <div key={id} className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
            <img className="w-full h-auto block" 
            src={`${requests?.imagebaseUrl}/w500${item?.img}`}
                alt={item?.title} />
            <div
                className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                <p
                    className='flex justify-center items-center h-full w-full whitespace-normal text-xs md:text-sm font-bold'>
                    {item?.title}</p>
                    <AiOutlineClose onClick={() => deleteShow(item?.id)} className='absolute top-1 right-2'/>
            </div>
        </div>
        ))
        }

    </div>
    <MdChevronRight onClick={slideRight} size={40}
        className='bg-white right-0 rounded-full z-10 absolute opacity-50 hover:opacity-100 cursor-pointer hidden group-hover:block' />
</div>
  )
}

export default SavedShows