"use client";

import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const initialUsers: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", age: 28 },
  { id: 2, name: "Bob Smith", email: "bob@example.com", age: 34 },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", age: 22 },
  { id: 4, name: "Diana Prince", email: "diana@example.com", age: 30 },
  { id: 5, name: "Ethan Hunt", email: "ethan@example.com", age: 40 },
  { id: 6, name: "Fiona Gallagher", email: "fiona@example.com", age: 25 },
];

export default function CRUDPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", age: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing !== null) {
      setUsers(users.map(u => u.id === isEditing ? { ...u, ...formData, age: Number(formData.age) } : u));
      setIsEditing(null);
    } else {
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        age: Number(formData.age),
      };
      setUsers([...users, newUser]);
    }
    setFormData({ name: "", email: "", age: "" });
  };

  const handleEdit = (user: User) => {
    setIsEditing(user.id);
    setFormData({ name: user.name, email: user.email, age: String(user.age) });
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">User Management CRUD</h2>
        <p className="mt-4 text-slate-600">Manage users in the system using client-side state.</p>
      </div>

      <div className="mt-12 bg-white p-8 rounded-2xl shadow-sm ring-1 ring-slate-200">
        <form onSubmit={handleAddOrUpdate} className="grid grid-cols-1 gap-6 sm:grid-cols-4 items-end">
          <div className="sm:col-span-1">
            <label className="block text-sm font-medium text-slate-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            />
          </div>
          <div className="sm:col-span-1">
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            />
          </div>
          <div className="sm:col-span-1">
            <label className="block text-sm font-medium text-slate-700">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            />
          </div>
          <div className="sm:col-span-1">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-semibold"
            >
              {isEditing !== null ? "Update User" : "Add User"}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-12 overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-slate-300">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{user.age}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
