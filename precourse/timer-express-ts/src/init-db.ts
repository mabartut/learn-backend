import { pool } from "./db";

async function init() {
    try {
        await pool.query(`
      CREATE TABLE IF NOT EXISTS times (
        id SERIAL PRIMARY KEY,
        saved_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
        console.log("✅ Таблица times создана (TIMESTAMPTZ + NOW()).");
    } catch (e) {
        console.error("Ошибка init-db:", e);
    } finally {
        await pool.end();
    }
}
init();