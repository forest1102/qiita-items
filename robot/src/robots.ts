import { getQiitaPosts, QiitaAxios } from './observable'
import { toArray, tap } from 'rxjs/operators'
import * as moment from 'moment'


export const getQiitaPostsFrom = (timestamp: moment.Moment) =>
  getQiitaPosts({ query: 'updated:>' + timestamp.format('YYYY-MM-DD') })
    .pipe(
      tap(v => console.log(v)),
      toArray()
    )
