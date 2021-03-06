"use strict";

const ImergoClass = require("imergo-om-base").ImergoClass;

/**
 *
 * @see https://www.w3.org/TR/generic-sensor/#sensorreading
 */
module.exports = class SensorReading extends ImergoClass {
    constructor(config)
    {
        super(config);
    }

    initDefaults()
    {
        super.initDefaults();
        this._timestamp = Date.now();
    }

    get timestamp()
    {
        return this._timestamp;
    }
};
