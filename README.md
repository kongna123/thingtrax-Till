# thingtrax-Till

โปรเจกต์นี้ประกอบด้วยหลายส่วนสำหรับการพัฒนาและทดสอบระบบ ThingTrax / Sigfox และ Xkit sample

## โครงสร้างหลัก

- `.gitignore` - กำหนดไฟล์และโฟลเดอร์ที่ไม่ต้องการติดตามใน Git
- `docker-compose.yml` - ตั้งค่า container ในระบบ
- `dashboards/` - โฟลเดอร์สำหรับแดชบอร์ด
- `n8n-flow/` - ไฟล์สำหรับนำเข้า flow ของ n8n
- `nodered-flow/` - โฟลเดอร์และไฟล์ flow ของ Node-RED
- `provisioning/` - โฟลเดอร์สำรองสำหรับการ provision
- `receiver/` - แอปพลิเคชัน Node.js สำหรับรับข้อมูล
- `Xkit-Sample-master/` - ตัวอย่าง Xkit / Wisol และเอกสาร

## รายละเอียดโฟลเดอร์

### dashboards
- โฟลเดอร์ว่างหรือเก็บไฟล์แดชบอร์ดสำหรับการใช้งาน

### n8n-flow
- `Tilewatch.json` - flow ของ n8n

### nodered-flow
- `flows.json` - flow ของ Node-RED

### provisioning
- โฟลเดอร์สำรองสำหรับ provisioning (ไม่มีไฟล์แสดงในโฟลเดอร์นี้)

### receiver
- `package.json` - ข้อมูลแพ็กเกจ Node.js
- `package-lock.json` - ตัวล็อกเวอร์ชันแพ็กเกจ
- `node_modules/` - โฟลเดอร์ dependencies
- `server.js` - เซิร์ฟเวอร์ Express สำหรับรับข้อมูล

### Xkit-Sample-master
- `Xkit-Sample-master/` - โฟลเดอร์ซ้ำที่มีตัวอย่างและเอกสารเต็มรูปแบบ

#### Xkit-Sample-master/Xkit-Sample-master
- `DemoApp/DemoApp.ino` - ตัวอย่างโปรแกรม Arduino
- `Document/` - เอกสารและเครื่องมือต่าง ๆ
  - `Program/` - ชุดไดรเวอร์และเครื่องมือสำหรับการเชื่อมต่อ
  - `Wisol_ATCommands_and_Datasheets/` - ไฟล์คู่มือ AT command และ datasheet
  - `Xkit_Schematics/` - ชีตสถาปัตยกรรมและ pinout
- `libraries/` - ไลบรารี Arduino
  - `Isigfox/` - ไลบรารี Isigfox
  - `SimpleTimer/` - ไลบรารีจับเวลา
  - `Tsensors/` - ไลบรารีเซ็นเซอร์

## หมายเหตุ
- `receiver/` เป็น Node.js app ที่ใช้ `express` และ `@influxdata/influxdb-client`
- `Xkit-Sample-master/` มีเอกสารและตัวอย่างสำหรับ Wisol Xkit และการใช้งาน AT command
- `n8n-flow/` และ `nodered-flow/` เป็น flow config สำหรับระบบ automation ต่าง ๆ

