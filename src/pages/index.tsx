import Head from 'next/head'
import MainLayout from '../layouts'
import styles from '../styles/Home.module.scss'
import Article from '../components/article'
import Nav from '../components/nav'
import WeatherNews from '../components/weather-news'
import PickupArticle from '../components/pickup-article'

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
        <div className={styles.aside}>
          {/* 天気コンポーネントを表示する */}
          <WeatherNews weatherNews={props.weatherNews} />
          {/* ピックアップ記事コンポーネントを表示する */}
          <PickupArticle articles={props.pickupArticles} />
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

  // OpenWeatherMap の天気の情報を取得(ここでは東京の座標を入力している)。
  const lat = 35.4122
  const lon = 139.413
  const exclude = 'minutely' // 取得しない情報（1分間ごとの天気情報）
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=${exclude}&appid=15187bb00ec45d2282a8ebd4e1f8a7b5`,
  )
  const weatherJson = await weatherRes.json()
  const weatherNews = weatherJson

  // NewsAPI のピックアップ記事の情報を取得する
  const keyword = 'software' // キーワードで検索（ソフトウェア）
  const sortBy = 'popularity' // 表示順位（人気順）
  const pickupPageSize = 5 // ページサイズ（5）
  const pickupRes = await fetch(
    `https://newsapi.org/v2/everything?q=${keyword}&language=jp&sortBy=${sortBy}&pageSize=${pickupPageSize}&apiKey=79efafa3ff2a4f82b73922c267c269e6`,
  )
  const pickupJson = await pickupRes.json()
  const pickupArticles = pickupJson?.articles

  return {
    props: {
      topArticles,
      weatherNews,
      pickupArticles,
    },
    revalidate: 30 * 10,
  }
}
