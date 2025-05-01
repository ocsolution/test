// server/api/metadata.ts
import { defineEventHandler } from 'h3';
import axios from 'axios';
import * as cheerio from 'cheerio';

export default defineEventHandler(async (event) => {
  const { url } = getQuery(event);

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Extract metadata
    const title = $('meta[property="og:title"]').attr('content') || $('title').text();

    const description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content');

    const image = $('meta[property="og:image"]').attr('content') || $('link[rel="image_src"]').attr('href');

    return {
      title,
      description,
      image: image?.startsWith('http') ? image : new URL(image, url).href,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch metadata ' + error,
    });
  }
});
