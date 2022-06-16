export type Weather = 'suny' | 'ruiny' | 'cloudy' | 'windy' | 'stormy'
export type Visibility = 'great' | 'goot' | 'ok' | 'poor'

export enum Weather {
    sueny = 'suny',
    ruiny = 'ruiny',
    cloudy = 'cloudy',
    windy = 'windy',
    storny = 'stormy'
}

export interface diaryEntry {
    id: number,
    date: string,
    weather: weather,
    visibility: visibility,
    comment: string
}
//export type NonSensitiveInfoDiaryEntry = Pick<diaryEntry, 'id', 'date', 'weather', 'visibility'>
export type NonSensitiveInfoDiaryEntry = Omit<diaryEntry, 'comment'>
export type NewDiaryEntry = Omit<diaryEntry, 'id'>
