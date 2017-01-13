"use strict";

describe("imergo-generic-sensor-api::Sensor", () =>
{
    const assert = require("assert");
    const Event = require("imergo-om-base").Event;
    const InvalidStateError = require("imergo-om-base").InvalidStateError;
    const model = require("..");
    it("should init a sensor", () =>
    {
        const sensor = new model.Sensor();
        assert.strictEqual(sensor instanceof model.Sensor, true);
    });
    it("should have an initial state 'idle'", () =>
    {
        const sensor = new model.Sensor();
        assert.strictEqual(sensor.state, model.SensorState.IDLE);
    });
    it("should have an initial frequency of 'null'", () =>
    {
        const sensor = new model.Sensor();
        assert.strictEqual(sensor.frequency, null);
    });
    it("should allow setting the 'onerror' event handler", () =>
    {
        const sensor = new model.Sensor();
        const eventHandler = event => {};
        sensor.onerror = eventHandler;
        assert.strictEqual(sensor.onerror, eventHandler);
    });
    it("should allow setting the 'onchange' event handler", () =>
    {
        const sensor = new model.Sensor();
        const eventHandler = event => {};
        sensor.onchange = eventHandler;
        assert.strictEqual(sensor.onchange, eventHandler);
    });
    it("should allow setting the 'onstatechange' event handler", () =>
    {
        const sensor = new model.Sensor();
        const eventHandler = event => {};
        sensor.onstatechange = eventHandler;
        assert.strictEqual(sensor.onstatechange, eventHandler);
    });
    it("should throw an error for invalid 'onerror' values", () =>
    {
        const sensor = new model.Sensor();
        assert.throws(() => { sensor.onerror = true; }, TypeError);
    });
    it("should throw an error for invalid 'onchange' values", () =>
    {
        const sensor = new model.Sensor();
        assert.throws(() => { sensor.onchange = true; }, TypeError);
    });
    it("should update the state when started", done =>
    {
        const sensor = new model.Sensor();
        sensor.start().then(() =>
        {
            assert.strictEqual(sensor.state, model.SensorState.ACTIVATED);
            done();
        });
    });
    it("should update the state when stopped", done =>
    {
        const sensor = new model.Sensor();
        assert.strictEqual(sensor.state, model.SensorState.IDLE);
        sensor.start().then(() =>
        {
            assert.strictEqual(sensor.state, model.SensorState.ACTIVATED);
            sensor.stop().then(() =>
            {
                assert.strictEqual(sensor.state, model.SensorState.IDLE);
                done();
            });
        });
    });
    it("should throw an error if the sensor is started when neither in 'idle' or 'errored' state", done =>
    {
        const sensor = new model.Sensor();
        sensor.start().then(() =>
        {
            sensor.start().then(() => {})
                .catch(error =>
                {
                    assert(error instanceof Error);
                    assert(error instanceof InvalidStateError);
                    done();
                });
        })
    });
    it("should throw an error if the sensor is stopped when either in 'idle' or 'errored' state", done =>
    {
        const sensor = new model.Sensor();
        sensor.stop().then(() => {})
            .catch(error =>
            {
                assert(error instanceof Error);
                assert(error instanceof InvalidStateError);
                done();
            });
    });
    // TODO: These tests test nothing
    /*it("should call the 'onerror' event handler", done =>
    {
        let sensor = new model.Sensor();
        sensor.onerror = event => done();
        sensor.dispatchEvent(new model.SensorErrorEvent("error", {
            error: new Error()
        }));
    });
    it("should call the 'onchange' event handler", done =>
    {
        let sensor = new model.Sensor();
        let sensorReading = new model.SensorReading();
        let event = new model.SensorReadingEvent("change", {
            reading: sensorReading
        });
        sensor.onchange = event => done();
        sensor.dispatchEvent(event);
    });
    it("should call the 'onstatechange' event handler", done =>
    {
        let sensor = new model.Sensor();
        let event = new Event("statechange");
        sensor.onstatechange = event => done();
        sensor.dispatchEvent(event);
    });
    */
});
