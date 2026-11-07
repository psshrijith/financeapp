import React from 'react';
import { AppDataSettings } from './app-data-settings';
import { GeneralPreferences } from './general-preferences';

import { AppThemeMode } from './theme-modal';

interface SettingsListProps {
  useDemoData: boolean;
  onToggleDemoData: (value: boolean) => void;
  showCategorySplit: boolean;
  onToggleCategorySplit: (value: boolean) => void;
  onRestoreBackup?: () => void;
  onUploadFile?: () => void;
  onManageCategories?: () => void;
  onSetMonthlyBudget?: () => void;
  monthlyBudget?: number;
  isRestored?: boolean;
  themeMode?: AppThemeMode;
  onOpenThemeModal?: () => void;
  isAppLockEnabled?: boolean;
  hasPasscode?: boolean;
  onToggleAppLock?: () => void;
  onChangePasscode?: () => void;
  onLockApp?: () => void;
}

export function SettingsList(props: SettingsListProps) {
  return (
    <>
      <AppDataSettings {...props} />
      <GeneralPreferences
        themeMode={props.themeMode}
        onOpenThemeModal={props.onOpenThemeModal}
        isAppLockEnabled={props.isAppLockEnabled}
        hasPasscode={props.hasPasscode}
        onToggleAppLock={props.onToggleAppLock}
        onChangePasscode={props.onChangePasscode}
        onLockApp={props.onLockApp}
      />
    </>
  );
}
