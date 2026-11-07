import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppThemeMode } from '../more/theme-modal';

interface PasscodeSetupModalProps {
  visible: boolean;
  themeMode?: AppThemeMode;
  isChangingPasscode?: boolean;
  currentPasscode?: string | null;
  onClose: () => void;
  onSavePasscode: (pin: string) => void;
}

type SetupStep = 'verify_current' | 'create_pin' | 'confirm_pin';

export function PasscodeSetupModal({
  visible,
  themeMode = 'dim',
  isChangingPasscode = false,
  currentPasscode,
  onClose,
  onSavePasscode,
}: PasscodeSetupModalProps) {
  const initialStep: SetupStep = isChangingPasscode && currentPasscode ? 'verify_current' : 'create_pin';
  const [step, setStep] = useState<SetupStep>(initialStep);
  const [pin, setPin] = useState('');
  const [firstEnteredPin, setFirstEnteredPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Reset state when modal opens or setup mode changes
  useEffect(() => {
    if (visible) {
      setStep(isChangingPasscode && currentPasscode ? 'verify_current' : 'create_pin');
      setPin('');
      setFirstEnteredPin('');
      setErrorMsg('');
    }
  }, [visible, isChangingPasscode, currentPasscode]);

  const handleKeyPress = (digit: string) => {
    if (pin.length >= 4) return;
    const newPin = pin + digit;
    setPin(newPin);
    setErrorMsg('');

    if (newPin.length === 4) {
      setTimeout(() => {
        handlePinSubmit(newPin);
      }, 150);
    }
  };

  const handlePinSubmit = (enteredPin: string) => {
    if (step === 'verify_current') {
      if (enteredPin === currentPasscode) {
        setStep('create_pin');
        setPin('');
        setErrorMsg('');
      } else {
        setErrorMsg('Current passcode incorrect');
        setPin('');
      }
    } else if (step === 'create_pin') {
      setFirstEnteredPin(enteredPin);
      setStep('confirm_pin');
      setPin('');
      setErrorMsg('');
    } else if (step === 'confirm_pin') {
      if (enteredPin === firstEnteredPin) {
        onSavePasscode(enteredPin);
        setPin('');
        setFirstEnteredPin('');
        setErrorMsg('');
      } else {
        setErrorMsg('Passcodes do not match. Try again.');
        setPin('');
        setStep('create_pin');
      }
    }
  };

  const handleDelete = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
      setErrorMsg('');
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 'verify_current':
        return 'Verify Current Passcode';
      case 'create_pin':
        return isChangingPasscode ? 'Enter New Passcode' : 'Create 4-Digit Passcode';
      case 'confirm_pin':
        return 'Confirm Passcode';
    }
  };

  const getStepSubtitle = () => {
    switch (step) {
      case 'verify_current':
        return 'Enter your existing 4-digit code to continue';
      case 'create_pin':
        return 'Choose a 4-digit code you will remember';
      case 'confirm_pin':
        return 'Re-enter your 4-digit code to confirm';
    }
  };

  const bgClass = themeMode === 'lights-out' ? 'bg-black' : 'bg-slate-950';

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View className={`flex-1 ${bgClass} justify-between items-center py-14 px-6`}>
        {/* Top Navigation Bar */}
        <View className="w-full flex-row items-center justify-between">
          <Pressable
            onPress={onClose}
            className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 items-center justify-center active:opacity-70">
            <Ionicons name="close" size={20} color="#94A3B8" />
          </Pressable>

          <View className="flex-row items-center gap-1.5">
            <View
              className={`h-1.5 rounded-full ${
                step === 'verify_current'
                  ? 'w-6 bg-emerald-400'
                  : step === 'create_pin'
                  ? 'w-6 bg-emerald-400'
                  : 'w-2 bg-slate-700'
              }`}
            />
            <View
              className={`h-1.5 rounded-full ${
                step === 'confirm_pin' ? 'w-6 bg-emerald-400' : 'w-2 bg-slate-700'
              }`}
            />
          </View>

          <View className="w-10" />
        </View>

        {/* Lock Header */}
        <View className="items-center mt-2">
          <View className="w-16 h-16 rounded-3xl bg-emerald-500/15 border border-emerald-500/40 items-center justify-center mb-4">
            <Ionicons
              name={step === 'confirm_pin' ? 'checkmark-circle-outline' : 'shield-checkmark-outline'}
              size={32}
              color="#34D399"
            />
          </View>
          <Text className="text-[24px] font-bold text-white tracking-tight text-center">
            {getStepTitle()}
          </Text>
          <Text className="text-[13px] text-slate-400 mt-1 text-center">
            {getStepSubtitle()}
          </Text>
        </View>

        {/* PIN Indicators */}
        <View className="items-center w-full">
          {errorMsg ? (
            <View className="bg-red-500/20 border border-red-500/40 px-4 py-2 rounded-2xl mb-6">
              <Text className="text-xs font-semibold text-red-400 text-center">⚠️ {errorMsg}</Text>
            </View>
          ) : (
            <View className="h-9 mb-6" />
          )}

          <View className="flex-row gap-6 items-center justify-center">
            {[0, 1, 2, 3].map((idx) => {
              const isFilled = pin.length > idx;
              return (
                <View
                  key={idx}
                  className={`w-4 h-4 rounded-full border ${
                    isFilled
                      ? 'bg-emerald-400 border-emerald-400 shadow-lg shadow-emerald-500/50 scale-110'
                      : 'bg-slate-800 border-slate-700'
                  }`}
                />
              );
            })}
          </View>
        </View>

        {/* Numeric Keypad */}
        <View className="w-full max-w-[290px] gap-4 mb-4">
          {[
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9'],
          ].map((row, rIdx) => (
            <View key={rIdx} className="flex-row justify-between">
              {row.map((num) => (
                <Pressable
                  key={num}
                  onPress={() => handleKeyPress(num)}
                  className="w-20 h-20 rounded-full bg-slate-900/80 border border-slate-800/80 items-center justify-center active:bg-slate-800/80 active:scale-95">
                  <Text className="text-[26px] font-semibold text-white">{num}</Text>
                </Pressable>
              ))}
            </View>
          ))}

          <View className="flex-row justify-between items-center">
            <View className="w-20 h-20 items-center justify-center" />

            <Pressable
              onPress={() => handleKeyPress('0')}
              className="w-20 h-20 rounded-full bg-slate-900/80 border border-slate-800/80 items-center justify-center active:bg-slate-800/80 active:scale-95">
              <Text className="text-[26px] font-semibold text-white">0</Text>
            </Pressable>

            <Pressable
              onPress={handleDelete}
              className="w-20 h-20 rounded-full bg-slate-900/40 border border-slate-800/50 items-center justify-center active:opacity-70">
              <Ionicons name="backspace-outline" size={24} color="#94A3B8" />
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
