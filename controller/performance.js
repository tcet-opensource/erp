import os from 'os';
import semestermodel from '#models/semester'
import dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.PORT

async function performance(req, res) {
    let start_time_db = new Date().getTime();
    let test_db = await semestermodel.read({})
        .then((res) => {
            let time = new Date().getTime() - start_time_db
            return time;
        })
    let start_time = new Date().getTime();
    fetch(`http://localhost:${PORT}/semester/list`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let time = new Date().getTime() - start_time
            res.json({
                response_time: time, cpu: os.cpus(), maxmem: os.totalmem(), freemem: os.freemem(), db_time : test_db
            });

        })

}

export default performance