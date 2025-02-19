import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getDatabase, ref, set, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import { Nanny } from "../../types/interfaces";

interface FavoritesContextType {
  isLoading: boolean;
  favorites: Nanny[];
  addToFavorites: (userId: string, nanny: Nanny) => Promise<void>;
  removeFromFavorites: (nannyId: string, userId: string) => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoriteProvider");
  }
  return context;
};

const FavoriteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Nanny[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const auth = getAuth();
  const userId: string | undefined = auth.currentUser?.uid;

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

  const fetchFavorites = async (userId: string) => {
    if (!userId) return;

    const db = getDatabase();
    const dbRef = ref(db, `users/${userId}/favorites`);
    setIsLoading(true);

    try {
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        setFavorites(Object.values(snapshot.val()) as Nanny[]); // Оновлюємо контекст
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
  const addToFavorites = async (userId: string, nanny: Nanny) => {
    const db = getDatabase();
    try {
      const nannyId = nanny.nannyId;
      if (!nannyId) throw new Error("Няня не має ID");

      await set(ref(db, `users/${userId}/favorites/${nannyId}`), nanny);
      setFavorites((prev) => [...prev, nanny]);
    } catch (error) {
      console.error("Помилка при додаванні няні до обраних:", error);
    }
  };

  const removeFromFavorites = async (nannyId: string, userId: string) => {
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
