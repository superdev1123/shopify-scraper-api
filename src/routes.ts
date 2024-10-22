import express, { Request, Response, Router } from 'express';
import { scrapeStyles } from './services/scraperService';

const router: Router = express.Router();

router.post('/scrape', async (req: Request, res: Response): Promise<void> => {
  const { url } = req.body;

  if (!url) {
    res.status(400).json({ error: 'URL is required.' });
    return;
  }

  try {
    const result = await scrapeStyles(url);
    res.json(result);
  } catch (error) {
    console.error('Error scraping the page:', error);
    res.status(500).json({ error: 'Failed to scrape the page.' });
  }
});

export default router;
