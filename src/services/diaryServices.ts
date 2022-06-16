import { diaryEntry, NewDiaryEntry, NonSensitiveInfoDiaryEntry } from '../routes/types'
import diaryData from './diaries.json'


const diaries: Array<diaryEntry> = diaryData as Array<diaryEntry>

export const getEntries = () => diaries


export const findById = (id: number): NonSensitiveInfoDiaryEntry | undefined => {
  const entry = diaries.find(d => d.id === id)
  if (entry != null) {
    const { comment, ...restOfDiary } = entry
    return restOfDiary
  }

  return undefined
}



export const getEntriesWithoutSensitiveInfo = (): NonSensitiveInfoDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => {
    return {
      id,
      date,
      weather,
      visibility
    }
  })
}

export const addEntry = (newDiaryEntry:NewDiaryEntry):diaryEntry => {
  const newDiary = {
    // id:diaries.length +1 si son consecutivos
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...newDiaryEntry
  }
  diaries.push(newDiary)
  return newDiary
}

