import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, onSnapshot, doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { useAuth } from './AuthContext';
import { MenuItem, UserFavorite } from '../types';

interface FavoritesContextType {
  favorites: Record<string, boolean>; // map menuItemId -> boolean
  toggleFavorite: (item: MenuItem) => Promise<void>;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: {},
  toggleFavorite: async () => {},
  loading: false,
});

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setFavorites({});
      return;
    }

    setLoading(true);
    const favPath = `users/${user.uid}/favorites`;
    const favCol = collection(db, 'users', user.uid, 'favorites');

    const unsubscribe = onSnapshot(
      favCol,
      (snapshot) => {
        const favMap: Record<string, boolean> = {};
        snapshot.forEach((d) => {
          const data = d.data() as UserFavorite;
          if (data.menuItemId) {
            favMap[data.menuItemId] = true;
          }
        });
        setFavorites(favMap);
        setLoading(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, favPath);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const toggleFavorite = async (item: MenuItem) => {
    if (!user) {
      alert('Please sign in with Google to save favorites!');
      return;
    }

    const docId = `fav_${item.id.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
    const docRef = doc(db, 'users', user.uid, 'favorites', docId);
    const path = `users/${user.uid}/favorites/${docId}`;
    const isCurrentlyFav = !!favorites[item.id];

    try {
      if (isCurrentlyFav) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, {
          userId: user.uid,
          menuItemId: item.id,
          menuItemName: item.name,
          price: item.price,
          category: item.category,
          addedAt: serverTimestamp(),
        });
      }
    } catch (error) {
      handleFirestoreError(
        error,
        isCurrentlyFav ? OperationType.DELETE : OperationType.WRITE,
        path
      );
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
