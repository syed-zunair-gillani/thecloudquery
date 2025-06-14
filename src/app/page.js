import Featured from "./components/featured";
import Hero from "./components/hero";
import apolloClient from "@/config/client";
import { QHomePage } from "@/config/queries";
import TemplateThreeCard from "./atoms/card/template-three";
import stylesCard from './components/category/template-two/template-two.module.scss';
import { splitArrayPattern } from "./utils";

export default async function Home() {
  const { data } = await apolloClient.query({ query: QHomePage });
  const { page } = data;
  const formattedArray = splitArrayPattern(page?.homePagePosts?.posts?.nodes);

  return (
    <>
      <Featured
        data={page.homePageFeatured}
      />

      {/* <Category key={`cat-${index}`} moduleItem={block.data} /> */}

      {
        formattedArray?.length > 0 && formattedArray?.map((item, index) => (
          <div className={`post_wrapper ${stylesCard.module}`} key={index}>
            {
              item?.map((post, postIndex) => {                
                return(
                  <TemplateThreeCard
                  image={post?.featuredImage?.node?.mediaItemUrl}
                  title={post?.title}
                  intro={item?.length === 2 ? post?.postMeta?.shortInfo : ''}
                  link={post?.uri}
                  category={post?.postMeta.category}
                  time={post?.postMeta?.time}
                  key={postIndex}
                />
                )
              })
            }
          </div>
        ))
      }

       {
        page.homePageHero.title && (
          <Hero
            title={page.homePageHero.title}
            content={page.homePageHero.content}
            buttonText={page.homePageHero.buttontext}
            buttonLink={page.homePageHero.buttonlink}
          />
        )
      }

    </>
  )
  
}