import { create } from 'zustand';
import { User } from '../api/todo.api';

interface EditUserState {
  isEditing: boolean;
  editingId: string | null;
  name: string;
  price: string;
  avatar: string;
  setIsEditing: (val: boolean) => void;
  setName: (val: string) => void;
  setPrice: (val: string) => void;
  setAvatar: (val: string) => void;
  setEditUser: (user: User) => void;
  resetEdit: () => void;
}

export const useEditUserStore = create<EditUserState>((set) => ({
  isEditing: false,
  editingId: null,
  name: '',
  price: '',
  avatar: '',
  setIsEditing: (val) => set({ isEditing: val }),
  setName: (val) => set({ name: val }),
  setPrice: (val) => set({ price: val }),
  setAvatar: (val) => set({ avatar: val }),
  setEditUser: (user) =>
    set({
      isEditing: true,
      editingId: user.id,
      name: user.name,
      price: user.price,
      avatar: user.avatar,
    }),
  resetEdit: () =>
    set({
      isEditing: false,
      editingId: null,
      name: '',
      price: '',
      avatar: '',
    }),
}));
