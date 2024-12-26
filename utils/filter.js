import * as SQLite from 'expo-sqlite';

// Filter Menu Items by Category
export const filterMenuItemsByCategory = (items, selectedCategories) => {
  if (selectedCategories.length === 0) {
    return items;
  }
  return items.filter(item => selectedCategories.includes(item.category));
};

// Fetch Filtered Menu Items with Search Text and Selected Categories
export const fetchFilteredMenuItems = async (searchText, selectedCategories) => {
    try {
        const db = await SQLite.openDatabaseAsync('foodMenu.db');

        const query = `
            SELECT * FROM menu 
            WHERE name LIKE ? 
            ${selectedCategories.length > 0 ? `AND category IN (${selectedCategories.map(() => '?').join(', ')})` : ''}
        `;
        const params = [`%${searchText}%`, ...selectedCategories];
        const rows = await db.getAllAsync(query, params);

        return rows;
    } catch (error) {
        console.error("Error fetching filtered menu items:", error);
        throw error; // Re-throw for higher-level handling
    }
};

