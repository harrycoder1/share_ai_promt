import Feed from "@components/Feed"
export default function Home() {
  return (
   <section className="w-full flex-center  flex-col">
  <h1 className="head_text  text-center">Discover and Share <br className="max-md:hidden"/> <span className="orange_gradient">AI-Powered Prompts </span>
  </h1> 
  <p className="desc text-center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id nesciunt temporibus quibusdam voluptas ut accusamus sapiente delectus. Molestiae dolorem rerum recusandae, modi non porro illum, eveniet veniam officia quidem perferendis!</p>

  {/* feed components */}
<Feed />
  
  
  </section>
  )
}
