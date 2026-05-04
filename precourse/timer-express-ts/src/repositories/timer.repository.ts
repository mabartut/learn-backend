import {pool} from "../db";

/** Как выглядит строка в таблице times. */
export type TimeRowDb = {
    id: number;
    saved_at: Date;
};

/** Пример: создание записи (остальные методы — аналогично, но реализуешь сам). */
export async function saveCurrentTime(): Promise<TimeRowDb> {
    const result = await pool.query<TimeRowDb>(
        "INSERT INTO times (saved_at) VALUES (NOW()) RETURNING *"
    );
    return result.rows[0];
}

export async function getAllTimes(args: { from?: string; to?: string }): Promise<Array<TimeRowDb>> {
    let query = 'SELECT * FROM times';
    const params = [];
    const conditions = [];
    const {from, to} = args;

    if (from && to) {
        conditions.push(`saved_at > $1 AND saved_at < $2`);
        params.push(from, to);
    } else if (from) {
        conditions.push(`saved_at > $1`);
        params.push(from);
    } else if (to) {
        conditions.push(`saved_at < $1`);
        params.push(to);
    }

    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY id DESC';
    const result = await pool.query<TimeRowDb>(query, params);
    return result.rows;
}

export async function deleteTimeById(id: number): Promise<TimeRowDb> {
    const result = await pool.query<TimeRowDb>(
        `DELETE
         FROM times
         WHERE id = $1
         RETURNING *`, [id]);
    return result.rows[0];
}

export async function updateTimeById(id: number, newTimestampIso: string): Promise<TimeRowDb> {
    const result = await pool.query<TimeRowDb>(
        'UPDATE times SET saved_at = $2 WHERE id = $1 RETURNING *',
        [id, newTimestampIso]
    );
    return result.rows[0];
}