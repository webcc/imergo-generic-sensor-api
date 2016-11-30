"use strict";
const Event = require("imergo-om-base").Event;

module.exports = class SensorReadingEvent extends Event {
    constructor(type, config)
    {
        super(type, config);
    }

    initDefaults()
    {
        super.initDefaults();
        this._reading = null;
    }

    get reading()
    {
        return this._reading;
    }

    set reading(value)
    {
        this._reading = value;
    }
};
