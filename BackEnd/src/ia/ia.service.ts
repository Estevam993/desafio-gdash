import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class IaService {
  constructor(private httpService: HttpService) {}

  private readonly apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
  private readonly apiKey = process.env.GROQ_API_KEY;

  async generateResponse(prompt: string): Promise<string> {
    try {
      if (!this.apiKey) {
        throw new HttpException(
          'GROQ_API_KEY não configurada no ambiente',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const response = await firstValueFrom(
        this.httpService.post(
          this.apiUrl,
          {
            messages: [{ role: 'user', content: prompt }],
            model: 'llama-3.1-8b-instant',
            max_tokens: 1024,
            temperature: 0.7,
            stream: false,
          },
          {
            headers: {
              'Authorization': `Bearer ${this.apiKey}`,
              'Content-Type': 'application/json',
            },
            timeout: 30000,
          },
        ),
      );

      return response.data.choices[0].message.content;

    } catch (error) {
      if (error instanceof AxiosError) {

        throw new HttpException(
          `Erro Groq API (${error.response?.status}): ${JSON.stringify(error.response?.data)}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      throw new HttpException(
        `Erro na comunicação com Groq API: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}