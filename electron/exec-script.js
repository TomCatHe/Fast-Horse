const sql = require("mssql");
const dbConfig = require("../src/config/dbconfig.json");

// 检查dbConfig中的属性是否定义
if (
    !dbConfig.user ||
    !dbConfig.password ||
    !dbConfig.server ||
    !dbConfig.port ||
    !dbConfig.database
) {
    console.error("Database configuration is incomplete or missing");
    return;
}

const config = {
    user: dbConfig.user,
    password: dbConfig.password,
    server: dbConfig.server,
    port: dbConfig.port,
    database: dbConfig.database,
    options: {
        encrypt: dbConfig.options.encrypt,
        trustServerCertificate: dbConfig.options.trustServerCertificate,
    },
};

async function executeSqlScript(scriptPath) {
    let message = "";
    try {
        await sql.connect(config);
        const script = require("fs").readFileSync(scriptPath, "utf8");
        await sql.query(script);
        message = {
            status: "success",
            message: "SQL script executed successfully",
        };
    } catch (err) {
        message = {
          status: "error",
          message: "Error on line:"+err.lineNumber+",Error message:"+err.message,
        }
    } finally {
        sql.close();
    }
    return message;
}

module.exports = executeSqlScript
