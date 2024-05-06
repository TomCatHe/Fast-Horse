// tedio模块的Connection和Request类
const { Connection, Request } = require("tedious");
const dbConfig = require("../src/config/dbconfig.json");

// 配置连接参数
const config = {
  server: dbConfig.server,
  authentication: {
    type: "default",
    options: {
      userName: dbConfig.user,
      password: dbConfig.password,
    },
  },
  options: {
    database: dbConfig.database,
    encrypt: dbConfig.options.encrypt, // 如果是Azure SQL数据库，需要设置为true
  },
};

// 创建到数据库的连接
const connection = new Connection(config);

// 监听连接事件
connection.on("connect", (err) => {
  console.log("Connected");
  if (err) {
    console.error(err.message);
  } else {
    // 连接成功，执行查询
    executeStatement();
  }
});

connection.connect();

// 执行SQL查询
function executeStatement(scriptPath) {
  const script = require("fs").readFileSync(scriptPath, "utf8");
  // console.log(script);
  const request = new Request("select top 1 * from YY_CONFIG", (err, rowCount) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log();
      console.log(`${rowCount} rows returned222`);
    }
    connection.close();
  });
  
  // 监听行事件
  request.on("row", (columns) => {
    
    columns.forEach((column) => {
      console.log(column.value);
    });
  });

  connection.execSql(request);
}

module.exports = executeStatement;