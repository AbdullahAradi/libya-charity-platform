import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../mock/mock_data.dart';
import '../models/entities.dart';

class MockRepository {
  List<CharityCase> getCases() => casesData;
  List<Campaign> getCampaigns() => campaignsData;
  List<SponsorshipType> getSponsorships() => sponsorshipsData;
  List<ReportItem> getReports() => reportsData;
  List<AppNotification> getNotifications() => notificationsData;
  List<PartnerOrg> getPartners() => partners;
  List<DonationRecord> getDonations() => donationsData;
  List<Receipt> getReceipts() => receiptsData;
}

final repositoryProvider = Provider<MockRepository>((ref) => MockRepository());
