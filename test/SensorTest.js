"use strict";
const assert = require("assert");
const Event = require("imergo-om-base").Event;
const InvalidStateError = require("imergo-om-base").InvalidStateError;
const model = require("..");
describe("imergo-generic-sensor-api::Sensor", () =>
{
    it("should init a sensor", () =>
    {
        let sensor = new model.Sensor();
        assert.equal(sensor instanceof model.Sensor, true);
    });
    it("should have an initial state 'idle'", () =>
    {
        let sensor = new model.Sensor();
        assert.equal(sensor.state, 'idle');
    });
    it("should have an initial frequency of 'null'", () =>
    {
        let sensor = new model.Sensor();
        assert.equal(sensor.frequency, null);
    });
    it("should allow setting the 'onerror' event handler", () =>
    {
        let sensor = new model.Sensor();
        let eventHandler = event => {};
        sensor.onerror = eventHandler;
        assert.equal(sensor.onerror, eventHandler);
    });
    it("should allow setting the 'onchange' event handler", () =>
    {
        let sensor = new model.Sensor();
        let eventHandler = event => {};
        sensor.onchange = eventHandler;
        assert.equal(sensor.onchange, eventHandler);
    });
    it("should allow setting the 'onstatechange' event handler", () =>
    {
        let sensor = new model.Sensor();
        let eventHandler = event => {};
        sensor.onstatechange = eventHandler;
        assert.equal(sensor.onstatechange, eventHandler);
    });
    it("should throw an error for invalid 'onerror' values", () =>
    {
        let sensor = new model.Sensor();
        assert.throws(() => {
                sensor.onerror = true;
            },
            TypeError);
    });
    it("should throw an error for invalid 'onchange' values", () =>
    {
        let sensor = new model.Sensor();
        assert.throws(() => {
                sensor.onchange = true;
            },
            TypeError);
    });
    it("should call the 'onerror' event handler", done =>
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
    it("should start", done =>
    {
        let sensor = new model.Sensor();
        sensor.start().then(done);
    });
    it("should start and stop", done =>
    {
        let sensor = new model.Sensor();
        sensor
        .start()
        .then(() => {
            sensor
            .stop()
            .then(done);
        });
    });
    it("should update the state when started", done =>
    {
        let sensor = new model.Sensor();
        sensor.start().then(() => {
            assert.equal(sensor.state, model.SensorState.ACTIVATED);
            done();
        });
    });
    it("should update the state when stopped", done =>
    {
        let sensor = new model.Sensor();
        assert.equal(sensor.state, model.SensorState.IDLE);
        sensor.start().then(() => {
            assert.equal(sensor.state, model.SensorState.ACTIVATED);
            sensor
            .stop()
            .then(() => {
                assert.equal(sensor.state, model.SensorState.IDLE);
                done();
            });
        });
    });

    it("should throw an error if the sensor is started when neither in 'idle' or 'errored' state", done =>
    {
        let sensor = new model.Sensor();
        sensor.start().then(() => {
            sensor.start()
                .then(() => {})
                .catch(error => done())
        })
    });
});
