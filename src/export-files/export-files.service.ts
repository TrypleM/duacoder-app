import { Injectable } from '@nestjs/common';
import { Duacoder } from 'src/duacoders/entities/duacoder.entity';
import * as fastCsv from 'fast-csv';

@Injectable()
export class ExportFilesService {

    async exportToCsv(duacoders: Duacoder[]): Promise<string> {
        return new Promise((resolve, reject) => {
          const csvData = [];
          const csvStream = fastCsv
            .write(csvData, { headers: true })
            .on('data', (data) => csvData.push(data))
            .on('end', () => {
              const csvContent = csvData.join('\n');
              resolve(csvContent);
            })
            .on('error', (error) => reject(error));
    
          for (const duacoder of duacoders) {
            csvStream.write(duacoder);
          }
    
          csvStream.end();
        });
    }
}
