import React from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const statusCards = [
  { label: 'Low', count: 12, color: '#00B824' },
  { label: 'Moderate', count: 4, color: '#F29900' },
  { label: 'High', count: 1, color: '#DD1B0C' },
  { label: 'Total', count: 17, color: '#B8C8D9' },
];

const activities = [
  {
    id: 'pipeline',
    title: 'Pipeline Section B-7',
    date: 'Today . 09:42AM',
    severity: 'High',
  },
  {
    id: 'tank',
    title: 'Tank Wall - Zone 3',
    date: 'Today . 08:15AM',
    severity: 'Moderate',
  },
  {
    id: 'bridge',
    title: 'Bridge Beam C-12',
    date: 'Yesterday . 04:30PM',
    severity: 'Low',
  },
];

const severityStyles = {
  High: {
    accent: '#F22216',
    badgeBackground: '#FFE8EB',
    badgeText: '#D71912',
  },
  Moderate: {
    accent: '#F39A0A',
    badgeBackground: '#FFF2C7',
    badgeText: '#F28B00',
  },
  Low: {
    accent: '#22D33F',
    badgeBackground: '#B8FFC2',
    badgeText: '#00A51F',
  },
};

const shortcuts = [
  { label: 'History', icon: 'home-outline' },
  { label: 'Reports', icon: 'time-outline' },
  { label: 'Analytics', icon: 'bar-chart-outline' },
  { label: 'Profile', icon: 'person-outline' },
];

const tabs = [
  { label: 'Home', icon: 'home-outline', active: true },
  { label: 'Upload', icon: 'push-outline' },
  { label: 'History', icon: 'time-outline' },
  { label: 'Profile', icon: 'person-outline' },
];

function StatusCard({ item }) {
  return (
    <View style={styles.statusCard}>
      <View style={[styles.statusDot, { backgroundColor: item.color }]} />
      <Text style={styles.statusCount}>{item.count}</Text>
      <Text style={styles.statusLabel}>{item.label}</Text>
    </View>
  );
}

function ActivityCard({ item }) {
  const config = severityStyles[item.severity];

  return (
    <View style={styles.activityCard}>
      <View style={[styles.activityAccent, { backgroundColor: config.accent }]} />
      <View style={styles.activityText}>
        <Text style={styles.activityTitle}>{item.title}</Text>
        <Text style={styles.activityDate}>{item.date}</Text>
      </View>
      <View style={[styles.badge, { backgroundColor: config.badgeBackground }]}>
        <Text style={[styles.badgeText, { color: config.badgeText }]}>
          {item.severity}
        </Text>
      </View>
    </View>
  );
}

function Shortcut({ item }) {
  return (
    <Pressable style={styles.shortcut}>
      <View style={styles.shortcutIcon}>
        <Ionicons name={item.icon} size={18} color="#1E4778" />
      </View>
      <Text style={styles.shortcutLabel}>{item.label}</Text>
    </Pressable>
  );
}

function BottomTab({ item }) {
  const color = item.active ? '#173A63' : '#B8C8D9';

  return (
    <Pressable style={styles.tab}>
      <Ionicons name={item.icon} size={23} color={color} />
      <Text style={[styles.tabLabel, { color }]}>{item.label}</Text>
      {item.active ? <View style={styles.activeDot} /> : null}
    </Pressable>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1E3F68" />
      <View style={styles.appShell}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>CorroCheck</Text>
          <Pressable style={styles.profileButton}>
            <Ionicons name="person-outline" size={23} color="#142E4D" />
          </Pressable>
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentInner}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.statusRow}>
            {statusCards.map((item) => (
              <StatusCard key={item.label} item={item} />
            ))}
          </View>

          <Pressable style={styles.uploadButton}>
            <Ionicons name="push-outline" size={26} color="#FFFFFF" />
            <Text style={styles.uploadText}>Upload Image</Text>
          </Pressable>

          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            {activities.map((item) => (
              <ActivityCard key={item.id} item={item} />
            ))}
          </View>

          <Text style={styles.shortcutTitle}>Shortcuts</Text>
          <View style={styles.shortcutRow}>
            {shortcuts.map((item) => (
              <Shortcut key={item.label} item={item} />
            ))}
          </View>

          <View style={styles.searchBox}>
            <View style={styles.searchDot} />
            <TextInput
              placeholder="Search Inspections"
              placeholderTextColor="#B5C6D9"
              style={styles.searchInput}
            />
          </View>
        </ScrollView>

        <View style={styles.bottomNav}>
          {tabs.map((item) => (
            <BottomTab key={item.label} item={item} />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#D9D9D9',
  },
  appShell: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 430,
    backgroundColor: '#F4F5F7',
  },
  header: {
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E3F68',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: 18,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '800',
  },
  profileButton: {
    position: 'absolute',
    right: 16,
    top: 12,
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 19,
    backgroundColor: '#CFDAE5',
  },
  content: {
    flex: 1,
  },
  contentInner: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 118,
  },
  statusRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 15,
  },
  statusCard: {
    flex: 1,
    minHeight: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D7DEE6',
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
  },
  statusDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginBottom: 5,
  },
  statusCount: {
    color: '#1E3F68',
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 24,
  },
  statusLabel: {
    color: '#1A3659',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  uploadButton: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 52,
    borderRadius: 9,
    backgroundColor: '#1E3F68',
    marginBottom: 10,
  },
  uploadText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  sectionTitle: {
    color: '#1D3F69',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 5,
  },
  activityList: {
    gap: 10,
    marginBottom: 14,
  },
  activityCard: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 8,
    backgroundColor: '#B5C8DC',
    overflow: 'hidden',
    paddingVertical: 9,
    paddingLeft: 12,
    paddingRight: 12,
  },
  activityAccent: {
    position: 'absolute',
    left: 0,
    top: 8,
    bottom: 8,
    width: 4,
  },
  activityText: {
    flex: 1,
    paddingRight: 10,
  },
  activityTitle: {
    color: '#0B4D8D',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 5,
  },
  activityDate: {
    color: '#0B65B2',
    fontSize: 10,
  },
  badge: {
    minWidth: 47,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    paddingHorizontal: 8,
    marginTop: 1,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '800',
  },
  shortcutTitle: {
    color: '#0E5DA8',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 14,
  },
  shortcutRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 28,
  },
  shortcut: {
    flex: 1,
    minHeight: 59,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  shortcutIcon: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#EEF5FC',
    marginBottom: 2,
  },
  shortcutLabel: {
    color: '#173A63',
    fontSize: 9,
    fontWeight: '800',
  },
  searchBox: {
    height: 29,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
  },
  searchDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#B5C6D9',
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    color: '#1D3F69',
    fontSize: 12,
    paddingVertical: 0,
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
  },
  tab: {
    flex: 1,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 3,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#173A63',
    marginTop: 3,
  },
});
