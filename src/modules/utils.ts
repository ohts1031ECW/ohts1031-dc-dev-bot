import * as https from 'https';
import * as fs from 'fs';
import axios from 'axios';
import { ConfigType } from '../types/types';

function unixconvert(unixtime: number): string {
  const Dateobj = new Date(unixtime * 1000);
  const Result = `${Dateobj.getFullYear()}-${Dateobj.getMonth() + 1}-${Dateobj.getDate()}-${Dateobj.getHours()}-${Dateobj.getMinutes()}`;
  return Result
}

async function fileFromUrl(url: string): Promise<Buffer> {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  return Buffer.from(response.data, 'binary');
}

async function downloadfile(url: string, filePath: string) {
  fileFromUrl(url).then(
    (buffer) => {

      fs.writeFile(filePath, buffer, (err) => {
        if (err) {
          console.error('Error writing to file:', err);
        } else {
          console.log('File written successfully');
        }
      });
    }
  )
}

export {
  unixconvert,
  fileFromUrl,
  downloadfile
}