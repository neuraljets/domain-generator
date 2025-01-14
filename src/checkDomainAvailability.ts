import { promises as dns } from "dns";
import { lookup } from "whoisit";
import { LookupResult } from "whoisit/dist/types";

export async function checkDomainAvailability(
  domain: string
): Promise<boolean> {
  try {
    await dns.resolve(domain);
    console.log("Unavailable domain (has DNS records):", domain);
    return false;
  } catch (error: any) {
    if (error.code === "ENOTFOUND") {
      console.log("Available domain (no DNS records):", domain);
      try {
        const whois = getWhoisData(await lookup(domain));
        if (whois.includes("No match") || whois.includes("NOT FOUND")) {
          console.log("Available domain (whois):", domain);
          return true;
        } else {
          console.log("Unavailable domain (whois):", domain);
          return false;
        }
      } catch (error: any) {
        console.error("Error checking domain whois:", domain, error);
        return false;
      }
    } else {
      console.error("Error checking domain:", domain, error);
      return false;
    }
  }
}

function getWhoisData(whois: string | LookupResult | LookupResult[]): string {
  if (Array.isArray(whois)) {
    return whois.map(getWhoisData).join("\n");
  }

  if (typeof whois === "string") {
    return whois;
  }

  return whois.data;
}
