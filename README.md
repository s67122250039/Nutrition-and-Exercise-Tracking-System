# N&E Tracker (ระบบติดตามโภชนาการและการออกกำลังกาย)

React + Vite + Supabase (Auth/Database) และ Firebase Hosting

## วิธีติดตั้ง
1. `npm install`
2. คัดลอก `.env.example` เป็น `.env` แล้วใส่ค่า `VITE_SUPABASE_URL` และ `VITE_SUPABASE_ANON_KEY`
3. รันไฟล์ `supabase.sql` ใน Supabase SQL Editor
4. `npm run dev` แล้วเปิด http://localhost:5173/

## Deploy (Firebase Hosting)
`npm run build` แล้ว `firebase deploy` (ต้องใส่ค่าใน `.env` ก่อน build)
