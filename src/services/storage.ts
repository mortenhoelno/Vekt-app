import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "sunnslanking/app-state";

export async function loadState<T>(): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as T;
  } catch (error) {
    console.warn("Kunne ikke laste lagret data", error);
    return null;
  }
}

export async function saveState<T>(state: T) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("Kunne ikke lagre data", error);
  }
}

export async function clearState() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn("Kunne ikke nullstille data", error);
  }
}
