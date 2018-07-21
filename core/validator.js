module.exports = {
    var ban_order = {
        '--': '—',
        'script': ''
    };

    var validateData = (data) => {
        
        // data may be different type!
        
        for (let _d in data) {
            for (let _b in ban_order) {
                data[_d].replace(_b, ban_order[_b]);
            });
        }
        return data
    }
};