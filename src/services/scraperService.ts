import axios from 'axios';
import * as cheerio from 'cheerio';
import { FontStyle, ButtonStyle, ScrapeResult } from '../types/styles';

async function extractFonts($: cheerio.CheerioAPI): Promise<FontStyle[]> {
  const fonts: FontStyle[] = [];

  $('link[rel="stylesheet"], style').each((_, element) => {
    const href = $(element).attr('href');
    const content = $(element).html();

    if (href?.includes('fonts.googleapis')) {
      const family = decodeURIComponent(href.match(/family=([^&:]+)/)?.[1] || '');
      const variants = href.match(/wght@([^&:]+)/)?.[1] || '400';
      fonts.push({ family, variants, url: href });
    } else if (content) {
      const fontFamily = content.match(/font-family:\s*([^;]+)/)?.[1];
      if (fontFamily) {
        fonts.push({ family: fontFamily, variants: '400' });
      }
    }
  });

  return fonts;
}


async function extractButtonStyles($: cheerio.CheerioAPI): Promise<ButtonStyle | null> {
  const button = $('form[action*="/cart/add"] button').first();
  if (!button.length) return null;

  return {
    fontFamily: button.css('font-family') || '',
    fontSize: button.css('font-size') || '',
    lineHeight: button.css('line-height') || '',
    letterSpacing: button.css('letter-spacing') || '',
    textTransform: button.css('text-transform') || '',
    textDecoration: button.css('text-decoration') || '',
    textAlign: button.css('text-align') || '',
    backgroundColor: button.css('background-color') || '',
    color: button.css('color') || '',
    borderColor: button.css('border-color') || '',
    borderWidth: button.css('border-width') || '',
    borderRadius: button.css('border-radius') || '',
  };
}


export async function scrapeStyles(url: string): Promise<ScrapeResult> {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data) as cheerio.CheerioAPI;

  const fonts = await extractFonts($);
  const primaryButton = await extractButtonStyles($);

  return { fonts, primaryButton };
}
