// عند تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', () => {
  // استخراج اسم الدرس الحالي من مسار الرابط
  const currentLesson = window.location.pathname.split('/').pop();

  // حفظ اسم الدرس الحالي كآخر درس تم زيارته
  localStorage.setItem('lastLesson', currentLesson);

  // تحديث سجل الدروس التي زارها المستخدم
  let visitedLessons = JSON.parse(localStorage.getItem('visitedLessons') || '[]');
  if (!visitedLessons.includes(currentLesson)) {
    visitedLessons.push(currentLesson);
    localStorage.setItem('visitedLessons', JSON.stringify(visitedLessons));
  }

  // إذا كان المستخدم في الصفحة الرئيسية (index.html)
  if (currentLesson === 'index.html') {
    const last = localStorage.getItem('lastLesson');
    if (last && last !== 'index.html') {
      const resume = confirm('هل تريد استكمال آخر درس: ' + last + '؟');
      if (resume) {
        window.location.href = last;
      }
    }
    // عرض قائمة الدروس التي زارها المستخدم
    
  }
});

// دالة لعرض قائمة الدروس التي زارها المستخدم
function showVisitedLessons() {
  const lessons = JSON.parse(localStorage.getItem('visitedLessons') || '[]');
  if (lessons.length > 0) {
    const container = document.createElement('div');
    container.style.margin = '20px 0';
    container.style.padding = '10px';
    container.style.border = '1px solid #ccc';
    container.style.background = '#f9f9f9';

    const title = document.createElement('h4');
    title.textContent = 'الدروس التي زرتها:';
    container.appendChild(title);

    const list = document.createElement('ul');
    lessons.forEach(lesson => {
      if (lesson !== 'index.html') {
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = lesson;
        link.textContent = lesson;
        item.appendChild(link);
        list.appendChild(item);
      }
    });
    container.appendChild(list);
    document.body.prepend(container);
  }
}

// إنشاء حاوية للأزرار
const controlsContainer = document.createElement('div');
controlsContainer.style.position = 'fixed';
controlsContainer.style.bottom = '20px';
controlsContainer.style.left = '20px';
controlsContainer.style.background = '#fff';
controlsContainer.style.border = '1px solid #ccc';
controlsContainer.style.padding = '10px';
controlsContainer.style.borderRadius = '8px';
controlsContainer.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
controlsContainer.style.zIndex = '1000';

// زر العودة للدرس السابق
const backButton = document.createElement('button');
backButton.textContent = 'العودة إلى الدرس السابق';
backButton.style.margin = '0 5px';
backButton.onclick = () => {
  const last = localStorage.getItem('lastLesson');
  if (last && last !== window.location.pathname.split('/').pop()) {
    window.location.href = last;
  } else {
    alert('لا يوجد درس سابق محفوظ أو أنت بالفعل في آخر درس.');
  }
};
controlsContainer.appendChild(backButton);

// زر حفظ التقدم
const saveButton = document.createElement('button');
saveButton.textContent = 'حفظ التقدم';
saveButton.style.margin = '0 5px';
saveButton.onclick = () => {
  const currentLesson = window.location.pathname.split('/').pop();
  localStorage.setItem('lastLesson', currentLesson);
  alert('تم حفظ التقدم!');
};
controlsContainer.appendChild(saveButton);

// زر لمسح التقدم (اختياري)
const clearButton = document.createElement('button');
clearButton.textContent = 'مسح التقدم';
clearButton.style.margin = '0 5px';
clearButton.onclick = () => {
  if (confirm('هل أنت متأكد من مسح جميع بيانات التقدم؟')) {
    localStorage.removeItem('lastLesson');
    localStorage.removeItem('visitedLessons');
    alert('تم مسح التقدم!');
    window.location.reload();
  }
};
controlsContainer.appendChild(clearButton);

// إضافة الحاوية للصفحة
document.body.appendChild(controlsContainer);
