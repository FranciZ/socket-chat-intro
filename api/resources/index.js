

exports.init = (app)=>{

    require('./message/model');
    require('./message/router').init(app);

    require('./room/model');
    require('./room/router').init(app);

    require('./account/model');
    require('./account/router').init(app);

};