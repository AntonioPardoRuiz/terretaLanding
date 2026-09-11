import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, timeout } from 'rxjs';
import { RuntimeConfigService } from '../../core/config/runtime-config.service';

export interface CareersPayload {
  name: string;
  email: string;
  phone: string;
  needs: string;
  privacy: boolean;
  website: string;
  cv: { filename: string; content: string };
}
@Injectable({ providedIn: 'root' })
export class CareersService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(RuntimeConfigService);
  send(payload: CareersPayload) {
    const base = this.config.contactEndpoint();
    const endpoint = base.startsWith('/') ? '/api/careers' : new URL('/api/careers', base).href;
    return this.http.post<unknown>(endpoint, payload).pipe(
      timeout(30000),
      map((response) => {
        if (
          !response ||
          typeof response !== 'object' ||
          !('ok' in response) ||
          response.ok !== true
        ) {
          throw new Error('Envío no confirmado');
        }
        return { ok: true };
      }),
    );
  }
}
