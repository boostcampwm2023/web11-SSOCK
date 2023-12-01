import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { ClovaContentDto } from './dto/clova-content.dto';

@Injectable()
export class ClovaService {
  private readonly clovaSummaryApiUrl =
    'https://naveropenapi.apigw.ntruss.com/text-summary/v1/summarize';
  private readonly clovaSentimentApiUrl =
    'https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze';
  private readonly clovaSummaryClientID = `${process.env.CLOVA_SUMMARY_CLIENT_ID}`;
  private readonly clovaSummarySecret = `${process.env.CLOVA_SUMMARY_SECRET}`;
  private readonly clovaSentimentClientID = `${process.env.CLOVA_SENTIMENT_CLIENT_ID}`;
  private readonly clovaSentimentSecret = `${process.env.CLOVA_SENTIMENT_SECRET}`;

  async summarize(clovaDto: ClovaContentDto): Promise<string> {
    const content = clovaDto.content;
    const data = {
      document: {
        content: content
      },
      option: {
        language: 'ko',
        model: 'general',
        tone: '0', // 현재 말투 유지
        summaryCount: '1'
      }
    };
    const headers = {
      'Content-Type': 'application/json',
      'X-NCP-APIGW-API-KEY-ID': this.clovaSummaryClientID,
      'X-NCP-APIGW-API-KEY': this.clovaSummarySecret
    };
    try {
      const response = await axios.post(this.clovaSummaryApiUrl, data, {
        headers
      });
      return response.data.summary;
    } catch (error) {
      console.error('Error calling Clova Summary API:', error.message);
      throw new InternalServerErrorException('Failed to summarize text');
    }
  }

  async analyze(clovaDto: ClovaContentDto): Promise<string> {
    const content = clovaDto.content;
    const data = {
      content: content
    };
    const headers = {
      'Content-Type': 'application/json',
      'X-NCP-APIGW-API-KEY-ID': this.clovaSentimentClientID,
      'X-NCP-APIGW-API-KEY': this.clovaSentimentSecret
    };
    try {
      const response = await axios.post(this.clovaSentimentApiUrl, data, {
        headers
      });
      return response.data;
    } catch (error) {
      console.error('Error calling Clova Sentiment API:', error.message);
      throw new InternalServerErrorException('Failed to analyze text');
    }
  }
}
