"""שולח מייל עדכון ליוסף - אחרי שהאתר חי."""
import smtplib, sys, io, os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

EMAIL_USER = '6742853@gmail.com'
EMAIL_PASS = 'wwto jsrj mbgx rcyt'

msg = MIMEMultipart('related')
msg['From'] = f'יוסף שניידר <{EMAIL_USER}>'
msg['To'] = EMAIL_USER
msg['Subject'] = 'עדכון: אתר הצימר במעלה עמוס עודכן · גרסה v4'

html = '''<!DOCTYPE html>
<html dir="rtl"><body style="font-family:Heebo,Arial;background:#fbf9f6;color:#1f1d1a;line-height:1.7;padding:30px;max-width:700px;margin:0 auto">
<div style="background:linear-gradient(135deg,#4f5a3e,#38432a);color:#fff;padding:30px;border-radius:12px;text-align:center;margin-bottom:25px">
  <div style="font-size:13px;letter-spacing:3px;color:#c79e6a;text-transform:uppercase;margin-bottom:10px">עדכון פרויקט</div>
  <h1 style="margin:0;font-family:'Frank Ruhl Libre',serif;font-size:28px">אתר הצימר עודכן</h1>
  <div style="opacity:.8;margin-top:8px">גרסה v4 · תקופת בין הזמנים תשפ״ו</div>
</div>

<h2 style="font-family:'Frank Ruhl Libre',serif;color:#38432a">מה עשיתי</h2>

<h3 style="color:#4f5a3e;margin-top:25px">1. שינוי קונספט</h3>
<ul>
  <li>הוסר כל אזכור של אוכל וארוחות</li>
  <li>מודגש שהדירה זמינה רק בבין הזמנים — ראש חודש אב עד א׳ אלול</li>
  <li>מודגש שאפשר גם ימי חול וגם שבתות</li>
  <li>הסעיף "טמפלייטים מפוארים" הוחלף בטקסט אנושי ופשוט</li>
</ul>

<h3 style="color:#4f5a3e;margin-top:25px">2. תמונות אמיתיות</h3>
<ul>
  <li>נחלצו 44 צילומים מהדרייב שלך</li>
  <li>סוננו ל-24 תמונות (נמחקו: מיחם תה, השתקפויות צלם, וכפילויות)</li>
  <li>קוטלגו לפי קטגוריות: סלון, חדרי שינה, חדרי ילדים, חצר, אמבטיה, פרטים</li>
  <li>עוצבו ל-1600px איכות 82% + thumbnails 480px</li>
</ul>

<h3 style="color:#4f5a3e;margin-top:25px">3. גלריה בולטת בתחילת האתר</h3>
<ul>
  <li>אזור "Featured" עם 5 תמונות גדולות מיד אחרי ה-Hero</li>
  <li>גריד מלא עם כל 24 התמונות וסינון לפי קטגוריה (כפתורי "chips")</li>
  <li>Lightbox עם ניווט במקלדת ו-tap</li>
  <li>תמונות גדולות נטענות עם hover ו-zoom</li>
</ul>

<h3 style="color:#4f5a3e;margin-top:25px">4. גופנים ועיצוב</h3>
<ul>
  <li>גופנים: <b>Frank Ruhl Libre</b> לכותרות + <b>Heebo</b> לטקסט</li>
  <li>פלטה: ירוק זית עמוק (#4f5a3e), צבעי חול (#c79e6a), לבן חם</li>
  <li>נווט sticky עם blur, hero אוטומטי מתחלף, WhatsApp צף</li>
</ul>

<h3 style="color:#4f5a3e;margin-top:25px">5. מבנה האתר</h3>
<ol>
  <li><b>Hero</b> — תמונה גדולה + כותרת + כפתורים</li>
  <li><b>גלריה</b> — featured + grid + סינון</li>
  <li><b>על הדירה</b> — טקסט אנושי + grid של 8 פיצ׳רים</li>
  <li><b>בין הזמנים</b> — תאריך התחלה/סיום + רשימת בדיקה</li>
  <li><b>האזור</b> — תיאור היישוב + מרחקים</li>
  <li><b>צרו קשר</b> — WhatsApp, טלפון, מייל</li>
</ol>

<div style="background:#f3ede4;padding:20px;border-radius:10px;margin:30px 0">
  <h3 style="margin-top:0;color:#38432a">לבדיקה</h3>
  <p style="margin:8px 0">
    <a href="https://maale-amos.github.io/zimmer-maale-amos/?v=4" style="color:#4f5a3e;font-weight:600">
      ← פתח את האתר החי
    </a>
  </p>
  <p style="margin:8px 0;font-size:14px;color:#8a827a">
    GitHub Pages — עלייה לאוויר תוך 1-2 דקות מהדחיפה
  </p>
</div>

<h3 style="color:#4f5a3e">מה לבדוק</h3>
<ol>
  <li>תמונות נטענות במהירות?</li>
  <li>הגלריה עובדת בנייד?</li>
  <li>סינון הקטגוריות (סלון/חצר/חדרי שינה) פועל?</li>
  <li>WhatsApp פותח עם הודעה מוכנה?</li>
  <li>הטקסט אנושי מספיק או צריך עדינה נוספת?</li>
</ol>

<p style="margin-top:30px;color:#8a827a;font-size:14px;border-top:1px solid #e6dfd4;padding-top:15px">
  בכבוד רב,<br>
  Claude
</p>
</body></html>'''

msg.attach(MIMEText(html, 'html', 'utf-8'))

# Attach hero screenshot
for shot in ['_shot_hero.png', '_shot_gallery.png', '_shot_about.png']:
    p = os.path.join(r'C:\projects\zimmer-maale-amos', shot)
    if os.path.exists(p):
        with open(p, 'rb') as f:
            img = MIMEImage(f.read())
            img.add_header('Content-Disposition', 'attachment', filename=shot)
            msg.attach(img)

with smtplib.SMTP_SSL('smtp.gmail.com', 465, timeout=30) as s:
    s.login(EMAIL_USER, EMAIL_PASS)
    s.send_message(msg)
print('Sent!')
