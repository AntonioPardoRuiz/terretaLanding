import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.http.post<{ ok: true }>(this.config.contactEndpoint(), payload);
  }
}
