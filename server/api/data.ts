import fs from 'fs';
import csv from 'csv-parser';
import { parse, formatISO } from 'date-fns'


export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const filePath = './server/data.csv';

  try {
    return await new Promise((resolve, reject) => {
      const results: any = [];
      const ageMap = { "15-25": 'teen', ">25": 'adult' }

      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
          results.push({
            date: formatISO(parse(data.Day, 'd/M/yyyy', new Date())), age: ageMap[data.Age], gender: data.Gender.toLowerCase(),
            feature: {
              'A': parseInt(data.A),
              'B': parseInt(data.B),
              'C': parseInt(data.C),
              'D': parseInt(data.D),
              'E': parseInt(data.E),
              'F': parseInt(data.F),
            }
          })
        })
        .on('end', () => resolve(results))
        .on('error', reject)
    })
  } catch (error: any) {
    console.error("API data GET", error)

    throw createError({ statusCode: 500, statusMessage: 'Some Unknown Error Found' })
  }
})
