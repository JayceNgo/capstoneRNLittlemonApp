import * as SQLite from 'expo-sqlite';

export const initialiseDB = async () => {
    try {
        const db = await SQLite.openDatabaseAsync('foodMenu.db');
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS menu (
                id INTEGER PRIMARY KEY NOT NULL,
                name TEXT NOT NULL,
                description TEXT NOT NULL,
                price REAL NOT NULL,
                image TEXT,
                category TEXT NOT NULL
            );
        `);
        console.log("Database initialized successfully.");
    } catch (error) {
        console.error("Error initializing database:", error);
    }
};

export const loadData = async (callback) => {
    try {
        const db = await SQLite.openDatabaseAsync('foodMenu.db');
        const rows = await db.getAllAsync('SELECT * FROM menu');
        callback(rows || []);
    } catch (error) {
        console.error("Error loading data:", error);
        callback([]);
    }
};


export const storeDataInDB = async (menu) => {
    console.log("Storing data in database...");
    try{
        const db = await SQLite.openDatabaseAsync('foodMenu.db');
        
        const insertPromises = menu.map(item =>
            db.runAsync(
              'INSERT INTO menu (name, description, price, image, category) VALUES (?, ?, ?, ?, ?);',
              [item.name, item.description, item.price, item.image, item.category]
            )
          );
          await Promise.all(insertPromises);
          console.log("Data successfully stored in the database.");
        
    } catch(error) {
    console.log("Error storing data in the database:", error);
    };
}