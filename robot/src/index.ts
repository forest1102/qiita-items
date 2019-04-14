import axios from 'axios'
import { from, range } from 'rxjs'
import {
  flatMap,
  map,
  bufferCount,
  concatMap,
  tap,
  toArray,
  startWith
} from 'rxjs/operators'
import * as tsv from 'tsv'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as moment from 'moment'
import { toXSV } from './operators'
import { getQiitaPostsFrom } from './robots'


type PostObj = {
  title: string
  body: string
  created_at: string
  id: string
  tags: { name: string }[]
  url: string
}

const DATA_PATH = path.join(__dirname, '../data/qiita.tsv')
const tsv_write = fs.createWriteStream(DATA_PATH)

getQiitaPostsFrom(moment().subtract(1, 'days'))
  .pipe(
    tap(x => console.log(x)),
    toArray(),
    flatMap(arr => fs.outputJSON(path.join(__dirname, `../data/${moment().format('YYYY-MM-DD')}.json`), arr))
  )
  .subscribe(v => { }, err => console.log(err), () => console.log('Completed'))
