import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

export interface PublicRuntimeConfig {
  contactEndpoint: string;
  crmUrl: string | null;
}

export const CRM_URL = 'https://terretacrm.web.app';

const DEFAULT_CONFIG: PublicRuntimeConfig = { contactEndpoint: 'https://terreta-contact.terretasoftware.workers.dev/', crmUrl: CRM_URL };

@Injectable({ providedIn: 'root' })
export class RuntimeConfigService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly config = signal<PublicRuntimeConfig>(DEFAULT_CONFIG);
  readonly contactEndpoint = () => this.config().contactEndpoint;
  readonly crmUrl = () => this.config().crmUrl;

  async load(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      const response = await fetch('/runtime-config.json', { cache: 'no-store' });
      if (!response.ok) return;
      const candidate = (await response.json()) as Partial<PublicRuntimeConfig>;
      this.config.set({
        contactEndpoint:
          this.validEndpoint(candidate.contactEndpoint) ?? DEFAULT_CONFIG.contactEndpoint,
        crmUrl: this.validExternalUrl(candidate.crmUrl) ?? DEFAULT_CONFIG.crmUrl,
      });
    } catch {
      /* Defaults preserve the contact Worker and the official public CRM URL. */
    }
  }

  private validEndpoint(value: unknown): string | null {
    return typeof value === 'string' && (value.startsWith('/') || /^https:\/\//.test(value))
      ? value
      : null;
  }
  private validExternalUrl(value: unknown): string | null {
    if (typeof value !== 'string') return null;
    try {
      return new URL(value).protocol === 'https:' ? value : null;
    } catch {
      return null;
    }
  }
}
