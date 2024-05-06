// execMsSql.js

const { Connection, Request } = require("tedious");

const config = {
  server: "127.0.0.1",
  authentication: {
    type: "default",
    options: {
      userName: "sa",
      password: "Hc0912.*",
    },
  },
  options: {
    database: "THIS4",
    encrypt: false,
  },
};

const connection = new Connection(config);

function startConnection(script) {
  if (connection.state.name !== "LoggedIn") {
    connection.connect();
  }
  connection.on("connect", (err) => {
    if (err) {
      console.error(err.message);
    } else {
      executeStatement(script);
    }
  });
}

// 执行SQL语句的函数
function executeStatement(script) {
  const script2 = require("fs").readFileSync(script, "utf8");
  console.log(script);
  console.log("connectionState:" + connection.state.name);
  if (connection.state.name !== "LoggedIn") {
    console.error("请求只能在LoggedIn状态下进行，而非Connecting状态下");
    return;
  }

  const request = new Request(script2, (err, rowCount) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`${rowCount} 行返回`);
    }
  });

  request.on("row", (columns) => {
    columns.forEach((column) => {
      console.log(column.value);
    });
  });
  request.on("requestCompleted", function (rowCount, more) {
    connection.close();
  });
  console.log("8888ssss  :  " + script);
  connection.execSql(request);
  console.log("执行完成");
}

module.exports = startConnection;
