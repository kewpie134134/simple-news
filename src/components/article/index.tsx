import styles from './index.module.scss'
import moment from 'moment'
import Props from '../types'

// アーティクルコンポーネントを作成する
const Article: React.FC<Props> = ({ articles, title }) => {
  return (
    <section className={styles.article}>
      <div className={styles.article__heading}>
        {/* props の title を少し編集して表示。 */}
        <h1>
          {title
            ? title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()
            : null}
        </h1>
      </div>
      {articles
        ? articles.map((article, index) => {
            // ニュースが何時間前に記載されたかの表示
            const time =
              moment(article.publishedAt || moment.now())
                .fromNow()
                .slice(0, 1) == 'a'
                ? 1
                : moment(article.publishedAt || moment.now())
                    .fromNow()
                    .slice(0, 1)
            return (
              // 記事の内容を別タブで表示させる
              <a href={article.url} key={index} target="_blank" rel="noopener">
                <article className={styles.article__main}>
                  <div className={styles.article__title}>
                    <p>{article.title}</p>
                    <p className={styles.article__time}>{time} 時間前</p>
                  </div>
                  {article.urlToImage && (
                    <img
                      key={index}
                      src={article.urlToImage}
                      className={styles.article__img}
                      alt={`${article.title} image`}
                    />
                  )}
                </article>
              </a>
            )
          })
        : null}
    </section>
  )
}

export default Article
