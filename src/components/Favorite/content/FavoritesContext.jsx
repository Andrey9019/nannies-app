/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { getDatabase, ref, set, get } from "firebase/database";
import { getAuth } from "firebase/auth";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (userId) {
      fetchFavorites(userId);
    }
  }, [userId]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchFavorites(user.uid);
      } else {
        setFavorites([]); // Очищаємо список, якщо користувач не авторизований
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchFavorites = async (userId) => {
    if (!userId) {
      return;
    }

    const db = getDatabase();
    const dbRef = ref(db, `users/${userId}/favorites`);
    setIsLoading(true);

    try {
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        setFavorites(Object.values(snapshot.val())); // Оновлюємо контекст
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Додання обраної няні
  const addToFavorites = async (userId, nanny) => {
    const db = getDatabase();
    try {
      const nannyId = nanny.nannyId || nanny.id; // Отримуємо ID няні
      if (!nannyId) throw new Error("Няня не має ID");

      // Створюємо шлях users/userId/favorites/nannyId і додаємо дані няні
      await set(ref(db, `users/${userId}/favorites/${nannyId}`), nanny);

      setFavorites((prev) => [...prev, nanny]);
    } catch (error) {
      console.error("Помилка при додаванні няні до обраних:", error.message);
    }
  };

  const removeFromFavorites = async (nannyId, userId) => {
    if (!nannyId || !userId) {
      console.error("NannyId or UserId is missing!");
      return;
    }

    const db = getDatabase();
    const dbRef = ref(db, `users/${userId}/favorites/${nannyId}`);

    try {
      await set(dbRef, null); // Видаляємо об'єкт няні
      fetchFavorites(userId); // Оновлюємо список обраних
    } catch (error) {
      console.error("Помилка при видаленні няні з обраних:", error);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ isLoading, favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoriteProvider;
