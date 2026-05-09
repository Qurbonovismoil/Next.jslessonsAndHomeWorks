'use client';

import React, { useState } from 'react';
import { useAddUserMutation, useGetUsersQuery } from '../api/todo.api';
import TodoCard from '../components/TodoCard';
import { userSchema } from '../schemas/userSchema';
import { z } from 'zod';

export default function Home() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [avatar, setAvatar] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { data: users, isLoading, error } = useGetUsersQuery();
  const [addUser, { isLoading: isAdding }] = useAddUserMutation();

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setErrors({});
    const validation = userSchema.safeParse({ name, price, avatar });

    if (!validation.success) {
      const fieldErrors: { [key: string]: string } = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      await addUser({ name, price, avatar }).unwrap();
      setName('');
      setPrice('');
      setAvatar('');
    } catch (err) {
      console.error('Failed to add user:', err);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white selection:bg-blue-500/30">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header Section */}
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            User Management System
          </h1>
          <p className="text-neutral-400 text-lg">
            Powered by Next.js, Redux Toolkit & RTK Query
          </p>
        </header>

        {/* Add User Form */}
        <section className="mb-16">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm max-w-2xl mx-auto shadow-2xl">
            <h2 className="text-2xl font-semibold mb-6">Add New User</h2>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
                <input
                  type="text"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
                <input
                  type="text"
                  placeholder="Avatar URL"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className={`bg-neutral-900 border ${errors.avatar ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all`}
                />
              </div>
              {Object.keys(errors).length > 0 && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 space-y-1">
                  {Object.values(errors).map((msg, i) => (
                    <p key={i} className="text-red-400 text-sm font-medium">• {msg}</p>
                  ))}
                </div>
              )}
              <button
                type="submit"
                disabled={isAdding}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50"
              >
                {isAdding ? 'Adding...' : 'Add User'}
              </button>
            </form>
          </div>
        </section>

        {/* User List Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">All Users</h2>
            <div className="h-px flex-1 bg-white/10 ml-6"></div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
              <p className="text-neutral-400 font-medium animate-pulse">Fetching users from MockAPI...</p>
            </div>
          ) : error ? (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center">
              <p className="text-red-400 font-semibold mb-2">Error loading users</p>
              <p className="text-red-400/70 text-sm">Please check your internet connection or the API endpoint.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users?.map((user) => (
                <TodoCard key={user.id} user={user} />
              ))}
              {users?.length === 0 && (
                <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                  <p className="text-neutral-500 text-xl">No users found. Try adding some!</p>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
