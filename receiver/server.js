const express = require('express');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');

const app = express();
app.use(express.json());

// InfluxDB Config
const client = new InfluxDB({
  url: 'http://influxdb:8086',
  token: 'my-super-secret-token'
});
const writeApi = client.getWriteApi('myorg', 'sigfox', 'ms');

// Decode Sigfox 12-byte payload จาก Arduino code
function decodePayload(hexString) {
  const buf = Buffer.from(hexString, 'hex');

  // ตรง format ใน Send_Sensors() ของ Arduino
  const temp     = buf.readInt16LE(0) / 100;       // °C
  const pressure = buf.readUInt16LE(2) * 3;        // Pa
  const photo    = buf.readUInt16LE(4) / 1000;     // lux
  const accel_x  = buf.readInt16LE(6) / 250;       // g
  const accel_y  = buf.readInt16LE(8) / 250;       // g
  const accel_z  = buf.readInt16LE(10) / 250;      // g

  return { temp, pressure, photo, accel_x, accel_y, accel_z };
}

// Endpoint ที่ Sigfox Backend จะ POST มา
app.post('/sigfox', (req, res) => {
  console.log('Received:', req.body);

  const { device, data, time } = req.body;

  if (!data || data.length !== 24) { // 12 bytes = 24 hex chars
    return res.status(400).json({ error: 'Invalid payload length' });
  }

  const decoded = decodePayload(data);
  console.log('Decoded:', decoded);

  const point = new Point('sensor_data')
    .tag('device_id', device)
    .floatField('temperature', decoded.temp)
    .floatField('pressure', decoded.pressure)
    .floatField('photo', decoded.photo)
    .floatField('accel_x', decoded.accel_x)
    .floatField('accel_y', decoded.accel_y)
    .floatField('accel_z', decoded.accel_z)
    .timestamp(new Date(time * 1000));

  writeApi.writePoint(point);
  writeApi.flush()
    .then(() => res.json({ status: 'ok', decoded }))
    .catch(err => {
      console.error('InfluxDB write error:', err);
      res.status(500).json({ error: 'InfluxDB write failed' });
    });
});

app.listen(3001, () => console.log('Sigfox receiver running on port 3001'));