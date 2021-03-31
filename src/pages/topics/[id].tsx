import Head from 'next/head'
import { useRouter } from 'next/router'
import Article from '../../components/article'
import Nav from '../../components/nav'
import MainLayout from '../../layouts/index'
import styles from '../../styles/Home.module.scss'

// 各 Topic のページを、動的ルートを使用して作成する。
// 引数の props は、getStaticProps で取得した props を使用する。
function Topic(props: any) {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <MainLayout>
      <Head>
        <title>Sample News - {props.title.toUpperCase()}</title>
      </Head>
      <div className={styles.contents}>
        <div className={styles.nav}>
          <nav>
            <Nav />
          </nav>
        </div>
        <div className={styles.blank} />
        <div className={styles.main} style={{ marginRight: '10%' }}>
          <Article title={props.title} articles={props.topicArticles} />
        </div>
      </div>
    </MainLayout>
  )
}

// 動的ルートを使用するために、動的パスを取得する関数。
// paths には本来、動的ルートで表示するページにおけるプロジェクト内のパスを配列で渡す必要があるが、
// 今回は必要ないため、空の配列を渡している。
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

// 動的ルートを使用するために、動的ルートを取得する関数。
// return したオブジェクトの props オブジェクトに、動的ルートで使用する情報を格納する。
export async function getStaticProps({ params }: any) {
  const topicRes = await fetch(
    `https://newsapi.org/v2/top-headlines?country=jp&category=${params.id}&country=jp&apiKey=79efafa3ff2a4f82b73922c267c269e6`,
  )
  const topicJson = await topicRes.json()
  const topicArticles = await topicJson.articles

  const title = params.id

  return {
    props: { topicArticles, title },
    revalidate: 60 * 10,
  }
}

export default Topic
