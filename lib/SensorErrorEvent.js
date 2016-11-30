"use strict";
const Event = require("imergo-om-base").Event;

module.exports = class SensorErrorEvent extends Event {
    constructor(type, config)
    {
        super(type, config);
    }

    initDefaults()
    {
        super.initDefaults();
        this._error = null;
    }

    get error()
    {
        return this._error;
    }

    set error(value)
    {
        this._error = value;
    }
};
