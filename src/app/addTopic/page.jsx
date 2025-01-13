'use client';

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

const AddTopic = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Title and Description are required");
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/topics', {
        method: 'POST',
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-3 items-center'>
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className='border border-slate-500 px-8 py-2 rounded-sm w-full'
        type="text"
        placeholder='Topic Title' />

      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className='border border-slate-500 px-8 py-2 rounded-sm w-full'
        type="text"
        placeholder='Topic Description' />

      <button type='submit' className='text-white p-1 bg-green-400 rounded-sm w-fit px-6 py-2'>Add Topic</button>
    </form>
  )
}

export default AddTopic