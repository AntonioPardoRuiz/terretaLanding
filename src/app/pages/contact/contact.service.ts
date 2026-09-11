import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, timeout } from 'rxjs';
import { RuntimeConfigService } from '../../core/config/runtime-config.service';

export interface ContactPayload {
  name: string;
  company: string;
  email: string;
  phone: string;
  needs: string;
  privacy: true;
  website: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(RuntimeConfigService);
  send(payload: ContactPayload): Observable<{ ok: true }> {
    return this.http.post<unknown>(this.config.contactEndpoint(), payload).pipe(
      timeout(20000),
      map((response) => {
        if (!response || typeof response !== 'object' || !('ok' in response) || response.ok !== true) {
          throw new Error('El servidor no ha confirmado el envío');
        }
        return { ok: true as const };
      }),
    );
  }
}
