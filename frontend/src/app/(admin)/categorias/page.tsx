import { Button } from '@/components/ui/button'
import  PromotionComponent  from '@/components/promotions/promotionComponent'


export default function Home() {
    return (
      <main>
        <PromotionComponent category="Eletrônicos" discout="10%" end_date="10/10/2021" />
      </main>
    )
  }