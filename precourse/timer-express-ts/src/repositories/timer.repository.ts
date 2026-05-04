import { pool } from "../db";

/** Как выглядит строка в таблице times. */
export type TimeRowDb = {
    id: number;
    saved_at: Date; // pg вернёт JS Date;
};

/** Пример: создание записи (остальные методы — аналогично, но реализуешь сам). */
// export async function saveCurrentTime(): Promise<TimeRowDb> {
//     const result = await pool.query<TimeRowDb>(
//         "INSERT INTO times (saved_at) VALUES (NOW()) RETURNING *"
//     );
//     return result.rows[0];
// }
//
// // TODO: реализуй и типизируй остальные:
//
// export async function getAllTimes(params: { from?: string; to?: string }): Promise<any> {
//
// }

// export async function deleteTimeById(id: number): ... { ... }

// export async function updateTimeById(id: number, newTimestampIso: string): ... { ... }

export async function getAllTimes({from, to}: { from: string | undefined, to: string | undefined }) {
    let query = 'SELECT * FROM times';
    const params = [];
    const conditions = [];

    // Добавляем условия только если параметры есть
    if (from && to) {
        conditions.push(`saved_at > $${params.length + 1} AND saved_at < $${params.length + 2}`);
        params.push(from, to);
    } else if (from) {
        conditions.push(`saved_at > $${params.length + 1}`);
        params.push(from);
    } else if (to) {
        conditions.push(`saved_at < $${params.length + 1}`);
        params.push(to);
    }

    // Добавляем WHERE если есть условия
    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    // Сортировка
    query += ' ORDER BY id DESC';
    console.log(`query: ${JSON.stringify(query)}`);
    console.log('params=', params);
    const result = await pool.query(query, params);
    return result.rows;
}

export async function saveCurrentTime() {
    const result = await pool.query(`INSERT INTO times (saved_at)
                                     VALUES (NOW()) RETURNING *`);
    return result.rows[0];
}

export async function deleteTimeById(id: string) {
    await pool.query(`DELETE
                      FROM times
                      WHERE id = $1`, [id]);
}

export async function updateTimeById(id: string, newTimestamp: string) {
    const result = await pool.query(
        'UPDATE times SET saved_at = $2 WHERE id = $1 RETURNING *',
        [id, newTimestamp]
    );
    return result.rows[0];
}