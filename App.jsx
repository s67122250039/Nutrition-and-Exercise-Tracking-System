import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';

// ==========================================
// 1. คลังข้อมูลอาหาร (100 รายการ)
// ==========================================
const FOOD_DATABASE = [
  { id: 1, name: 'ข้าวมันไก่', calories: 590, category: 'อาหารจานเดียว' },
  { id: 2, name: 'ข้าวขาหมู', calories: 690, category: 'อาหารจานเดียว' },
  { id: 3, name: 'ข้าวผัดกะเพราหมูสับไข่ดาว', calories: 630, category: 'อาหารจานเดียว' },
  { id: 4, name: 'ข้าวผัดกะเพราไก่', calories: 550, category: 'อาหารจานเดียว' },
  { id: 5, name: 'ข้าวผัดกะเพราเนื้อ', calories: 600, category: 'อาหารจานเดียว' },
  { id: 6, name: 'ข้าวผัดหมู', calories: 550, category: 'อาหารจานเดียว' },
  { id: 7, name: 'ข้าวผัดกุ้ง', calories: 530, category: 'อาหารจานเดียว' },
  { id: 8, name: 'ข้าวผัดปู', calories: 510, category: 'อาหารจานเดียว' },
  { id: 9, name: 'ข้าวไข่เจียว', calories: 440, category: 'อาหารจานเดียว' },
  { id: 10, name: 'ข้าวไข่ข้นกุ้ง', calories: 480, category: 'อาหารจานเดียว' },
  { id: 11, name: 'ข้าวหน้าเนื้อย่าง', calories: 580, category: 'อาหารจานเดียว' },
  { id: 12, name: 'ข้าวหน้าหมูทอดทงคัตสึ', calories: 720, category: 'อาหารจานเดียว' },
  { id: 13, name: 'ข้าวหน้าไก่เทอริยากิ', calories: 520, category: 'อาหารจานเดียว' },
  { id: 14, name: 'ข้าวแกงกระหรี่ญี่ปุ่น', calories: 650, category: 'อาหารจานเดียว' },
  { id: 15, name: 'ข้าวหมูกระเทียม', calories: 520, category: 'อาหารจานเดียว' },
  { id: 16, name: 'ข้าวหมูแดง', calories: 540, category: 'อาหารจานเดียว' },
  { id: 17, name: 'ข้าวหมูกรอบ', calories: 680, category: 'อาหารจานเดียว' },
  { id: 18, name: 'ข้าวหน้าเป็ด', calories: 510, category: 'อาหารจานเดียว' },
  { id: 19, name: 'ข้าวคลุกกะปิ', calories: 570, category: 'อาหารจานเดียว' },
  { id: 20, name: 'ข้าวต้มหมูสับ', calories: 250, category: 'ต้ม/แกง' },
  { id: 21, name: 'ข้าวต้มกุ้ง', calories: 220, category: 'ต้ม/แกง' },
  { id: 22, name: 'ข้าวต้มปลา', calories: 210, category: 'ต้ม/แกง' },
  { id: 23, name: 'โจ๊กหมูใส่ไข่', calories: 320, category: 'ต้ม/แกง' },
  { id: 24, name: 'ก๋วยเตี๋ยวเรือหมูน้ำตก', calories: 380, category: 'ก๋วยเตี๋ยว' },
  { id: 25, name: 'ก๋วยเตี๋ยวต้มยำกุ้ง', calories: 420, category: 'ก๋วยเตี๋ยว' },
  { id: 26, name: 'ก๋วยเตี๋ยวเย็นตาโฟ', calories: 350, category: 'ก๋วยเตี๋ยว' },

  { id: 27, name: 'ก๋วยจั๊บน้ำใส', calories: 400, category: 'ก๋วยเตี๋ยว' },
  { id: 28, name: 'ก๋วยจั๊บน้ำข้น', calories: 480, category: 'ก๋วยเตี๋ยว' },
  { id: 29, name: 'ผัดไทยกุ้งสด', calories: 580, category: 'เส้น/ผัด' },
  { id: 30, name: 'ผัดซีอิ๊วหมู', calories: 620, category: 'เส้น/ผัด' },
  { id: 31, name: 'ราดหน้าหมูหมัก', calories: 420, category: 'เส้น/ผัด' },
  { id: 32, name: 'ขนมจีนน้ำยาป่ า', calories: 280, category: 'เส้น/ผัด' },
  { id: 33, name: 'ขนมจีนน้ำยากะทิ', calories: 380, category: 'เส้น/ผัด' },
  { id: 34, name: 'ขนมจีนแกงเขียวหวานไก่', calories: 450, category: 'เส้น/ผัด' },
  { id: 35, name: 'สปาเกตตีคาโบนารา', calories: 650, category: 'เส้น/ผัด' },
  { id: 36, name: 'สปาเกตตีซอสมะเขือเทศหมูสับ', calories: 480, category: 'เส้น/ผัด' },
  { id: 37, name: 'สปาเกตตีขี้เมาทะเล', calories: 510, category: 'เส้น/ผัด' },
  { id: 38, name: 'ราเมงซุปกระดูกหมู (ทงคตสึ)', calories: 600, category: 'ก๋วยเตี๋ยว' },
  { id: 39, name: 'ยากิโซบะ', calories: 530, category: 'เส้น/ผัด' },
  { id: 40, name: 'ผัดมาม่าใส่ไข่หมูสับ', calories: 540, category: 'เส้น/ผัด' },
  { id: 41, name: 'ส้มตำไทย', calories: 120, category: 'ยำ/ส้มตำ' },
  { id: 42, name: 'ส้มตำปูปลาร้า', calories: 100, category: 'ยำ/ส้มตำ' },
  { id: 43, name: 'ลาบหมู', calories: 200, category: 'ยำ/ส้มตำ' },
  { id: 44, name: 'น้ำตกหมู', calories: 220, category: 'ยำ/ส้มตำ' },
  { id: 45, name: 'ยำวุ้นเส้นทะเล', calories: 280, category: 'ยำ/ส้มตำ' },
  { id: 46, name: 'ยำมาม่า', calories: 350, category: 'ยำ/ส้มตำ' },
  { id: 47, name: 'ไก่ย่าง (1 สะโพก)', calories: 250, category: 'ปิ้ง/ย่าง' },
  { id: 48, name: 'คอหมูย่าง', calories: 380, category: 'ปิ้ง/ย่าง' },
  { id: 49, name: 'ต้มยำกุ้งน้ำข้น', calories: 320, category: 'ต้ม/แกง' },
  { id: 50, name: 'ต้มยำกุ้งน้ำใส', calories: 180, category: 'ต้ม/แกง' },
  { id: 51, name: 'แกงจืดเต้าหู้หมูสับ', calories: 160, category: 'ต้ม/แกง' },
  { id: 52, name: 'แกงเขียวหวานไก่', calories: 350, category: 'ต้ม/แกง' },
  { id: 53, name: 'แกงเผ็ดเป็ดย่าง', calories: 410, category: 'ต้ม/แกง' },
  { id: 54, name: 'แกงส้มชะอมกุ้ง', calories: 270, category: 'ต้ม/แกง' },
  { id: 55, name: 'แกงเลียงกุ้งสด', calories: 150, category: 'ต้ม/แกง' },
  { id: 56, name: 'แกงมัสมั่นไก่', calories: 520, category: 'ต้ม/แกง' },
  { id: 57, name: 'พะแนงหมู', calories: 450, category: 'ต้ม/แกง' },
  { id: 58, name: 'ไข่พะโล้ (ไข่ 2 ฟอง + หมูสามชั้น)', calories: 480, category: 'ต้ม/แกง' },
  { id: 59, name: 'ไข่ตุ๋นหมูสับ', calories: 150, category: 'ต้ม/แกง' },
  { id: 60, name: 'ไข่ดาว', calories: 120, category: 'ของทอด' },
  { id: 61, name: 'ไข่ต้ม (1 ฟอง)', calories: 75, category: 'คลีน/สุขภาพ' },
  { id: 62, name: 'อกไก่นึ่ง/ต้ม (100g)', calories: 120, category: 'คลีน/สุขภาพ' },
  { id: 63, name: 'สเต๊กอกไก่ย่าง', calories: 280, category: 'คลีน/สุขภาพ' },
  { id: 64, name: 'สเต๊กหมูพริกไทยดำ', calories: 450, category: 'อาหารจานเดียว' },
  { id: 65, name: 'สเต๊กปลาแซลมอนย่าง', calories: 380, category: 'คลีน/สุขภาพ' },
  { id: 66, name: 'สลัดผักอกไก่ (น้ำใส)', calories: 220, category: 'คลีน/สุขภาพ' },
  { id: 67, name: 'สลัดทูน่า (น้ำครีม)', calories: 350, category: 'คลีน/สุขภาพ' },
  { id: 68, name: 'ซูชิแซลมอน (1 คำ)', calories: 60, category: 'อาหารจานเดียว' },
  { id: 69, name: 'เกี๊ยวซ่าทอด (5 ชิ้น)', calories: 280, category: 'ของทานเล่น' },
  { id: 70, name: 'นักเก็ตไก่ (5 ชิ้น)', calories: 240, category: 'ของทานเล่น' },
  { id: 71, name: 'เฟรนช์ฟรายส์ (ขนาดกลาง)', calories: 340, category: 'ของทานเล่น' },
  { id: 72, name: 'แฮมเบอร์เกอร์เนื้อ', calories: 480, category: 'อาหารจานเดียว' },
  { id: 73, name: 'พิซซ่าหน้าฮาวายเอี้ยน (1 ถาดเล็ก)', calories: 290, category: 'อาหารจานเดียว' },
  { id: 74, name: 'ซาลาเปาไส้หมูสับ', calories: 220, category: 'ของทานเล่น' },
  { id: 75, name: 'ขนมจีบหมู (5 ลูก)', calories: 180, category: 'ของทานเล่น' },
  { id: 76, name: 'ปาท่องโก๋ (1 คู่)', calories: 140, category: 'ของทานเล่น' },
  { id: 77, name: 'หมูปิ้ง (1 ไม้)', calories: 130, category: 'ปิ้ง/ย่าง' },
  { id: 78, name: 'ลูกชิ้นเนื้อปิ้ง (1 ไม้)', calories: 80, category: 'ปิ้ง/ย่าง' },
  { id: 79, name: 'ไก่ทอดหาดใหญ่ (1 น่อง)', calories: 280, category: 'ของทอด' },
  { id: 80, name: 'ทอดมันกุ้ง (3 ชิ้น)', calories: 270, category: 'ของทอด' },
  { id: 81, name: 'กาแฟดำ / อเมริกาโน่เย็น (ไม่หวาน)', calories: 15, category: 'เครื่องดื่ม' },
  { id: 82, name: 'ลาเต้เย็น (หวานปกติ)', calories: 180, category: 'เครื่องดื่ม' },
  { id: 83, name: 'ชาเขียวนมเย็น', calories: 230, category: 'เครื่องดื่ม' },
  { id: 84, name: 'ชาไทยนมเย็น', calories: 240, category: 'เครื่องดื่ม' },
  { id: 85, name: 'ชามะนาวเย็น', calories: 120, category: 'เครื่องดื่ม' },
  { id: 86, name: 'ชานมไข่มุก', calories: 360, category: 'เครื่องดื่ม' },
  { id: 87, name: 'น้ำส้มเค้นสด (1 แก้ว)', calories: 110, category: 'เครื่องดื่ม' },
  { id: 88, name: 'น้ำอัดลม (1 กระป๋อง)', calories: 140, category: 'เครื่องดื่ม' },
  { id: 89, name: 'น้ำอัดลม สูตรไม่มีน้ำตาล', calories: 0, category: 'เครื่องดื่ม' },
  { id: 90, name: 'นมสดจืด (1 กล่อง 225ml)', calories: 150, category: 'เครื่องดื่ม' },
  { id: 91, name: 'นมถั่วเหลือง (หวานน้อย)', calories: 130, category: 'เครื่องดื่ม' },
  { id: 92, name: 'โยเกิร์ตรสธรรมชาติ', calories: 90, category: 'ของหวาน' },
  { id: 93, name: 'ไอศกรีมวานิลลา (1 ถ้วย)', calories: 210, category: 'ของหวาน' },
  { id: 94, name: 'บิงซูสตรอว์เบอร์รี', calories: 450, category: 'ของหวาน' },
  { id: 95, name: 'ฮันนี่โทสต์', calories: 750, category: 'ของหวาน' },
  { id: 96, name: 'ข้าวเหนียวมะม่วง', calories: 450, category: 'ของหวาน' },
  { id: 97, name: 'เฉาก๊วยชากังราว', calories: 150, category: 'ของหวาน' },
  { id: 98, name: 'กล้วยบวชชี', calories: 230, category: 'ของหวาน' },
  { id: 99, name: 'เค้กช็อกโกแลต (1 ปอนด์/ชิ้น)', calories: 340, category: 'ของหวาน' },
  { id: 100, name: 'โดนัทเคลือบน้ำตาล', calories: 260, category: 'ของหวาน' },
];

