import { ExtractLightComponent } from '../components/ExtractLight';
import { MyCapacityComponent } from '../components/MyCapacity';
import { SettingCapacityComponent } from '../components/SettingCapacity';
import { SleepModeComponent } from '../components/SleepMode';
import { SoundModeComponent } from '../components/SoundMode';
import { SoundVolumeComponent } from '../components/SoundVolume';
import { WaitModeComponent } from '../components/WaitMode';

export type ProdList = keyof typeof WATER_CONTROL_UI;
export type Protocol = keyof typeof WATER_CONTROL.controls;
export type Props = { protocol: string; status: Record<string, string> };

// 제품별 기능 노출 목록 (모델명 기준)
export const WATER_CONTROL_UI = {
  ICON_20: [['myCapacity'], ['sleepMode', 'extractLight'], ['soundMode']],
  HIDDEN_B_TW: [['waitMode', 'myCapacity'], ['sleepMode']],
  ELITE: [],
} satisfies Record<string, Protocol[][]>;

// 프로토콜 키
export const WATER_CONTROL = {
  controls: {
    waitMode: { protocol: '004B' },
    cupSensing: { protocol: '004E' },
    autoMove: { protocol: '004C' },
    myCapacity: { protocol: '0051' },
    settingCapacity: { protocol: '0047' }, // '0051'의 sub protocol
    extractCapacityHalf: { protocol: '00BE' },
    extractCapacityCup: { protocol: '00BF' },
    extractCapacityTwoCup: { protocol: '00C0' },
    powerSave: { protocol: '0004' },
    sleepingMode: { protocol: '005E' },
    sleepingMode1: { protocol: '0060' }, // '005E'의 sub protocol
    sleepingMode2: { protocol: '0061' }, // '005E'의 sub protocol
    sleepingMode3: { protocol: '0062' }, // '005E'의 sub protocol
    sleepMode: { protocol: '0037' },
    extractLight: { protocol: '0049' },
    welcomeLight: { protocol: '004A' },
    euroSter: { protocol: '0007' },
    euroSterTime: { protocol: '0013' },
    soundMode: { protocol: '0031' },
    soundVolume: { protocol: '0033' }, // '0031'의 sub protocol
  },
};

// 프로토콜별 컴포넌트 정의

export const WATER_CONTROL_REGISTRY: Record<
  Protocol,
  React.ComponentType<Props>
> = {
  waitMode: WaitModeComponent,
  cupSensing: WaitModeComponent, // 임시
  autoMove: WaitModeComponent, // 임시
  myCapacity: MyCapacityComponent,
  settingCapacity: SettingCapacityComponent,
  extractCapacityHalf: MyCapacityComponent, // 임시
  extractCapacityCup: MyCapacityComponent, // 임시
  extractCapacityTwoCup: MyCapacityComponent, // 임시
  powerSave: MyCapacityComponent, // 임시
  sleepingMode: MyCapacityComponent, // 임시
  sleepingMode1: MyCapacityComponent, // 임시
  sleepingMode2: MyCapacityComponent, // 임시
  sleepingMode3: MyCapacityComponent, // 임시
  sleepMode: SleepModeComponent,
  extractLight: ExtractLightComponent,
  welcomeLight: MyCapacityComponent, // 임시
  euroSter: MyCapacityComponent, // 임시
  euroSterTime: MyCapacityComponent, // 임시
  soundMode: SoundModeComponent,
  soundVolume: SoundVolumeComponent,
};

