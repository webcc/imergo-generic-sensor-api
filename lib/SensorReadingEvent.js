"use strict";

const Event = require("imergo-om-base").Event;

/**
 *
 * @see https://www.w3.org/TR/generic-sensor/#sensorreadingevent
 */
module.exports = class SensorReadingEvent extends Event
{
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
