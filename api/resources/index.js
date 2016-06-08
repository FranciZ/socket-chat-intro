
exports.init = (app, io)=>{

    require('./message/model');
    require('./message/router').init(app, io);

    require('./room/model');
    require('./room/router').init(app, io);

    require('./account/model');
    require('./account/router').init(app, io);

    require('./notification/model');
    require('./notification/router').init(app, io);

};