'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const EditTopicForm = ({ id, title, description }) => {

    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newTitle, newDescription }),
            });

            if (!res.ok) {
                throw new Error('Failed to update topic');
            }
            router.refresh();
            router.push('/');

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-3 items-center'>
            <input
                onChange={(e) => setNewTitle(e.target.value)}
                value={newTitle}
                className='border border-slate-500 px-8 py-2 rounded-sm w-full' type="text" placeholder='Topic Title' />

            <input
                onChange={(e) => setNewDescription(e.target.value)}
                value={newDescription}
                className='border border-slate-500 px-8 py-2 rounded-sm w-full' type="text" placeholder='Topic Description' />

            <button className='text-white p-1 bg-blue-400 rounded-sm w-fit px-6 py-2'>Update Topic</button>
        </form>
    )
}

export default EditTopicForm