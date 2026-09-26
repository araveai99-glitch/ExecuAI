import { EmailProvider } from "./EmailProvider";
import { GmailProvider } from "./GmailProvider";
import { ZohoProvider } from "./ZohoProvider";

export class ProviderFactory {
  private static gmailInstance: GmailProvider = new GmailProvider();
  private static zohoInstance: ZohoProvider = new ZohoProvider();

  public static getProvider(providerType: "GMAIL" | "ZOHO"): EmailProvider {
    if (providerType === "GMAIL") {
      return this.gmailInstance;
    }
    if (providerType === "ZOHO") {
      return this.zohoInstance;
    }
    throw new Error(`Unsupported email provider type: ${providerType}`);
  }
}
