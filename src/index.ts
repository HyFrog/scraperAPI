import express from 'express';
import { scrapeShopifyPage } from './scraper';

const app = express();
const port = 3001;


app.get('/scrape', async (req: express.Request, res: express.Response): Promise<void> => {
  const url = req.query.url as string;
  if (!url) {
    res.status(400).json({ error: 'URL is required' });
  }

  try {
    const data = await scrapeShopifyPage(url);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// curl "http://localhost:3001/scrape?url=https://growgrows.com/en-us/products/plentiful-planets-sleepsuit"
// {"fonts":[{"family":null,"url":"https://cdn.shopify.com/extensions/019204da-0a7e-4953-9e98-57598c0a2e57/upnova-391/assets/upez.css"},{"family":null,"url":"https://static.klaviyo.com/onsite/js/532.8dcec241397c646faaee.css"}],"primaryButton":{"fontFamily":"apercro_proregular, sans-serif","fontSize":"11px","lineHeight":"15.4px","letterSpacing":"normal","textTransform":"none","textDecoration":"none solid rgb(69, 119, 139)","textAlign":"center","backgroundColor":"rgb(242, 240, 235)","color":"rgb(69, 119, 139)","borderColor":"rgb(69, 119, 139)","borderWidth":"0px","borderRadius":"0px"}}

// curl "http://localhost:3001/scrape?url=https://devonandlang.com/products/journey-boxer-brief-puglie"
//{"fonts":[{"family":null,"url":"https://cdn.judge.me/shopify_v2/leex.css"},{"family":null,"url":"https://cdn.shopify.com/extensions/6e5fed04-cf65-498f-9e6e-2824e280de61/loop-returns-exchanges-111/assets/onstore-block.css"},{"family":null,"url":"https://cdn.shopify.com/extensions/019204da-0a7e-4953-9e98-57598c0a2e57/upnova-391/assets/upez.css"},{"family":null,"url":"https://cdn.shopify.com/extensions/b528fe5c-5d83-484b-a704-6ad7d0378aa5/reelup-shoppable-videos-reels-81/assets/reels_carousel.css"},{"family":"Montserrat:wght@400","url":"https://fonts.googleapis.com/css2?family=Montserrat:wght@400&display=swap"},{"family":"Playfair Display:wght@400","url":"https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400&family=Lato:wght@400&family=Source+Sans+Pro:wght@400&display=swap"},{"family":null,"url":"https://cdn.judge.me/widget/base.css"},{"family":null,"url":"https://cdn.judge.me/widget/base.css"},{"family":null,"url":"https://cdn.judge.me/widget/main.css"}],"primaryButton":{"fontFamily":"Montserrat, sans-serif","fontSize":"14px","lineHeight":"14px","letterSpacing":"normal","textTransform":"none","textDecoration":"none solid rgb(21, 21, 21)","textAlign":"center","backgroundColor":"rgba(0, 0, 0, 0)","color":"rgb(21, 21, 21)","borderColor":"rgb(21, 21, 21)","borderWidth":"0px","borderRadius":"0px"}}%      
