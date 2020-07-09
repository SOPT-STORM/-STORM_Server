const pool = require('../modules/pool');

module.exports = {
    countInfo: async (project_idx) => {
        const values = project_idx;   //파라미터로 받은 데이터들을 그대로 배열로 만들어서 넘겨줌
        const query = `SELECT COUNT(*) FROM round WHERE project_idx = ${project_idx}`
        try {
            const result = await pool.queryParamArr(query, values);
            return result[0]["COUNT(*)"];
        } catch (err) {
            if (err.errno == 1062) {
                console.log('signup ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('signup ERROR : ', err);
            throw err;
        }
    },

    roundSetting: async (project_idx, round_purpose, round_time) => {
        
        const fields = 'round_number, round_purpose, round_time, project_idx';
        const questions = '?, ?, ?, ?'

        const query1 = `SELECT COUNT(*) FROM round WHERE project_idx = ${project_idx}`
        const query2 = `INSERT INTO round (${fields}) VALUES (${questions})`
        try {
            const round_count = await pool.queryParamArr(query1, project_idx);
            const round_number = round_count[0]["COUNT(*)"]+1;

            console.log(round_number);
            
            const value = [round_number, round_purpose, round_time, project_idx];
            const result = await pool.queryParamArr(query2, value);
            return result;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('signup ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('signup ERROR : ', err);
            throw err;
        }
    },

    roundInfo: async (project_idx) => {
        //여기까지.
        const query = `SELECT r.round_idx, r.round_name, r.round_purpose, r.round_time FROM round AS r JOIN project AS p on p.project_idx = r.project_idx;`

    }
}

