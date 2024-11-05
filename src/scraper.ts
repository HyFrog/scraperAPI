import puppeteer from 'puppeteer';

export async function scrapeShopifyPage(url: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const fonts = await page.evaluate(() => {
    const fontLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    return fontLinks.map(link => {
      const href = link.getAttribute('href');
      if (!href) return null;

      try {
        const family = new URL(href).searchParams.get('family');
        return {
          family,
          url: href
        };
      } catch (e) {
        return null;
      }
    }).filter(font => font !== null);
  });

  const primaryButton = await page.evaluate(() => {
    const button = document.querySelector('button');
    if (!button) return null;

    const style = window.getComputedStyle(button);
    return {
      fontFamily: style.fontFamily,
      fontSize: style.fontSize,
      lineHeight: style.lineHeight,
      letterSpacing: style.letterSpacing,
      textTransform: style.textTransform,
      textDecoration: style.textDecoration,
      textAlign: style.textAlign,
      backgroundColor: style.backgroundColor,
      color: style.color,
      borderColor: style.borderColor,
      borderWidth: style.borderWidth,
      borderRadius: style.borderRadius
    };
  });

  await browser.close();

  return {
    fonts,
    primaryButton
  };
}