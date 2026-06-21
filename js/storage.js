// storage.js - 本地存储管理
const Storage = {
  // 班级数据缓存
  getClasses() {
    try { return JSON.parse(localStorage.getItem('ai_quiz_classes') || '{}'); }
    catch { return {}; }
  },
  setClasses(data) {
    localStorage.setItem('ai_quiz_classes', JSON.stringify(data));
  },

  // 当前选择的班级
  getLastClass() { return localStorage.getItem('ai_quiz_last_class') || ''; },
  setLastClass(c) { localStorage.setItem('ai_quiz_last_class', c); },

  // 当前选择的学生
  getLastStudent() { return localStorage.getItem('ai_quiz_last_student') || ''; },
  setLastStudent(s) { localStorage.setItem('ai_quiz_last_student', s); },

  // 知识点预设
  getKnowledgePresets() {
    try { return JSON.parse(localStorage.getItem('ai_quiz_kp') || '[]'); }
    catch { return []; }
  },
  addKnowledgePreset(k) {
    const list = this.getKnowledgePresets();
    if (!list.includes(k)) { list.unshift(k); if (list.length > 20) list.pop(); }
    localStorage.setItem('ai_quiz_kp', JSON.stringify(list));
  },

  // 教师密码
  getTeacherPassword() { return localStorage.getItem('ai_quiz_tp') || 'admin123'; },
  setTeacherPassword(p) { localStorage.setItem('ai_quiz_tp', p); },

  // ===== 离线做题记录存储 =====
  // 当 API 不可用时，记录存储在 localStorage
  getLocalRecords() {
    try {
      return JSON.parse(localStorage.getItem('ai_quiz_local_records') || '[]');
    } catch { return []; }
  },
  addLocalRecord(record) {
    const recs = this.getLocalRecords();
    recs.push(record);
    // 最多保留 500 条
    if (recs.length > 500) recs.splice(0, recs.length - 500);
    localStorage.setItem('ai_quiz_local_records', JSON.stringify(recs));
  },
  syncLocalToAPI() {
    // 合并本地记录和 API 记录，去重（按 studentName + time 作为键）
    const local = this.getLocalRecords();
    if (local.length === 0) return [];
    // 清除已同步的记录
    localStorage.removeItem('ai_quiz_local_records');
    return local;
  },
  clearAllRecords() {
    localStorage.removeItem('ai_quiz_local_records');
  }
};
