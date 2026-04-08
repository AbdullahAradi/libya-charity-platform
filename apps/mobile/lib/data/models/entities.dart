class PartnerOrg {
  const PartnerOrg({required this.id, required this.name, required this.city});
  final String id;
  final String name;
  final String city;
}

class CharityCase {
  const CharityCase({
    required this.id,
    required this.title,
    required this.summary,
    required this.city,
    required this.category,
    required this.partnerId,
    required this.target,
    required this.raised,
    this.isUrgent = false,
    this.isVerified = true,
  });

  final String id;
  final String title;
  final String summary;
  final String city;
  final String category;
  final String partnerId;
  final double target;
  final double raised;
  final bool isUrgent;
  final bool isVerified;

  double get progress => target == 0 ? 0 : (raised / target).clamp(0, 1);
}

class Campaign {
  const Campaign({required this.id, required this.title, required this.type, required this.target, required this.raised});
  final String id;
  final String title;
  final String type;
  final double target;
  final double raised;
  double get progress => target == 0 ? 0 : (raised / target).clamp(0, 1);
}

class SponsorshipType {
  const SponsorshipType({required this.id, required this.title, required this.monthlyAmount, required this.description});
  final String id;
  final String title;
  final double monthlyAmount;
  final String description;
}

class ReportItem {
  const ReportItem({required this.id, required this.title, required this.date, required this.relatedTo, required this.summary});
  final String id;
  final String title;
  final String date;
  final String relatedTo;
  final String summary;
}

class AppNotification {
  const AppNotification({required this.id, required this.title, required this.body, required this.time});
  final String id;
  final String title;
  final String body;
  final String time;
}

class DonationRecord {
  const DonationRecord({required this.id, required this.amount, required this.type, required this.date});
  final String id;
  final double amount;
  final String type;
  final String date;
}

class Receipt {
  const Receipt({required this.id, required this.reference, required this.amount, required this.date});
  final String id;
  final String reference;
  final double amount;
  final String date;
}
