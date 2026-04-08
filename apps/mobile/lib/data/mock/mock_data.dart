import '../models/entities.dart';

const partners = [
  PartnerOrg(id: 'p1', name: 'جمعية الرحمة بنغازي', city: 'بنغازي'),
  PartnerOrg(id: 'p2', name: 'مؤسسة عطاء طرابلس', city: 'طرابلس'),
  PartnerOrg(id: 'p3', name: 'جمعية يد الخير مصراتة', city: 'مصراتة'),
];

const casesData = [
  CharityCase(
    id: 'c1',
    title: 'علاج طفل مصاب بمرض قلبي',
    summary: 'حالة عاجلة لطفل يحتاج عملية قسطرة خلال أسبوعين.',
    city: 'طرابلس - عين زارة',
    category: 'طبي',
    partnerId: 'p2',
    target: 42000,
    raised: 31000,
    isUrgent: true,
  ),
  CharityCase(
    id: 'c2',
    title: 'ترميم منزل أسرة نازحة',
    summary: 'الأسرة تقيم في منزل متضرر وتحتاج ترميم عاجل قبل الصيف.',
    city: 'درنة',
    category: 'سكن',
    partnerId: 'p1',
    target: 28000,
    raised: 14000,
    isUrgent: true,
  ),
  CharityCase(
    id: 'c3',
    title: 'دعم طالبات جامعة بالأدوات الدراسية',
    summary: 'توفير رسوم ومستلزمات دراسية لـ 25 طالبة من الأسر محدودة الدخل.',
    city: 'سبها',
    category: 'تعليم',
    partnerId: 'p3',
    target: 18000,
    raised: 9000,
  ),
];

const campaignsData = [
  Campaign(id: 'm1', title: 'حملة إفطار صائم ليبيا', type: 'رمضان', target: 150000, raised: 99000),
  Campaign(id: 'm2', title: 'إغاثة عاجلة للأسر المتضررة', type: 'طوارئ', target: 220000, raised: 133000),
  Campaign(id: 'm3', title: 'حملة العلاج الكلوي', type: 'طبي', target: 90000, raised: 47000),
];

const sponsorshipsData = [
  SponsorshipType(id: 's1', title: 'كفالة أسرة', monthlyAmount: 450, description: 'دعم غذائي ومعيشي شهري لأسرة محتاجة.'),
  SponsorshipType(id: 's2', title: 'كفالة يتيم', monthlyAmount: 300, description: 'رعاية تعليمية وصحية متواصلة لليتيم.'),
  SponsorshipType(id: 's3', title: 'كفالة أرملة', monthlyAmount: 350, description: 'مساندة شهرية للأرامل بلا معيل.'),
  SponsorshipType(id: 's4', title: 'كفالة طالب', monthlyAmount: 250, description: 'دعم الرسوم والمستلزمات التعليمية.'),
  SponsorshipType(id: 's5', title: 'دعم طبي شهري', monthlyAmount: 500, description: 'تغطية علاج وأدوية للحالات المزمنة.'),
];

const reportsData = [
  ReportItem(id: 'r1', title: 'تقرير توزيع سلال غذائية - مارس 2026', date: '2026-03-24', relatedTo: 'حملة إفطار صائم ليبيا', summary: 'تم توزيع 1200 سلة غذائية في طرابلس وبنغازي ومصراتة.'),
  ReportItem(id: 'r2', title: 'تحديث حالة علاج الطفل أحمد', date: '2026-03-18', relatedTo: 'علاج طفل مصاب بمرض قلبي', summary: 'اكتمل حجز المستشفى وتم تجهيز فحوصات ما قبل العملية.'),
];

const notificationsData = [
  AppNotification(id: 'n1', title: 'تم استلام تبرعك بنجاح', body: 'شكراً لتبرعك بمبلغ 200 د.ل لحالة علاجية.', time: 'منذ ساعتين'),
  AppNotification(id: 'n2', title: 'نشر تقرير جديد', body: 'تم نشر تقرير حملة إفطار صائم ليبيا.', time: 'أمس'),
];

const donationsData = [
  DonationRecord(id: 'd1', amount: 200, type: 'صدقة', date: '2026-04-03'),
  DonationRecord(id: 'd2', amount: 500, type: 'زكاة', date: '2026-03-20'),
];

const receiptsData = [
  Receipt(id: 'rc1', reference: 'LC-2026-00081', amount: 200, date: '2026-04-03'),
  Receipt(id: 'rc2', reference: 'LC-2026-00059', amount: 500, date: '2026-03-20'),
];