// ==========================================
// 2. คลังข้อมูลการออกกำลังกาย (15 รายการพร้อม Emoji)
// ==========================================
const EXERCISE_DATABASE = [
  { id: 1, name: 'วิ่ง', icon: '🏃‍♂️', burnPerHr: 600, category: 'คาร์ดิโอ' },
  { id: 2, name: 'ปั่นจักรยาน', icon: '🚴‍♂️', burnPerHr: 450, category: 'คาร์ดิโอ' },
  { id: 3, name: 'ว่ายน้ำ', icon: '🏊‍♂️', burnPerHr: 500, category: 'คาร์ดิโอ' },
  { id: 4, name: 'เวทเทรนนิ่ง', icon: '🏋️‍♂️', burnPerHr: 300, category: 'สร้างกล้ามเนื้อ' },
  { id: 5, name: 'โยคะ', icon: '🧘‍♀️', burnPerHr: 200, category: 'ยืดเหยียด' },
  { id: 6, name: 'เดินเร็ว', icon: '🚶‍♂️', burnPerHr: 280, category: 'คาร์ดิโอเบาๆ' },
  { id: 7, name: 'แบดมินตัน', icon: '🏸', burnPerHr: 350, category: 'กีฬา' },
  { id: 8, name: 'ฟุตบอล', icon: '⚽', burnPerHr: 550, category: 'กีฬา' },
  { id: 9, name: 'บาสเกตบอล', icon: '🏀', burnPerHr: 500, category: 'กีฬา' },
  { id: 10, name: 'มวยไทย', icon: '🥊', burnPerHr: 700, category: 'คาร์ดิโอหนัก' },
  { id: 11, name: 'คาลิสเทนนิคส์', icon: '🤸‍♂️', burnPerHr: 400, category: 'สร้างกล้ามเนื้อ' },
  { id: 12, name: 'ปีนผา', icon: '🧗‍♂️', burnPerHr: 650, category: 'กีฬาเอ็กซ์ตรีม' },
  { id: 13, name: 'เทนนิส', icon: '🎾', burnPerHr: 450, category: 'กีฬา' },
  { id: 14, name: 'เต้นแอโรบิก', icon: '💃', burnPerHr: 380, category: 'คาร์ดิโอ' },
  { id: 15, name: 'กระโดดเชือก', icon: '🪢', burnPerHr: 700, category: 'คาร์ดิโอหนัก' },
];

