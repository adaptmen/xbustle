var mysql = require('mysql');
var dbConfig = require('../config/config.json');

var dbContext = () => {
    
    let _db = {
        query: (sql, success, error) => {
            var db = mysql.createConnection(dbConfig.database);

            db.connect();
            db.query(sql, function (err, res) {
                err ? error(err) : success(res);
            });
            db.end();
        }
    };

    var sqlGenerator = {
        
        where: (params) => {
            let _search = [];

            for (let key in params) {
                _search.push(key + "='" + params[key]);
            }
            
            return " WHERE " + _search.join("' AND ") + "' ";
        },
        
        set: (params) => {
            let _search = [];

            for (let key in params) {
                _search.push(key + "='" + params[key]);
            }
            
            return " SET " + _search.join("' AND ") + "' ";
        },
        
        insert: (_query) => {
            let result_str = "INSERT INTO `" + _query.tableName + "`";

            let keys_str, values_str = '';

            for (let key in _query.params) {
                keys_str += "`" + key + "`,";
                values_str += "'" + _query.params[key] + "',";
            }

            result_str += "(" +
                keys_str.slice(0, keys_str.length - 1) +
                ")" +
                " VALUES (" +
                values_str.slice(0, values_str.length - 1) +
                ")";

            return result_str.replace('undefined', '');
        },

        get: (_query) => {
            return "SELECT * FROM " + _query.tableName + sqlGenerator.where(_query.where);
        },
        
        update: (_query) => {
            return "UPDATE " + _query.tableName + sqlGenerator.set(_query.set) + sqlGenerator.where(_query.where);
        }
    };

    let factory = function (_query, method) {
        let sql = method(_query);
        return new Promise((resolve, reject) => {
            console.log(sql);
            _db.query(sql, resolve, reject);
            _query = {};
        });
    };

    let _query = {};
    
    let db_obj = function (data) {
        return {
            _query: data,
            insert: insert,
            get: get,
            where: where,
            table: table,
            set: set
        }
    };

    var table = (tableName) => {
        _query.tableName = tableName;
        return new db_obj(_query);
    };
    
    var where = (params) => {
        _query.where = params;
        return new db_obj(_query);
    };
    
    var set = (params) => {
        _query.set = params;
        return new db_obj(_query);
    };
    
    var get = () => {
        return factory(_query, sqlGenerator.get);
    };
    
    var insert = () => {
        return factory(_query, sqlGenerator.insert);
    };
    
    var update = () => {
        return factory(_query, sqlGenerator.update);
    };
    

    return {
        table: table,
        where: where,
        get: get,
        insert: insert,
        update: update
    };

};

module.exports = dbContext;