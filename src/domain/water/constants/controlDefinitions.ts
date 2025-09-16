import { MyCapacityComponent } from '../components/MyCapacity';
import { SleepModeComponent } from '../components/SleepMode';
import { WaitModeComponent } from '../components/WaitMode';

export const WATER_CONTROL = {
  // 프로토콜 키
  controls: {
    waitMode: { id: '004B' },
    cupSensing: { id: '004E' },
    autoMove: { id: '004C' },

    myCapacity: { id: '0051' },
    settingCapacity: { id: '0047' },
    extractCapacityHalf: { id: '00BE' },
    extractCapacityCup: { id: '00BF' },
    extractCapacityTwoCup: { id: '00C0' },

    powerSave: { id: '0004' },
    sleepingMode: { id: '005E' },
    sleepingMode1: { id: '0060' },
    sleepingMode2: { id: '0061' },
    sleepingMode3: { id: '0062' },
    sleepMode: { id: '0037' },
    extractLight: { id: '0049' },
    welcomeLight: { id: '004A' },

    euroSter: { id: '0007' },
    euroSterTime: { id: '0013' },
  },

  // 제품별 노출 목록 (모델명 기준)
  controlSpec: {
    ICON_20: [['myCapacity', 'sleepMode']],
    HIDDEN_B_TW: [['waitMode', 'myCapacity'], ['sleepMode']],
    ELITE: [],
  } as const,
};

// 프로토콜별 컴포넌트 정의
type Protocol = keyof typeof WATER_CONTROL.controls;
type Props = { protocol: string; status: string };
export const WATER_CONTROL_REGISTRY: Record<
  Protocol,
  React.ComponentType<Props>
> = {
  waitMode: WaitModeComponent,
  cupSensing: WaitModeComponent, // 임시
  autoMove: WaitModeComponent, // 임시

  myCapacity: MyCapacityComponent,
  settingCapacity: MyCapacityComponent, // 임시
  extractCapacityHalf: MyCapacityComponent, // 임시
  extractCapacityCup: MyCapacityComponent, // 임시
  extractCapacityTwoCup: MyCapacityComponent, // 임시

  powerSave: MyCapacityComponent, // 임시
  sleepingMode: MyCapacityComponent, // 임시
  sleepingMode1: MyCapacityComponent, // 임시
  sleepingMode2: MyCapacityComponent, // 임시
  sleepingMode3: MyCapacityComponent, // 임시
  sleepMode: SleepModeComponent,
  extractLight: MyCapacityComponent, // 임시
  welcomeLight: MyCapacityComponent, // 임시

  euroSter: MyCapacityComponent, // 임시
  euroSterTime: MyCapacityComponent, // 임시
};
