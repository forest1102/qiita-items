
import axios from 'axios'
import { from, range } from 'rxjs'
import {
  flatMap,
  map,
  bufferCount,
  concatMap,
  tap,
  startWith
} from 'rxjs/operators'
type PostObj = {
  title: string
  body: string
  created_at: string
  id: string
  tags: { name: string }[]
  url: string
}

export const QiitaAxios = axios.create({
  baseURL: 'https://qiita.com',
  url: '/api/v2/items',
  params: {
    per_page: 100,
  }
})

export const getQiitaPosts = (params: { page?: number, query?: string } = {}) =>
  from(
    axios({
      baseURL: 'https://qiita.com',
      url: '/api/v2/items',
      headers: {
        Authorization: 'Bearer 24439640001c20f0958f386dd146e868e7686f43'
      },
      params: {
        per_page: 100,
        ...params,
      }
    })
  )
    .pipe(
      bufferCount(50),
      concatMap(arr =>
        from(arr)
          .pipe(

            flatMap(res =>
              range(2, Math.ceil((res.headers['total-count'] || 1) / 100) - 1)
                .pipe(
                  flatMap(i =>
                    from(
                      axios({
                        baseURL: 'https://qiita.com',
                        url: '/api/v2/items',
                        headers: {
                          Authorization: 'Bearer 24439640001c20f0958f386dd146e868e7686f43'
                        },
                        params: {
                          ...params,
                          page: i
                        }
                      })
                    )
                  ),
                  map(_res => _res.data),
                  startWith(res.data)
                )
            ),
        )
      ),
      flatMap(data => data),
      map(({ title, body, created_at, id, tags, url }) => ({
        title,
        body,
        created_at,
        id,
        tags,
        url
      }) as PostObj),
  )
