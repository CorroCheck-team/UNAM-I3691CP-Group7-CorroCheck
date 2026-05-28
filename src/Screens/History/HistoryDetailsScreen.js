import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const HistoryDetailsScreen = ({ navigation, route }) => {
  const details = route?.params?.item || {
    severity: 'High',
    confidence: 92,
    corrosionType: 'Galvanic',
    location: 'Pipeline Section B-7',
    dateTime: 'Today, 09:42 AM',
    notes: 'Visible rust forming along the weld seam. Needs urgent attention.',
    image: null,
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high':
        return '#cc0000';
      case 'medium':
        return '#e07b00';
      case 'low':
        return '#2e7d32';
      default:
        return '#cc0000';
    }
  };

  const severityColor = getSeverityColor(details.severity);
  const imageSource = typeof details.image === 'string'
    ? { uri: details.image }
    : details.image;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Details</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imagePlaceholder}>
          {imageSource ? (
            <Image source={imageSource} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={styles.imageFallback}>
              <Ionicons name="image-outline" size={52} color="rgba(255,255,255,0.75)" />
            </View>
          )}
        </View>

        <View style={styles.severityCard}>
          <View style={[styles.severityAccent, { backgroundColor: severityColor }]} />
          <View style={styles.severityContent}>
            <Text style={styles.severityLabel}>SEVERITY</Text>
            <Text style={[styles.severityValue, { color: severityColor }]}>
              {details.severity}
            </Text>
            <View style={[styles.confidenceBadge, { borderColor: severityColor }]}>
              <Text style={[styles.confidenceText, { color: severityColor }]}>
                {details.confidence}% confidence
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <MaterialCommunityIcons
                name="test-tube"
                size={18}
                color="#5f7288"
                style={styles.infoIcon}
              />
              <Text style={styles.infoLabel}>Corrosion type</Text>
            </View>
            <Text style={styles.infoValue}>{details.corrosionType}</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <Ionicons
                name="location-outline"
                size={18}
                color="#5f7288"
                style={styles.infoIcon}
              />
              <Text style={styles.infoLabel}>Location</Text>
            </View>
            <Text style={styles.infoValue}>{details.location}</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <Ionicons
                name="calendar-outline"
                size={18}
                color="#5f7288"
                style={styles.infoIcon}
              />
              <Text style={styles.infoLabel}>Date & Time</Text>
            </View>
            <Text style={styles.infoValue}>{details.dateTime}</Text>
          </View>

          <View style={[styles.infoRow, styles.notesRow]}>
            <View style={styles.infoLeft}>
              <Ionicons
                name="clipboard-outline"
                size={18}
                color="#5f7288"
                style={styles.infoIcon}
              />
              <Text style={styles.infoLabel}>Notes</Text>
            </View>
            <Text style={[styles.infoValue, styles.notesValue]}>{details.notes}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack()}
          activeOpacity={0.85}
        >
          <Text style={styles.backButtonText}>Back to History</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    backgroundColor: '#1a3356',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#b0bec5',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageFallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  severityCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  severityAccent: {
    width: 5,
    alignSelf: 'stretch',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  severityContent: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  severityLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8a9bb0',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  severityValue: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  confidenceBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  confidenceText: {
    fontSize: 13,
    fontWeight: '600',
  },
  infoSection: {
    marginBottom: 20,
  },
  infoRow: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 10,
  },
  notesRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 8,
  },
  infoLabel: {
    fontSize: 13,
    color: '#8a9bb0',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#1a3356',
    fontWeight: '600',
    textAlign: 'right',
    flexShrink: 1,
    marginLeft: 8,
  },
  notesValue: {
    textAlign: 'left',
    marginTop: 6,
    marginLeft: 0,
    color: '#334155',
    fontWeight: '400',
    lineHeight: 20,
  },
  backButton: {
    backgroundColor: '#1a3356',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#1a3356',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

export default HistoryDetailsScreen;
