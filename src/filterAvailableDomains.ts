import { checkDomainAvailability } from "./checkDomainAvailability";

export interface FilterAvailableDomainsParams {
  domains: string[];
  numDomains: number;
}
export async function filterAvailableDomains({
  domains,
  numDomains,
}: FilterAvailableDomainsParams): Promise<string[]> {
  if (numDomains <= 0) {
    return [];
  }

  if (numDomains >= domains.length) {
    throw new Error(
      "Number of domains needed is greater than or equal to the number of domains given",
    );
  }

  const availableDomains: string[] = [];
  let i = 0;
  while (availableDomains.length < numDomains) {
    if (i >= domains.length) {
      throw new Error("There are not enough available domains");
    }

    const domain = domains[i];
    if (await checkDomainAvailability(domain)) {
      domains.push(domain);
    }

    i++;
  }

  return availableDomains;
}
