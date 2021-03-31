import Head from 'next/head'
import MainLayout from '../layouts'
import styles from '../styles/Home.module.scss'
import Article from '../components/article'
import Nav from '../components/nav'

export default function Home(props: any) {
  return (
    <MainLayout>
      <Head>
        <title>Simple News</title>
      </Head>

      {/* ナビゲーションバーを表示する */}
      <div className={styles.contents}>
        <div className={styles.nav}>
          <nav>
            <Nav />
          </nav>
        </div>
        <div className={styles.blank} />

        {/* Article コンポーネントを表示する */}
        <div className={styles.main}>
          <Article title="headline" articles={props.topArticles} />
        </div>
      </div>
    </MainLayout>
  )
}

// getStaticProps で記事を取得し、props に返り値を渡す。
export const getStaticProps = async () => {
  // NewsAPI のトップ記事の情報を取得する。
  const pageSize = 10 // 取得したい記事の数
  const topRes = await fetch(
    `https://newsapi.org/v2/top-headlines?country=jp&pageSize=${pageSize}&apiKey=79efafa3ff2a4f82b73922c267c269e6`,
  )
  const topJson = await topRes.json()
  const topArticles = topJson?.articles

  return {
    props: {
      topArticles,
    },
    revalidate: 60 * 10,
  }
}