export const CAPACITY_CATEGORY = [
  { id: '0', value: '120ml', rValue: '120' },
  { id: '1', value: '130ml', rValue: '130' },
  { id: '2', value: '140ml', rValue: '140' },
  { id: '3', value: '150ml', rValue: '150' },
  { id: '4', value: '160ml', rValue: '160' },
  { id: '5', value: '170ml', rValue: '170' },
  { id: '6', value: '180ml', rValue: '180' },
  { id: '7', value: '190ml', rValue: '190' },
  { id: '8', value: '200ml', rValue: '200' },

  { id: '9', value: '210ml', rValue: '210' },
  { id: '10', value: '220ml', rValue: '220' },
  { id: '11', value: '230ml', rValue: '230' },
  { id: '12', value: '240ml', rValue: '240' },
  { id: '13', value: '250ml', rValue: '250' },
  { id: '14', value: '260ml', rValue: '260' },
  { id: '15', value: '270ml', rValue: '270' },
  { id: '16', value: '280ml', rValue: '280' },
  { id: '17', value: '290ml', rValue: '290' },

  { id: '18', value: '300ml', rValue: '300' },
  { id: '19', value: '310ml', rValue: '310' },
  { id: '20', value: '320ml', rValue: '320' },
  { id: '21', value: '330ml', rValue: '330' },
  { id: '22', value: '340ml', rValue: '340' },
  { id: '23', value: '350ml', rValue: '350' },
  { id: '24', value: '360ml', rValue: '360' },
  { id: '25', value: '370ml', rValue: '370' },
  { id: '26', value: '380ml', rValue: '380' },
  { id: '27', value: '390ml', rValue: '390' },

  { id: '28', value: '400ml', rValue: '400' },
  { id: '29', value: '410ml', rValue: '410' },
  { id: '30', value: '420ml', rValue: '420' },
  { id: '31', value: '430ml', rValue: '430' },
  { id: '32', value: '440ml', rValue: '440' },
  { id: '33', value: '450ml', rValue: '450' },
  { id: '34', value: '460ml', rValue: '460' },
  { id: '35', value: '470ml', rValue: '470' },
  { id: '36', value: '480ml', rValue: '480' },
  { id: '37', value: '490ml', rValue: '490' },

  { id: '38', value: '500ml', rValue: '500' },
  { id: '39', value: '510ml', rValue: '510' },
  { id: '40', value: '520ml', rValue: '520' },
  { id: '41', value: '530ml', rValue: '530' },
  { id: '42', value: '540ml', rValue: '540' },
  { id: '43', value: '550ml', rValue: '550' },
  { id: '44', value: '560ml', rValue: '560' },
  { id: '45', value: '570ml', rValue: '570' },
  { id: '46', value: '580ml', rValue: '580' },
  { id: '47', value: '590ml', rValue: '590' },

  { id: '48', value: '600ml', rValue: '600' },
  { id: '49', value: '610ml', rValue: '610' },
  { id: '50', value: '620ml', rValue: '620' },
  { id: '51', value: '630ml', rValue: '630' },
  { id: '52', value: '640ml', rValue: '640' },
  { id: '53', value: '650ml', rValue: '650' },
  { id: '54', value: '660ml', rValue: '660' },
  { id: '55', value: '670ml', rValue: '670' },
  { id: '56', value: '680ml', rValue: '680' },
  { id: '57', value: '690ml', rValue: '690' },

  { id: '58', value: '700ml', rValue: '700' },
  { id: '59', value: '710ml', rValue: '710' },
  { id: '60', value: '720ml', rValue: '720' },
  { id: '61', value: '730ml', rValue: '730' },
  { id: '62', value: '740ml', rValue: '740' },
  { id: '63', value: '750ml', rValue: '750' },
  { id: '64', value: '760ml', rValue: '760' },
  { id: '65', value: '770ml', rValue: '770' },
  { id: '66', value: '780ml', rValue: '780' },
  { id: '67', value: '790ml', rValue: '790' },

  { id: '68', value: '800ml', rValue: '800' },
  { id: '69', value: '810ml', rValue: '810' },
  { id: '70', value: '820ml', rValue: '820' },
  { id: '71', value: '830ml', rValue: '830' },
  { id: '72', value: '840ml', rValue: '840' },
  { id: '73', value: '850ml', rValue: '850' },
  { id: '74', value: '860ml', rValue: '860' },
  { id: '75', value: '870ml', rValue: '870' },
  { id: '76', value: '880ml', rValue: '880' },
  { id: '77', value: '890ml', rValue: '890' },

  { id: '78', value: '900ml', rValue: '900' },
  { id: '79', value: '910ml', rValue: '910' },
  { id: '80', value: '920ml', rValue: '920' },
  { id: '81', value: '930ml', rValue: '930' },
  { id: '82', value: '940ml', rValue: '940' },
  { id: '83', value: '950ml', rValue: '950' },
  { id: '84', value: '960ml', rValue: '960' },
  { id: '85', value: '970ml', rValue: '970' },
  { id: '86', value: '980ml', rValue: '980' },
  { id: '87', value: '990ml', rValue: '990' },
];

export const SOUND_CATEGORY = [
  { id: '1', value: '무음', rValue: '1' },
  { id: '2', value: '효과음', rValue: '2' },
  { id: '3', value: '음성', rValue: '3' },
];
