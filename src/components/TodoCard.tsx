'use client';

import React, { useState } from 'react';
import { User, useDeleteUserMutation, useEditUserMutation } from '../api/todo.api';
import { useEditUserStore } from '../store/editUserStore';
import { userSchema } from '../schemas/userSchema';

interface TodoCardProps {
  user: User;
}

export default function TodoCard({ user }: TodoCardProps) {
  const {
    isEditing,
    editingId,
    name,
    price,
    avatar,
    setName,
    setPrice,
    setAvatar,
    setEditUser,
    resetEdit,
  } = useEditUserStore();

  const [localErrors, setLocalErrors] = useState<{ [key: string]: string }>({});

  const isThisCardEditing = isEditing && editingId === user.id;

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [editUser, { isLoading: isEditingUser }] = useEditUserMutation();

  const handleUpdate = async () => {
    setLocalErrors({});
    const validation = userSchema.safeParse({ name, price, avatar });

    if (!validation.success) {
      const fieldErrors: { [key: string]: string } = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setLocalErrors(fieldErrors);
      return;
    }

    try {
      await editUser({ ...user, name, price, avatar }).unwrap();
      resetEdit();
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(user.id).unwrap();
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl transition-all hover:scale-[1.02] hover:shadow-2xl">
      {isThisCardEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Name"
          />
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Price"
          />
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className={`w-full bg-white/5 border ${localErrors.avatar ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Avatar URL"
          />
          {Object.keys(localErrors).length > 0 && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 space-y-1">
              {Object.values(localErrors).map((msg, i) => (
                <p key={i} className="text-red-400 text-xs font-medium">• {msg}</p>
              ))}
            </div>
          )}
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleUpdate}
              disabled={isEditingUser}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-2.5 rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
            >
              {isEditingUser ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={resetEdit}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-2.5 rounded-xl transition-all border border-white/10"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="relative w-16 h-16 rounded-full object-cover border-2 border-white/20"
                />
              ) : (
                <div className="relative w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center border-2 border-white/20 text-2xl font-bold text-neutral-500">
                  {user.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">{user.name}</h3>
              <p className="text-blue-400 font-mono text-lg font-semibold">${user.price}</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setEditUser(user)}
              className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold py-2.5 rounded-xl transition-all border border-white/10 hover:border-white/20"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold py-2.5 rounded-xl transition-all border border-red-500/20 hover:border-red-500/30 disabled:opacity-50"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
