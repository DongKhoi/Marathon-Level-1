import pool from "../config/database";
const getAllUser = async () => {
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    return rows;
}
const detailUser = async (username) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `users` where username = ? ', [username]);
    return rows[0];
}

const updateUser = async (fullname, address, sex, email, username ) => {
    await pool.execute('update users set fullname=?, password=?, address=?, sex=?, email=? where username=?',[fullname, address, sex, email, username])
}
export default { getAllUser, detailUser, updateUser };