export default function App() {
  // Auth State
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

   // App UI State
   const [activeTab, setActiveTab] = useState('dashboard');
   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
   const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

   // Data State
   const [mealLogs, setMealLogs] = useState([]);
   const [exerciseLogs, setExerciseLogs] = useState([]);
   const [mealSearch, setMealSearch] = useState('');
   const [exerciseSearch, setExerciseSearch] = useState('');
   const [exerciseMins, setExerciseMins] = useState(30);

   // ------------------------------------------
   // Initialize Auth & Real-time Session Check
   // ------------------------------------------
   useEffect(() => {
     supabase.auth.getSession().then(({ data: { session } }) => {
       setUser(session?.user ?? null);
       setAuthLoading(false);
     });

     const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
       setUser(session?.user ?? null);
       setAuthLoading(false);
     });

     return () => subscription.unsubscribe();
   }, []);

   // Fetch Logs when user or selectedDate changes
   useEffect(() => {
     if (user) {
       fetchUserLogs();
     }
   }, [user, selectedDate]);

   const showToast = (message, type = 'success') => {
      setToast({ show: true, message, type });
      setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3500);
   };

   // ------------------------------------------
   // Database Operations
   // ------------------------------------------
   const fetchUserLogs = async () => {
     try {
       const { data: meals, error: mealErr } = await supabase

          .from('meal_logs')
          .select('*')
          .eq('user_id', user.id)
          .eq('date', selectedDate);

        if (mealErr) throw mealErr;

        const { data: exercises, error: exErr } = await supabase
          .from('exercise_logs')
          .select('*')
          .eq('user_id', user.id)
          .eq('date', selectedDate);

        if (exErr) throw exErr;

       setMealLogs(meals || []);
       setExerciseLogs(exercises || []);
     } catch (err) {
       console.error('Fetch logs error:', err.message);
     }
   };

   const handleAuth = async (e) => {
     e.preventDefault();
     setAuthLoading(true);

     try {
       if (isSignUp) {
         const { error } = await supabase.auth.signUp({
           email,
           password,
           options: {
             data: { full_name: fullName }
           }
         });
         if (error) throw error;
         showToast('สร้างบัญชีสำเร็จ! เข้าสู่ระบบได้ทันที', 'success');
       } else {
         const { error } = await supabase.auth.signInWithPassword({
           email,
           password
         });
         if (error) throw error;
         showToast('เข้าสู่ระบบสำเร็จ!', 'success');
       }
     } catch (err) {
       showToast(err.message, 'error');
     } finally {
       setAuthLoading(false);
     }
   };

   const handleLogout = async () => {
      await supabase.auth.signOut();
      showToast('ออกจากระบบเรียบร้อย', 'success');
   };

   const logMeal = async (food) => {
     try {
       const { data, error } = await supabase.from('meal_logs').insert([
         {
           user_id: user.id,
           food_name: food.name,
           calories: food.calories,
           date: selectedDate
         }
       ]).select();

       if (error) throw error;
       setMealLogs([...mealLogs, ...data]);
       showToast(`บันทึก ${food.name} (${food.calories} kcal) เรียบร้อย!`, 'success');
     } catch (err) {
       showToast(`บันทึกไม่สำเร็จ: ${err.message}`, 'error');
     }
   };

   const deleteMeal = async (id) => {
     try {
       const { error } = await supabase.from('meal_logs').delete().eq('id', id);

       if (error) throw error;
       setMealLogs(mealLogs.filter(item => item.id !== id));
       showToast('ลบรายการอาหารสำเร็จ', 'success');
     } catch (err) {
       showToast(`ลบไม่สำเร็จ: ${err.message}`, 'error');
     }
   };

   const logExercise = async (ex) => {
     const burned = Math.round((ex.burnPerHr / 60) * exerciseMins);
     try {
       const { data, error } = await supabase.from('exercise_logs').insert([
         {
           user_id: user.id,
           exercise_name: `${ex.icon} ${ex.name}`,
           calories_burned: burned,
           duration_mins: exerciseMins,
           date: selectedDate
         }
       ]).select();

       if (error) throw error;
       setExerciseLogs([...exerciseLogs, ...data]);
       showToast(`บันทึกออกกำลังกาย ${ex.name} (${burned} kcal) เรียบร้อย!`, 'success');
     } catch (err) {
       showToast(`บันทึกไม่สำเร็จ: ${err.message}`, 'error');
     }
   };

   const deleteExercise = async (id) => {
      try {
        const { error } = await supabase.from('exercise_logs').delete().eq('id', id);
        if (error) throw error;
        setExerciseLogs(exerciseLogs.filter(item => item.id !== id));
        showToast('ลบรายการออกกำลังกายสำเร็จ', 'success');
      } catch (err) {
        showToast(`ลบไม่สำเร็จ: ${err.message}`, 'error');
      }
   };

   // Summary Calculations
   const totalCaloriesIn = mealLogs.reduce((sum, item) => sum + Number(item.calories || 0), 0);
   const totalCaloriesOut = exerciseLogs.reduce((sum, item) => sum + Number(item.calories_burned || 0), 0);
   const netCalories = totalCaloriesIn - totalCaloriesOut;

   // Filtered Lists
   const filteredFoods = FOOD_DATABASE.filter(f =>
      f.name.includes(mealSearch) || f.category.includes(mealSearch)
   );
   const filteredExercises = EXERCISE_DATABASE.filter(e =>
      e.name.includes(exerciseSearch) || e.category.includes(exerciseSearch)
   );

   if (authLoading) {
     return (
        <div style={styles.centerContainer}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d6a4f' }}>กำลังโหลดข้อมูล...</div>
        </div>
     );
   }

   // ------------------------------------------
   // AUTH SCREEN
   // ------------------------------------------
   if (!user) {
     return (
       <div style={styles.authWrapper}>
         {toast.show && (
            <div style={{ ...styles.toast, backgroundColor: toast.type === 'error' ? '#e63946' : '#2a9d8f' }}>
              {toast.message}
            </div>
         )}
         <div style={styles.authCard}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h1 style={{ color: '#2d6a4f', fontSize: '28px', margin: '0 0 8px 0' }}>🌿 N&E Tracker</h1>
              <p style={{ color: '#6c757d', fontSize: '14px', margin: 0 }}>
                {isSignUp ? 'สร้างบัญชีใหม่เพื่อเริ่มต้นใช้งาน' : 'เข้าสู่ระบบเพื่อติดตามสุขภาพของคุณ'}
              </p>
            </div>

             <form onSubmit={handleAuth}>
               {isSignUp && (
                  <div style={styles.formGroup}>
                    <label style={styles.label}>ชื่อ - นามสกุล (หรือชื่อเล่น)</label>
                    <input
                       type="text"
                       required
                       placeholder="ฟิล์ม"
                       value={fullName}
                       onChange={(e) => setFullName(e.target.value)}
                       style={styles.input}
                    />
                  </div>
               )}
               <div style={styles.formGroup}>
                  <label style={styles.label}>อีเมล</label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                  />
               </div>
               <div style={styles.formGroup}>
                  <label style={styles.label}>รหัสผ่าน</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                  />
               </div>
               <button type="submit" style={styles.primaryBtn}>
                  {isSignUp ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ'}
               </button>
             </form>

             <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  style={styles.linkBtn}
                >
                  {isSignUp ? 'มีบัญชีอยู่แล้ว? เข้าสู่ระบบ' : 'ยังไม่มีบัญชี? สมัครสมาชิก'}
                </button>
             </div>
           </div>
         </div>
       );
   }

   // ------------------------------------------
   // MAIN APP DASHBOARD
   // ------------------------------------------
   return (
     <div style={styles.appWrapper}>
       {/* Toast Notification */}
       {toast.show && (
          <div style={{ ...styles.toast, backgroundColor: toast.type === 'error' ? '#e63946' : '#2a9d8f' }}>
            {toast.message}
          </div>
       )}

         {/* Header Bar */}
         <header style={styles.header}>
           <div style={styles.headerContent}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
               <span style={{ fontSize: '24px' }}>🌿</span>
               <h1 style={{ fontSize: '20px', color: '#1b4332', margin: 0 }}>N&E Tracker</h1>
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
               <span style={{ fontSize: '14px', color: '#40916c' }}>
                 👤 {user.user_metadata?.full_name || user.email}
               </span>
               <button onClick={handleLogout} style={styles.logoutBtn}>

               ออกจากระบบ
             </button>
           </div>
         </div>
       </header>

       {/* Navigation Tabs */}
       <nav style={styles.navBar}>
         <button
           onClick={() => setActiveTab('dashboard')}
           style={activeTab === 'dashboard' ? styles.activeTab : styles.tab}
         >
           📊 แดชบอร์ด
         </button>
         <button
           onClick={() => setActiveTab('nutrition')}
           style={activeTab === 'nutrition' ? styles.activeTab : styles.tab}
         >
           🍲 คลังอาหาร ({FOOD_DATABASE.length})
         </button>
         <button
           onClick={() => setActiveTab('exercise')}
           style={activeTab === 'exercise' ? styles.activeTab : styles.tab}
         >
           🏃‍♂️ ออกกำลังกาย ({EXERCISE_DATABASE.length})
         </button>
         <button
           onClick={() => setActiveTab('history')}
           style={activeTab === 'history' ? styles.activeTab : styles.tab}
         >
           📅 ประวัติบันทึก
         </button>
       </nav>

       {/* Date Picker Bar */}
       <div style={styles.datePickerBar}>
         <label style={{ fontWeight: 'bold', color: '#2d6a4f', marginRight: '10px' }}>
           เลือกวันที่ดูข้อมูล:
         </label>
         <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={styles.dateInput}
         />
       </div>

       {/* Main Content Area */}
       <main style={styles.mainContainer}>
         {/* TAB 1: DASHBOARD */}
         {activeTab === 'dashboard' && (
           <div>
             <h2 style={styles.sectionTitle}>สรุปพลังงานประจำวัน ({selectedDate})</h2>
             <div style={styles.summaryGrid}>
               <div style={{ ...styles.summaryCard, borderLeft: '5px solid #e76f51' }}>
                 <span style={styles.cardTitle}>แคลอรีที่รับประทาน</span>
                 <span style={{ ...styles.cardValue, color: '#e76f51' }}>{totalCaloriesIn} kcal</span>
                 <span style={styles.cardSub}>จากอาหาร {mealLogs.length} รายการ</span>
               </div>
               <div style={{ ...styles.summaryCard, borderLeft: '5px solid #2a9d8f' }}>
                 <span style={styles.cardTitle}>แคลอรีที่เผาผลาญ</span>
                 <span style={{ ...styles.cardValue, color: '#2a9d8f' }}>{totalCaloriesOut} kcal</span>
                 <span style={styles.cardSub}>จากการออกกำลังกาย {exerciseLogs.length} กิจกรรม</span>
               </div>
               <div style={{ ...styles.summaryCard, borderLeft: '5px solid #1d3557' }}>
                 <span style={styles.cardTitle}>คงเหลือสุทธิ (Net)</span>
                 <span style={{ ...styles.cardValue, color: netCalories > 2000 ? '#e63946' : '#1d3557' }}>
                    {netCalories} kcal
                 </span>
                 <span style={styles.cardSub}>สมดุลพลังงานวันปัจจุบัน</span>
               </div>
             </div>

                {/* Daily Lists Overview */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '25px' }}>
                  <div style={styles.listCard}>
                    <h3 style={{ color: '#e76f51', marginTop: 0 }}>🍲 รายการอาหารวันนี้</h3>
                    {mealLogs.length === 0 ? (

                        <p style={{ color: '#8d99ae' }}>ยังไม่มีการบันทึกอาหารในวันนี้</p>
                     ) : (
                        <ul style={styles.logList}>
                          {mealLogs.map(item => (
                            <li key={item.id} style={styles.logItem}>
                              <span>{item.food_name}</span>
                              <div>
                                <strong style={{ color: '#e76f51', marginRight: '10px' }}>+{item.calories} kcal</strong>
                                <button onClick={() => deleteMeal(item.id)} style={styles.delBtn}>✕</button>
                              </div>
                            </li>
                          ))}
                        </ul>
                     )}
                   </div>

                   <div style={styles.listCard}>
                     <h3 style={{ color: '#2a9d8f', marginTop: 0 }}>🏃‍♂️ ออกกำลังกายวันนี้</h3>
                     {exerciseLogs.length === 0 ? (
                        <p style={{ color: '#8d99ae' }}>ยังไม่มีการบันทึกการออกกำลังกายในวันนี้</p>
                     ) : (
                        <ul style={styles.logList}>
                          {exerciseLogs.map(item => (
                            <li key={item.id} style={styles.logItem}>
                              <span>{item.exercise_name} ({item.duration_mins} นาที)</span>
                              <div>
                                <strong style={{ color: '#2a9d8f', marginRight: '10px' }}>-{item.calories_burned} kcal</strong>
                                <button onClick={() => deleteExercise(item.id)} style={styles.delBtn}>✕</button>
                              </div>
                            </li>
                          ))}
                        </ul>
                     )}
                   </div>
                 </div>
               </div>
          )}

          {/* TAB 2: NUTRITION LIBRARY (100 Items) */}
          {activeTab === 'nutrition' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-[#1b4332]', marginBottom: '20px' }}>
                <h2 style={styles.sectionTitle}>คลังอาหารและเมนูโภชนาการ (100 รายการ)</h2>
                <input
                  type="text"
                  placeholder="🔍 ค้นชื่อเมนู หรือหมวดหมู่..."
                  value={mealSearch}
                  onChange={(e) => setMealSearch(e.target.value)}
                  style={styles.searchInput}
                />
              </div>

                 <div style={styles.grid4}>
                   {filteredFoods.map(food => (
                     <div key={food.id} style={styles.foodCard}>
                        <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#1d3557' }}>{food.name}</div>
                        <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '8px' }}>หมวดหมู่: {food.category}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 'bold', color: '#e76f51' }}>{food.calories} kcal</span>
                          <button onClick={() => logMeal(food)} style={styles.addMealBtn}>
                            + บันทึก
                          </button>
                        </div>
                     </div>
                   ))}
                 </div>
               </div>
          )}

          {/* TAB 3: EXERCISE LIBRARY (15 Items with Icons) */}
          {activeTab === 'exercise' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={styles.sectionTitle}>คลังกิจกรรมออกกำลังกาย (15 รายการ)</h2>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <label style={{ fontSize: '14px', fontWeight: 'bold' }}>ระยะเวลา:</label>
                  <select
                    value={exerciseMins}

                         onChange={(e) => setExerciseMins(Number(e.target.value))}
                         style={styles.selectInput}
                     >
                        <option value={15}>15 นาที</option>
                        <option value={30}>30 นาที</option>
                        <option value={45}>45 นาที</option>
                        <option value={60}>60 นาที (1 ชม.)</option>
                        <option value={90}>90 นาที</option>
                     </select>
                     <input
                        type="text"
                        placeholder="🔍 ค้นหากิจกรรม..."
                        value={exerciseSearch}
                        onChange={(e) => setExerciseSearch(e.target.value)}
                        style={styles.searchInput}
                     />
                   </div>
                 </div>

                 <div style={styles.grid3}>
                   {filteredExercises.map(ex => {
                     const calculatedBurn = Math.round((ex.burnPerHr / 60) * exerciseMins);
                     return (
                        <div key={ex.id} style={styles.exerciseCard}>
                          <div style={{ fontSize: '40px', marginBottom: '10px' }}>{ex.icon}</div>
                          <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{ex.name}</div>
                          <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '10px' }}>{ex.category}</div>
                          <div style={{ fontSize: '14px', color: '#2a9d8f', fontWeight: 'bold', marginBottom: '15px' }}>
                            เผาผลาญประมาณ {calculatedBurn} kcal / {exerciseMins} นาที
                          </div>
                          <button onClick={() => logExercise(ex)} style={styles.addExBtn}>
                            + บันทึกกิจกรรมนี้
                          </button>
                        </div>
                     );
                   })}
                 </div>
               </div>
          )}

          {/* TAB 4: HISTORY */}
          {activeTab === 'history' && (
            <div>
              <h2 style={styles.sectionTitle}>ประวัติการบันทึกทั้งหมดประจำวันที่ {selectedDate}</h2>
              <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0.04)' }}>
                <h3>รายการอาหารที่บันทึกไว้</h3>
                {mealLogs.length === 0 ? (
                  <p style={{ color: '#8d99ae' }}>ไม่มีประวัติการทานอาหารในวันที่เลือก</p>
                ) : (
                  <table style={styles.table}>
                    <thead>
                      <tr style={{ background: '#f8f9fa' }}>
                        <th style={styles.th}>เวลา/วันที่</th>
                        <th style={styles.th}>ชื่อเมนู</th>
                        <th style={styles.th}>แคลอรี</th>
                        <th style={styles.th}>การจัดการ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mealLogs.map(m => (
                        <tr key={m.id}>
                           <td style={styles.td}>{m.date}</td>
                           <td style={styles.td}>{m.food_name}</td>
                           <td style={{ ...styles.td, color: '#e76f51', fontWeight: 'bold' }}>+{m.calories} kcal</td>
                           <td style={styles.td}>
                             <button onClick={() => deleteMeal(m.id)} style={styles.delBtn}>ลบ</button>
                           </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                   <h3 style={{ marginTop: '30px' }}>รายการออกกำลังกายที่บันทึกไว้</h3>
                   {exerciseLogs.length === 0 ? (
                     <p style={{ color: '#8d99ae' }}>ไม่มีประวัติการออกกำลังกายในวันที่เลือก</p>
                   ) : (
                     <table style={styles.table}>

                     <thead>
                       <tr style={{ background: '#f8f9fa' }}>
                         <th style={styles.th}>เวลา/วันที่</th>
                         <th style={styles.th}>กิจกรรม</th>
                         <th style={styles.th}>ระยะเวลา</th>
                         <th style={styles.th}>เผาผลาญ</th>
                         <th style={styles.th}>การจัดการ</th>
                       </tr>
                     </thead>
                     <tbody>
                       {exerciseLogs.map(e => (
                         <tr key={e.id}>
                           <td style={styles.td}>{e.date}</td>
                           <td style={styles.td}>{e.exercise_name}</td>
                           <td style={styles.td}>{e.duration_mins} นาที</td>
                           <td style={{ ...styles.td, color: '#2a9d8f', fontWeight: 'bold' }}>-{e.calories_burned} kcal</td>
                           <td style={styles.td}>
                              <button onClick={() => deleteExercise(e.id)} style={styles.delBtn}>ลบ</button>
                           </td>
                         </tr>
                       ))}
                     </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    );
}

// ==========================================
// Inline CSS Styles
// ==========================================
const styles = {
  centerContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f8f9fa' },
  authWrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f8f9fa' },
  authCard: { background: '#ffffff', padding: '35px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.08)', width: '100%', maxWidth: '400px' },
  formGroup: { marginBottom: '16px' },
  label: { display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#495057', marginBottom: '6px' },
  input: { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ced4da', fontSize: '14px', boxSizing: 'border-box' },
  primaryBtn: { width: '100%', padding: '12px', backgroundColor: '#2d6a4f', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' },
  linkBtn: { background: 'none', border: 'none', color: '#40916c', cursor: 'pointer', fontSize: '14px', textDecoration: 'underline' },
  appWrapper: { minHeight: '100vh', background: '#f8f9fa', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' },
  header: { background: '#ffffff', borderBottom: '1px solid #e9ecef', padding: '15px 30px' },
  headerContent: { maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logoutBtn: { backgroundColor: '#e63946', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' },
  navBar: { background: '#2d6a4f', padding: '0 30px', display: 'flex', gap: '5px', maxWidth: '1200px', margin: '0 auto' },
  tab: { background: 'transparent', border: 'none', color: '#d8f3dc', padding: '15px 20px', cursor: 'pointer', fontSize: '15px' },
  activeTab: { background: '#1b4332', border: 'none', color: '#ffffff', padding: '15px 20px', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold' },
  datePickerBar: { maxWidth: '1200px', margin: '20px auto 0 auto', padding: '0 30px', display: 'flex', alignItems: 'center' },
  dateInput: { padding: '8px 12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '14px' },
  mainContainer: { maxWidth: '1200px', margin: '0 auto', padding: '20px 30px' },
  sectionTitle: { color: '#1b4332', fontSize: '22px', margin: '0 0 15px 0' },
  summaryGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' },
  summaryCard: { background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', textAlign: 'center' },
  cardTitle: { fontSize: '14px', color: '#6c757d', fontWeight: 'bold' },
  cardValue: { fontSize: '28px', fontWeight: 'bold', margin: '10px 0 5px 0' },
  cardSub: { fontSize: '12px', color: '#adb5bd' },
  listCard: { background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
  logList: { listStyle: 'none', padding: 0, margin: 0 },
  logItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #e9ecef' },
  delBtn: { background: '#ff85a1', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },
  grid4: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '15px' },
  grid3: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
  foodCard: { background: '#fff', padding: '15px', borderRadius: '10px', border: '1px solid #e9ecef', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  exerciseCard: { background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e9ecef', textAlign: 'center' },
  addMealBtn: { backgroundColor: '#e76f51', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' },
  addExBtn: { width: '100%', backgroundColor: '#2a9d8f', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  searchInput: { padding: '10px 15px', borderRadius: '8px', border: '1px solid #ced4da', width: '250px', fontSize: '14px' },
  selectInput: { padding: '9px', borderRadius: '8px', border: '1px solid #ced4da', fontSize: '14px' },
  toast: { position: 'fixed', top: '20px', right: '20px', color: '#fff', padding: '12px 24px', borderRadius: '8px', zIndex: 1000, fontWeight: 'bold', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
  th: { textAlign: 'left', padding: '10px', borderBottom: '2px solid #dee2e6', fontSize: '14px', color: '#495057' },
  td: { padding: '10px', borderBottom: '1px solid #e9ecef', fontSize: '14px' },
};
