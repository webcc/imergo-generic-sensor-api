"use strict";

const Event = require("imergo-om-base").Event;
const EventTarget = require("imergo-om-base").EventTarget;
const InvalidStateError = require("imergo-om-base").InvalidStateError;
const SensorReadingEvent = require('./SensorReadingEvent');
const SensorState = require('./SensorState');

/**
 *
 * @see https://www.w3.org/TR/generic-sensor/#sensor
 */
module.exports = class Sensor extends EventTarget {

    /**
     *
     * @param config    Object of type https://www.w3.org/TR/generic-sensor/#dictdef-sensoroptions.
     */
    constructor(config)
    {
        super(config);
    }

    initDefaults()
    {
        super.initDefaults();
        this._frequency = null;
        this._state = SensorState.IDLE;
        this._reading = null;
        this._onerror = event => {};
        this._onchange = event => {};
        this._onstatechange = event => {};
        this.addEventListener("error", this._onerror);
        this.addEventListener("change", this._onchange);
        this.addEventListener("statechange", this._onstatechange);
    }

    get frequency()
    {
        return this._frequency;
    }

    set frequency(value)
    {
        this._frequency = value;
    }

    get state()
    {
        return this._state;
    }

    set state(value)
    {
        this._state = value;
        let event = new Event("statechange");
        this.dispatchEvent(event);
    }

    get reading()
    {
        return this._reading;
    }

    set reading(value)
    {
        this._reading = value;
        if (this.state === SensorState.ACTIVATED) {
            this.dispatchEvent(new SensorReadingEvent("change", {
                reading: this.reading
            }));
        }
    }

    get onerror()
    {
        return this._onerror;
    }

    set onerror(fun)
    {
        if(typeof fun !== "function")
        {
            throw new TypeError(`${fun} is not an EventHandler function.`)
        }
        this.removeEventListener("error", this._onerror);
        this._onerror = fun;
        this.addEventListener("error", this._onerror);
    }

    get onchange()
    {
        return this._onchange;
    }

    set onchange(fun)
    {
        if(typeof fun !== "function")
        {
            throw new TypeError(`${fun} is not an EventHandler function.`)
        }
        this.removeEventListener("change", this._onchange);
        this._onchange = fun;
        this.addEventListener("change", this._onchange);
    }

    get onstatechange()
    {
        return this._onstatechange;
    }

    set onstatechange(fun)
    {
        if(typeof fun !== "function")
        {
            throw new TypeError(`${fun} is not an EventHandler function.`)
        }
        this.removeEventListener("statechange", this._onstatechange);
        this._onstatechange = fun;
        this.addEventListener("statechange", this._onstatechange);
    }

    start()
    {
        return new Promise((resolve, reject) =>
        {
            if(this.state === SensorState.ACTIVATED
                || this.state === SensorState.ERRORED) {
                reject(new InvalidStateError())
            } else {
                this.state = SensorState.ACTIVATED;
                resolve();
            }
        });
    }

    stop()
    {
        return new Promise((resolve, reject) =>
        {

            if(this.state === SensorState.IDLE
                || this.state === SensorState.ERRORED) {
                reject(new InvalidStateError())
            } else {
                this.state = SensorState.IDLE;
                resolve();
            }
        });
    }
};
