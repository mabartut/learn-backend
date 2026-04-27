import {pool} from "../db.js";

// export async function getAllTimes(from,to) {
//     const result = await pool.query(`SELECT *
//                                      FROM times
//                                      WHERE saved_at > $1 AND saved_at < $2
//                                      ORDER BY id DESC`, [from, to]);
//     return result.rows;
// }

export async function getAllTimes(from, to) {
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
    const result = await pool.query(`INSERT INTO times (saved_at) VALUES (NOW()) RETURNING *`);
    return result.rows[0];
}

export async function deleteTimeById(id) {
    await pool.query(`DELETE FROM times WHERE id = $1`, [id]);
}

export async function updateTimeById(id, newTimestamp) {
    const result = await pool.query(
        'UPDATE times SET saved_at = $2 WHERE id = $1 RETURNING *',
        [id, newTimestamp]
    );
    return result.rows[0];
}