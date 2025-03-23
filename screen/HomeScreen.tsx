import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const [daysSober = 0] = useState(0);
  const [moneySaved = 0] = useState(0);
  const [cigarettesAvoided = 0] = useState(0);

  const achievementItems = [
    { title: '24 Hours Smoke-Free', completed: daysSober >= 1 },
    { title: '1 Week Milestone', completed: daysSober >= 7 },
    { title: '1 Month Champion', completed: daysSober >= 30 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Your Quit Journey</Text>
          <TouchableOpacity style={styles.profileButton}>
            <FontAwesome5 name="user-circle" size={24} color="#4A90E2" />
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={['#4A90E2', '#50E3C2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.statsCard}
        >
          <Text style={styles.statsTitle}>Days Smoke-Free</Text>
          <Text style={styles.statsNumber}>{daysSober}</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Money Saved</Text>
              <Text style={styles.statValue}>${moneySaved}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Cigarettes Avoided</Text>
              <Text style={styles.statValue}>{cigarettesAvoided}</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Goals</Text>
          <View style={styles.goalCard}>
            <View style={styles.goalItem}>
              <Ionicons name="water" size={24} color="#4A90E2" />
              <Text style={styles.goalText}>Drink 8 glasses of water</Text>
            </View>
            <View style={styles.goalItem}>
              <Ionicons name="walk" size={24} color="#4A90E2" />
              <Text style={styles.goalText}>Take a 10-minute walk</Text>
            </View>
            <View style={styles.goalItem}>
              <Ionicons name="medal" size={24} color="#4A90E2" />
              <Text style={styles.goalText}>Log your cravings</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsContainer}>
            {achievementItems.map((item, index) => (
              <View key={index} style={styles.achievementCard}>
                <Ionicons
                  name={item.completed ? "checkmark-circle" : "time"}
                  size={24}
                  color={item.completed ? "#50E3C2" : "#BBC3CF"}
                />
                <Text style={[
                  styles.achievementText,
                  item.completed && styles.achievementCompleted
                ]}>
                  {item.title}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A1F36',
  },
  profileButton: {
    padding: 8,
  },
  statsCard: {
    margin: 20,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  statsTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  statsNumber: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
  statValue: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 5,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1F36',
    marginBottom: 15,
  },
  goalCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F3F8',
  },
  goalText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#1A1F36',
  },
  achievementsContainer: {
    gap: 10,
  },
  achievementCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  achievementText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#1A1F36',
  },
  achievementCompleted: {
    color: '#50E3C2',
    fontWeight: '500',
  },
});
