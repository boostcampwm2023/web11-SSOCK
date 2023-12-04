import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

export interface ResClovaSentiment {
  sentiment: string;
  confidence: number;
}

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

  async summarize(content: string): Promise<string> {
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

  async analyze(content: string): Promise<ResClovaSentiment> {
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
      const sentiment = response.data.document.sentiment;
      const confidence = response.data.document.confidence[sentiment];
      return {
        sentiment: sentiment,
        confidence: confidence
      };
    } catch (error) {
      console.error('Error calling Clova Sentiment API:', error.message);
      throw new InternalServerErrorException('Failed to analyze text');
    }
  }
}
