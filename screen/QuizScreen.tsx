import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Slider } from '@miblanchard/react-native-slider';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type QuizScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Quiz'>;

const triggers = [
  'Stress', 'After Meals', 'Social Settings', 'Morning Routine',
  'Work Breaks', 'Alcohol', 'Coffee', 'Boredom'
];

export default function QuizScreen() {
  const navigation = useNavigation<QuizScreenNavigationProp>();
  const [currentStep, setCurrentStep] = useState(1);
  const [cigarettesPerDay, setCigarettesPerDay] = useState(10);
  const [yearsSmoked, setYearsSmoked] = useState(5);
  const [costPerPack, setCostPerPack] = useState(10);
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);

  const handleTriggerSelect = (trigger: string) => {
    if (selectedTriggers.includes(trigger)) {
      setSelectedTriggers(selectedTriggers.filter(t => t !== trigger));
    } else {
      setSelectedTriggers([...selectedTriggers, trigger]);
    }
  };

  const handleComplete = () => {
    navigation.navigate('QuizResults', {
      smokingHabits: {
        cigarettesPerDay,
        yearsSmoked,
        costPerPack,
        mainTriggers: selectedTriggers,
      },
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.question}>How many cigarettes do you smoke daily?</Text>
            <Slider
              value={cigarettesPerDay}
              onValueChange={value => setCigarettesPerDay(value[0])}
              minimumValue={1}
              maximumValue={40}
              step={1}
              trackStyle={styles.sliderTrack}
              thumbStyle={styles.sliderThumb}
            />
            <Text style={styles.value}>{cigarettesPerDay} cigarettes</Text>
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.question}>How many years have you been smoking?</Text>
            <Slider
              value={yearsSmoked}
              onValueChange={value => setYearsSmoked(value[0])}
              minimumValue={1}
              maximumValue={30}
              step={1}
              trackStyle={styles.sliderTrack}
              thumbStyle={styles.sliderThumb}
            />
            <Text style={styles.value}>{yearsSmoked} years</Text>
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.question}>What's the cost of a pack in your area?</Text>
            <Slider
              value={costPerPack}
              onValueChange={value => setCostPerPack(value[0])}
              minimumValue={5}
              maximumValue={25}
              step={0.5}
              trackStyle={styles.sliderTrack}
              thumbStyle={styles.sliderThumb}
            />
            <Text style={styles.value}>${costPerPack.toFixed(2)}</Text>
          </View>
        );
      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.question}>What triggers your smoking habit?</Text>
            <View style={styles.triggerGrid}>
              {triggers.map((trigger) => (
                <TouchableOpacity
                  key={trigger}
                  style={[
                    styles.triggerButton,
                    selectedTriggers.includes(trigger) && styles.triggerButtonSelected,
                  ]}
                  onPress={() => handleTriggerSelect(trigger)}
                >
                  <Text style={[
                    styles.triggerText,
                    selectedTriggers.includes(trigger) && styles.triggerTextSelected,
                  ]}>
                    {trigger}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="smoking-off" size={40} color="#4A90E2" />
          <Text style={styles.title}>Let's Understand Your Habits</Text>
          <Text style={styles.subtitle}>Step {currentStep} of 4</Text>
        </View>
        
        {renderStep()}

        <View style={styles.buttonContainer}>
          {currentStep > 1 && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setCurrentStep(currentStep - 1)}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              if (currentStep < 4) {
                setCurrentStep(currentStep + 1);
              } else {
                handleComplete();
              }
            }}
          >
            <Text style={styles.nextButtonText}>
              {currentStep === 4 ? 'Complete' : 'Next'}
            </Text>
          </TouchableOpacity>
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
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A1F36',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 5,
  },
  stepContainer: {
    padding: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1A1F36',
    marginBottom: 20,
  },
  value: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 10,
  },
  sliderTrack: {
    height: 8,
    borderRadius: 4,
  },
  sliderThumb: {
    width: 24,
    height: 24,
    backgroundColor: '#4A90E2',
    borderRadius: 12,
  },
  triggerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  triggerButton: {
    width: '48%',
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
  },
  triggerButtonSelected: {
    backgroundColor: '#4A90E2',
  },
  triggerText: {
    color: '#64748B',
    fontSize: 16,
  },
  triggerTextSelected: {
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: 20,
  },
  backButton: {
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    flex: 1,
    marginRight: 10,
  },
  nextButton: {
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#4A90E2',
    flex: 1,
    marginLeft: 10,
  },
  backButtonText: {
    color: '#64748B',
    fontSize: 16,
    textAlign: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
});
