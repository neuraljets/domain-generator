import { checkDomainAvailability } from "./checkDomainAvailability";
import { domainPrefixes, domainSuffixes } from "./prefixesAndSuffixes";

export interface GenerateDomainsParams {
  root: string;
  numDomains: number;
}
export async function generateDomains(
  params: GenerateDomainsParams,
): Promise<string[]> {
  if (params.numDomains <= 0) {
    return [];
  }

  if (params.numDomains > domainPrefixes.length + domainSuffixes.length) {
    throw new Error(
      `Cannot generate more than ${
        domainPrefixes.length + domainSuffixes.length
      } domains -- not enough prefixes and suffixes`,
    );
  }

  // Generate all possible domains
  const allDomains = [
    ...domainPrefixes.map(prefix => `${prefix}${params.root}.com`),
    ...domainSuffixes.map(suffix => `${params.root}${suffix}.com`),
    ...domainPrefixes.flatMap(prefix =>
      domainSuffixes.map(suffix => `${prefix}${params.root}${suffix}.com`),
    ),
  ];

  const domains = [];
  let i = 0;
  while (domains.length < params.numDomains) {
    if (i >= allDomains.length) {
      throw new Error("Ran out of domains to generate");
    }

    const domain = allDomains[i];
    if (await checkDomainAvailability(domain)) {
      domains.push(domain);
    }

    i++;
  }

  return domains;
}
